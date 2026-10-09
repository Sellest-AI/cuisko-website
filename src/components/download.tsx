import Image from "next/image"
import Link from "next/link"
import { WEBSITE } from "@/global"
import { cn } from "@/ui/utils"

/** Every "Download app" button lands on the store badges at the bottom of the home page. */
export const DOWNLOAD_HREF = "/#download"

export const StoreBadges = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-row flex-wrap items-center gap-3", className)}>
    <Link href={WEBSITE.APP_STORE_URL} className="hover:scale-105 transition-transform">
      <Image
        className="h-12 w-auto"
        src="/assets/images/get-on-applestore.svg"
        alt="Download on the App Store"
        width={478}
        height={142}
      />
    </Link>
    <Link href={WEBSITE.PLAY_STORE_URL} className="hover:scale-105 transition-transform">
      <Image
        className="h-12 w-auto"
        src="/assets/images/get-on-playstore.png"
        alt="Get it on Google Play"
        width={478}
        height={142}
      />
    </Link>
  </div>
)
