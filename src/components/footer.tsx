import Image from "next/image"
import Link from "next/link"
import { WEBSITE } from "@/global"

const COLUMNS = [
  {
    title: "Legal",
    links: [
      { href: "/policies/privacy-policy", label: "Privacy Policy" },
      { href: "/policies/legal-notices", label: "Legal Notices" },
      { href: "/policies/terms-of-use", label: "Terms" },
    ],
  },
  {
    title: "Support & Downloads",
    links: [
      { href: "/contact", label: "Contact Support" },
      { href: "/help/delete-account", label: "Delete my account" },
      { href: WEBSITE.APP_STORE_URL, label: "App Store" },
      { href: WEBSITE.PLAY_STORE_URL, label: "Play Store" },
    ],
  },
]

export const Footer = () => (
  <footer className="px-3 pb-3">
    <div className="bg-screen rounded-lg px-6 sm:px-10 md:px-16 pt-12 pb-10 md:pt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/assets/mascot/icon.webp" alt="" width={96} height={96} className="size-12 rounded-[14px] shadow-soft" />
            <h2 className="font-display text-3xl">{WEBSITE.NAME}</h2>
          </div>
          <p className="text-muted font-medium mt-4">Cook from what you already own.</p>
          <p className="text-muted text-sm mt-8">© {new Date().getFullYear()} {WEBSITE.NAME}.</p>
        </div>

        <div className="grid gap-12 grid-cols-2 self-end">
          {COLUMNS.map(column => (
            <div key={column.title}>
              <h3 className="font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted font-medium hover:text-primary-500 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </footer>
)
