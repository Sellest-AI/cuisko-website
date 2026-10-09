import { Metadata } from "next"
import { MarkdownPage } from "@/components/markdown-page"
import { WEBSITE } from "@/global"

export const metadata: Metadata = {
  title: "Privacy policy - " + WEBSITE.NAME,
}

export default function Page() {
  return <MarkdownPage file="privacy-policy" />
}
