import { Metadata } from "next"
import { Suspense } from "react"
import { ConnectClient } from "./connect-client"
import { WEBSITE } from "@/global"

export const metadata: Metadata = {
  title: "Connect an assistant to " + WEBSITE.NAME,
  robots: { index: false },
}

/**
 * Where an assistant sends a cook to approve a connection, and where a cook sees the ones they made.
 * The one page on this site that reaches the backend: it signs in, and every rule that protects
 * access lives in `../cuisko/convex`, so nothing here can approve what the server would refuse.
 */
export default function ConnectPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-screen px-5 py-12">
      <div className="glow size-[800px] -top-[400px] -left-[350px] opacity-10" />
      <div className="glow size-[700px] -bottom-[400px] -right-[300px] opacity-10" />
      <Suspense>
        <ConnectClient />
      </Suspense>
    </main>
  )
}
