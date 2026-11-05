import { Check, ClaudeMark, Globe, LinkArrow, OpenAiMark, X } from "@icons"
import Image from "next/image"
import type { Copy } from "./copy"

/** The logo on the right of the card. Undefined while the assistant is not known yet: all three show. */
export type Assistant = "claude" | "openai" | "web"

export type ConnectionRow = { id: string; name: string }

/**
 * Read from the host a cook goes back to, never from the client's name, which it writes itself: a
 * client calling itself Claude gets the globe unless the code really goes to claude.ai.
 */
const ASSISTANT_BY_HOST: Record<string, Assistant> = {
  "claude.ai": "claude",
  "chatgpt.com": "openai",
  "chat.openai.com": "openai",
}

export const assistantOf = (host: string | null): Assistant => (host && ASSISTANT_BY_HOST[host]) || "web"

/**
 * A connection keeps only the name its client gave, so the list reads the logo from that. Safe here
 * and nowhere else: this is what a cook already approved, and a false name wins nothing but an icon.
 */
const _assistantOfName = (name: string): Assistant => {
  if (/^claude\b/i.test(name)) return "claude"
  if (/^(chatgpt|openai)\b/i.test(name)) return "openai"
  return "web"
}

const _Mark = ({ assistant, className }: { assistant: Assistant; className: string }) => {
  if (assistant === "claude") return <ClaudeMark className={className} />
  if (assistant === "openai") return <OpenAiMark className={className} />
  return <Globe aria-hidden className={`${className} text-neutral-500`} strokeWidth={1.75} />
}

const TILE = "flex items-center justify-center rounded-sm border-2 border-white bg-neutral-100 shadow-soft"

/** All three while the assistant is unknown, which is every screen before a cook signs in. */
const AssistantTiles = ({ assistant }: { assistant?: Assistant }) => {
  if (assistant) {
    return <div className={`${TILE} size-16 sm:size-20 rotate-[5deg]`}><_Mark assistant={assistant} className="size-8 sm:size-10" /></div>
  }

  return (
    <div className="flex -space-x-2.5">
      <div className={`${TILE} size-14 sm:size-16 -rotate-[8deg]`}><_Mark assistant="claude" className="size-5 sm:size-7" /></div>
      <div className={`${TILE} relative z-10 size-14 sm:size-16 -translate-y-1`}><_Mark assistant="openai" className="size-5 sm:size-7" /></div>
      <div className={`${TILE} size-14 sm:size-16 rotate-[8deg]`}><_Mark assistant="web" className="size-5 sm:size-7" /></div>
    </div>
  )
}

/**
 * Cuisko on the left, whoever it connects to on the right, over two sheets fanned behind the card.
 * Below `xs` the card fills the width, so the sheets and the border go.
 */
export const ConnectCard = ({ assistant, children }: { assistant?: Assistant; children: React.ReactNode }) => (
  <div className="relative w-full max-w-[440px]">
    <div aria-hidden className="absolute inset-0 -rotate-3 rounded-lg glass-subtle shadow-lifted hidden xs:block" />
    <div aria-hidden className="absolute inset-0 rotate-[2.5deg] rounded-lg bg-neutral-100 border-2 border-white shadow-soft hidden xs:block" />
    <div className="relative rounded-lg xs:border-2 xs:border-white bg-neutral-0 px-6 sm:px-10 py-10 text-center shadow-lifted">
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
        <Image src="/assets/mascot/icon.webp" alt="Cuisko" width={160} height={160} priority className="size-16 sm:size-20 -rotate-[5deg] rounded-sm border-2 border-white shadow-soft" />
        <LinkArrow className="mt-3" />
        <AssistantTiles assistant={assistant} />
      </div>
      {children}
    </div>
  </div>
)

export const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-display text-3xl text-balance wrap-anywhere">{children}</h1>
)

export const Text = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-3 text-neutral-900/70 text-balance">{children}</p>
)

export const Failure = ({ children }: { children: React.ReactNode }) => (
  <p role="alert" className="mt-4 text-sm font-semibold text-neutral-900">{children}</p>
)

