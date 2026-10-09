import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin } from "lucide-react"
import { Metadata } from "next"
import { WEBSITE } from "@/global"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Contact - " + WEBSITE.NAME,
  description: "Get help and support for the " + WEBSITE.NAME + " app.",
}

export default function ContactPage() {
  return (
    <main className="px-4 sm:px-6 pt-6 pb-24">
      <div className="max-w-6xl mx-auto mb-16"><Header /></div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-start">
        <div>
          <h1 className="font-display text-5xl md:text-6xl">Say hello!</h1>
          <p className="text-lg text-neutral-900/80 mt-6 max-w-lg">
            A question, a bug, a recipe that didn&apos;t turn out right, or an idea for {WEBSITE.NAME}? We read every message and get back to you as soon as we can.
          </p>

          <a
            href={`mailto:${WEBSITE.SUPPORT_EMAIL}`}
            className="inline-flex items-center gap-3 mt-8 bg-primary-500 text-white rounded-sm px-6 py-4 font-semibold hover:bg-primary-300 transition-colors shadow-[0_8px_20px_-8px_rgba(255,107,15,0.7)]"
          >
            <Mail size={20} />
            {WEBSITE.SUPPORT_EMAIL}
          </a>

          <div className="mt-14 bg-neutral-100 rounded-lg p-7">
            <h2 className="font-display text-2xl">Publisher</h2>
            <div className="space-y-2 text-neutral-900/80 mt-4">
              <p><strong>S. SELLEST</strong> (SAS)</p>
              <p className="flex items-center gap-2"><MapPin size={16} className="text-muted" /> 12 Rue de la Part-Dieu, 69003 Lyon, France</p>
            </div>
          </div>

          <div className="mt-6 bg-secondary-100 rounded-lg p-7">
            <h2 className="font-display text-2xl">How do I delete my account?</h2>
            <p className="text-neutral-900/80 mt-3">
              You can delete your account directly in the app from your <strong>Account</strong> settings, or follow the steps on our <Link href="/help/delete-account" className="text-primary-500 underline">account deletion page</Link>.
            </p>
          </div>
        </div>

        <Image
          src="/assets/mascot/cuisko-winking-head.webp"
          alt=""
          width={910}
          height={950}
          className="hidden md:block w-56 drop-shadow-xl"
        />
      </div>
    </main>
  )
}
