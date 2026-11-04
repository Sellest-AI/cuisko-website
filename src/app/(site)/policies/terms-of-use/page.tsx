import { Metadata } from "next"
import { MarkdownPage } from "@/components/markdown-page"
import { WEBSITE } from "@/global"

export const metadata: Metadata = {
  title: "Terms of use - " + WEBSITE.NAME,
}

export default function Page() {
  return <MarkdownPage file="terms-of-use" />
}
