"use client"

import { ConvexAuthProvider, useAuthActions } from "@convex-dev/auth/react"
import { AppleMark, GoogleMark } from "@icons"
import { anyApi } from "convex/server"
import { ConvexReactClient, useAction, useConvexAuth, useMutation, useQuery } from "convex/react"
import { useSearchParams } from "next/navigation"
import { useState, useSyncExternalStore } from "react"
import {
  ApprovalCard,
  ConnectCard,
  ConnectionsCard,
  Failure,
  OrDivider,
  PillButton,
  Text,
  Title,
  type Assistant,
} from "./connect-ui"
import { COPY, type Copy } from "./copy"

/**
 * Called by name, because the generated `api` lives in `../cuisko`. These paths are literal and
 * nothing here checks them: the site has no types for them and no tests.
 */
const API = {
  getAuthRequest: anyApi.mcp.getAuthRequest,
  authorize: anyApi.mcp.authorize,
  listConnections: anyApi.mcp.listConnections,
  revokeConnection: anyApi.mcp.revokeConnection,
  getMe: anyApi.router.users.getMe.authed,
  getMine: anyApi.router.households.getMine.authed,
}

type AuthRequest = {
  clientName: string
  redirectUri?: string
  status: "pending" | "approved" | "denied"
}

type Connection = { id: string; name: string; createdAt: number; lastUsedAt?: number }

type HouseholdCard = { name: string; isCurrent: boolean }

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL

/** Built in the browser only: the page is prerendered, and a client would open a socket at build. */
const client = typeof window !== "undefined" && CONVEX_URL ? new ConvexReactClient(CONVEX_URL) : null

const _subscribe = () => () => {}

const _copyOf = (): Copy => (navigator.language.toLowerCase().startsWith("fr") ? COPY.fr : COPY.en)

/** False while prerendering and on the first client render, so hydration matches. */
const useIsBrowser = () => useSyncExternalStore(_subscribe, () => true, () => false)

const _hostOf = (uri?: string) => {
  if (!uri) return null
  try {
    return new URL(uri).host
  } catch {
    return uri
  }
}

const _message = (cause: unknown, fallback: string) => {
  const data = (cause as { data?: unknown }).data
  return typeof data === "string" ? data : fallback
}

/** Google and Apple only, the two ways a cook signs in. The relative `redirectTo` is what the backend's origin check accepts. */
const SignIn = ({ copy }: { copy: Copy }) => {
  const { signIn } = useAuthActions()
  const [isBusy, setIsBusy] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)

  const run = async (provider: "google" | "apple") => {
    setIsBusy(true)
    setHasFailed(false)
    try {
      await signIn(provider, { redirectTo: window.location.pathname + window.location.search })
    } catch (cause) {
      console.error(cause)
      setHasFailed(true)
      setIsBusy(false)
    }
  }

  return (
    <ConnectCard>
      <Title>{copy.signInTitle}</Title>
      <Text>{copy.signInBody}</Text>
      {hasFailed && <Failure>{copy.signInFailed}</Failure>}
      <div className="mt-8 space-y-4">
        <PillButton onClick={() => run("google")} disabled={isBusy} icon={<GoogleMark />}>{copy.google}</PillButton>
        <OrDivider label={copy.or} />
        <PillButton onClick={() => run("apple")} disabled={isBusy} icon={<AppleMark />}>{copy.apple}</PillButton>
      </div>
    </ConnectCard>
  )
}

/** A closing line, or a loading one: the same card every time, so the page never jumps. */
const Notice = ({ title, body, assistant }: { title?: string; body: string; assistant?: Assistant }) => (
  <ConnectCard assistant={assistant}>
    {title && <Title>{title}</Title>}
    <Text>{body}</Text>
  </ConnectCard>
)

const Approve = ({ requestId, copy }: { requestId: string; copy: Copy }) => {
  const request = useQuery(API.getAuthRequest, { requestId }) as AuthRequest | null | undefined
  const me = useQuery(API.getMe, {}) as { email: string | null } | undefined
  const households = useQuery(API.getMine, {}) as HouseholdCard[] | undefined
  const authorize = useAction(API.authorize)
  const { signOut } = useAuthActions()
  const [outcome, setOutcome] = useState<"idle" | "deciding" | "allowed" | "refused">("idle")
  const [failure, setFailure] = useState<string | null>(null)

  const decide = async (approve: boolean) => {
    setOutcome("deciding")
    setFailure(null)
    try {
      const { redirectUrl } = await authorize({ requestId, approve })
      setOutcome(approve ? "allowed" : "refused")
      if (redirectUrl) window.location.assign(redirectUrl)
    } catch (cause) {
      console.error(cause)
      setFailure(_message(cause, copy.genericFailure))
      setOutcome("idle")
    }
  }

  if (outcome === "allowed") return <Notice title={copy.allowedTitle} body={copy.allowedBody} />
  if (outcome === "refused") return <Notice title={copy.refusedTitle} body={copy.refusedBody} />
  if (request === undefined || me === undefined || households === undefined) return <Notice body={copy.loading} />
  if (request === null || request.status !== "pending") return <Notice title={copy.expiredTitle} body={copy.expiredBody} />

  return (
    <ApprovalCard
      clientName={request.clientName}
      host={_hostOf(request.redirectUri)}
      email={me.email ?? copy.noEmail}
      householdName={households.find(({ isCurrent }) => isCurrent)?.name}
      failure={failure}
      isDeciding={outcome === "deciding"}
      copy={copy}
      onDecide={decide}
      onSwitchAccount={() => signOut()}
    />
  )
}

const Connections = ({ copy }: { copy: Copy }) => {
  const connections = useQuery(API.listConnections, {}) as Connection[] | undefined
  const revoke = useMutation(API.revokeConnection)
  const [failure, setFailure] = useState<string | null>(null)

  const disconnect = async (id: string) => {
    setFailure(null)
    try {
      await revoke({ id })
    } catch (cause) {
      console.error(cause)
      setFailure(_message(cause, copy.genericFailure))
    }
  }

  return <ConnectionsCard connections={connections} failure={failure} copy={copy} onDisconnect={disconnect} />
}

const Content = ({ copy }: { copy: Copy }) => {
  const { isLoading, isAuthenticated } = useConvexAuth()
  const requestId = useSearchParams().get("request")

  if (isLoading) return <Notice body={copy.loading} />
  if (!isAuthenticated) return <SignIn copy={copy} />

  return requestId ? <Approve requestId={requestId} copy={copy} /> : <Connections copy={copy} />
}

/** Refuses to approve anything inside a frame: the header says the same, and this holds if it is lost. */
export const ConnectClient = () => {
  const isBrowser = useIsBrowser()

  if (!isBrowser) return null

  const copy = _copyOf()

  if (!client) return <Notice body={copy.notConfigured} />
  if (window.top !== window.self) return <Notice body={copy.framed} />

  return (
    <ConvexAuthProvider client={client}>
      <Content copy={copy} />
    </ConvexAuthProvider>
  )
}
