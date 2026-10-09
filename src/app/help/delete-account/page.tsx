import Image from "next/image"
import { Mail } from "lucide-react"
import { Metadata } from "next"
import { Header } from "@/components/header"
import { WEBSITE } from "@/global"

export const metadata: Metadata = {
  title: "Delete your account - " + WEBSITE.NAME,
  description: "How to delete your " + WEBSITE.NAME + " account and its data.",
}

const MAILTO = `mailto:${WEBSITE.SUPPORT_EMAIL}?subject=Account%20Deletion%20Request`

export default function DeleteAccountPage() {
  return (
    <main className="px-4 sm:px-6 pt-6 pb-24">
      <div className="max-w-6xl mx-auto mb-16"><Header /></div>
      <div className="max-w-2xl mx-auto">
        <Image
          src="/assets/mascot/cuisko-winking-head.webp"
          alt=""
          width={56}
          height={56}
          className="size-14 object-contain mb-6"
        />
        <h1 className="font-display text-4xl md:text-5xl">Delete your account</h1>
        <p className="text-lg text-neutral-900/80 mt-6">
          We&apos;re sad to see you go! You can delete your {WEBSITE.NAME} account and all its data at any time.
        </p>

        <div className="mt-10 bg-neutral-100 rounded-lg p-7">
          <h2 className="font-display text-2xl">From the app</h2>
          <ol className="list-decimal pl-5 mt-4 space-y-1 text-neutral-900/80">
            <li>Open {WEBSITE.NAME} and go to your <strong>Account</strong> settings.</li>
            <li>Tap <strong>Delete my account</strong> and confirm.</li>
          </ol>
          <p className="text-neutral-900/80 mt-4">
            Your account is permanently deleted after <strong>30 days</strong>. Signing back in before then cancels the deletion.
          </p>
        </div>

        <div className="mt-6 bg-primary-100 rounded-lg p-7">
          <h2 className="font-display text-2xl">By email</h2>
          <p className="text-neutral-900/80 mt-3">
            No longer have the app? Send us a request from the email address linked to your account and we&apos;ll delete it for you.
          </p>
          <a
            href={MAILTO}
            className="inline-flex items-center gap-3 mt-6 bg-primary-500 text-white rounded-full px-6 py-3 font-semibold hover:opacity-90 transition-opacity"
          >
            <Mail size={18} />
            {WEBSITE.SUPPORT_EMAIL}
          </a>
        </div>

        <p className="text-sm text-muted mt-8">
          Deleting your account permanently removes everything that identifies you: your name, email address, sign-in methods, photos and conversations with the cooking assistant. Recipes and cooking data are kept only in anonymous form, no longer linked to you, and households you shared stay with their other members.
        </p>
      </div>
    </main>
  )
}