/** `dark` is the app's darkest neutral rather than pure black, so it stays warm on the cream card. */
export const PillButton = ({ onClick, disabled, icon, tone = "dark", children }: {
  onClick: () => void
  disabled?: boolean
  icon: React.ReactNode
  tone?: "dark" | "light"
  children: React.ReactNode
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={
      "mx-auto flex w-full max-w-[272px] items-center gap-3 rounded-full p-1.5 pr-6 font-semibold transition-[transform,opacity] hover:opacity-90 active:scale-[0.98] disabled:opacity-50 " +
      (tone === "dark"
        ? "bg-neutral-900 text-white shadow-lifted"
        : "bg-neutral-100 text-neutral-900")
    }
  >
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-0 text-neutral-900 shadow-soft">{icon}</span>
    {children}
  </button>
)

export const OrDivider = ({ label }: { label: string }) => (
  <div className="mx-auto flex max-w-[272px] items-center gap-4 text-sm text-neutral-500">
    <span className="h-0.5 flex-1 rounded-full bg-neutral-100" />
    {label}
    <span className="h-0.5 flex-1 rounded-full bg-neutral-100" />
  </div>
)

/** The screen a cook decides on. Nothing here fetches, which keeps it possible to look at. */
export const ApprovalCard = ({ clientName, host, email, householdName, failure, isDeciding, copy, onDecide, onSwitchAccount }: {
  clientName: string
  host: string | null
  email: string
  householdName?: string
  failure: string | null
  isDeciding: boolean
  copy: Copy
  onDecide: (approve: boolean) => void
  onSwitchAccount: () => void
}) => (
  <ConnectCard assistant={assistantOf(host)}>
    <Title>{copy.approveTitle(clientName)}</Title>
    <Text>{copy.selfReported}{host && ` ${copy.sendsYouBackTo(host)}`}</Text>

    {failure && <Failure>{failure}</Failure>}

    {householdName ? (
      <div className="mt-6 space-y-3">
        <PillButton onClick={() => onDecide(true)} disabled={isDeciding} icon={<Check aria-hidden size={20} />}>{copy.allow}</PillButton>
        <PillButton onClick={() => onDecide(false)} disabled={isDeciding} tone="light" icon={<X aria-hidden size={20} />}>{copy.refuse}</PillButton>
      </div>
    ) : (
      <Failure>{copy.noHousehold}</Failure>
    )}

    <div className="mt-6 text-sm text-neutral-900/70 wrap-anywhere">
      <p>{copy.account(email)}</p>
      {householdName && <p className="mt-0.5">{copy.household(householdName)}</p>}
      <button type="button" onClick={onSwitchAccount} className="mt-1 font-semibold text-primary-500 hover:underline">{copy.notYou}</button>
    </div>
  </ConnectCard>
)

export const ConnectionsCard = ({ connections, failure, copy, onDisconnect }: {
  connections?: ConnectionRow[]
  failure: string | null
  copy: Copy
  onDisconnect: (id: string) => void
}) => (
  <ConnectCard>
    <Title>{copy.connectionsTitle}</Title>
    {connections === undefined && <Text>{copy.loading}</Text>}
    {connections?.length === 0 && <Text>{copy.noConnections}</Text>}
    {failure && <Failure>{failure}</Failure>}
    {connections && connections.length > 0 && (
      <ul className="mt-6 space-y-2">
        {connections.map(({ id, name }) => (
          <li key={id} className="flex items-center gap-3 rounded-sm bg-neutral-100 p-2 pr-4 text-left">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-0 shadow-soft">
              <_Mark assistant={_assistantOfName(name)} className="size-5" />
            </span>
            <span className="min-w-0 flex-1 font-semibold wrap-anywhere">{name}</span>
            <button type="button" onClick={() => onDisconnect(id)} className="shrink-0 text-sm font-semibold text-primary-500 hover:underline">{copy.disconnect}</button>
          </li>
        ))}
      </ul>
    )}
  </ConnectCard>
)
