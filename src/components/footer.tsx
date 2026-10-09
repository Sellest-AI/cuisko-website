import Link from "next/link"
import { WEBSITE } from "@/global"

export const Footer = () => {
  return (
    <footer className="w-full bg-background py-10 md:pt-14 md:pb-16 px-4 sm:px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl mb-2">{WEBSITE.NAME}</h2>
            <p className="text-muted mb-6 sm:mb-8">The recipe app for every home cook.</p>
            <p className="text-muted text-sm">© {new Date().getFullYear()} {WEBSITE.NAME}.</p>
          </div>

          <div className="grid gap-12 grid-cols-2 self-end">
            {/* Legal Column */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/policies/privacy-policy" className="text-muted hover:text-primary-500 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/policies/legal-notices" className="text-muted hover:text-primary-500 transition-colors">Legal Notices</Link></li>
                <li><Link href="/policies/terms-of-use" className="text-muted hover:text-primary-500 transition-colors">Terms</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Support & Downloads</h3>
              <ul className="space-y-3">
                <li><Link href="/contact" className="text-muted hover:text-primary-500 transition-colors">Contact Support</Link></li>
                <li><Link href="/help/delete-account" className="text-muted hover:text-primary-500 transition-colors">Delete my account</Link></li>
                <li><a href={WEBSITE.APP_STORE_URL} className="text-muted hover:text-primary-500 transition-colors">App Store</a></li>
                <li><a href={WEBSITE.PLAY_STORE_URL} className="text-muted hover:text-primary-500 transition-colors">Play Store</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
