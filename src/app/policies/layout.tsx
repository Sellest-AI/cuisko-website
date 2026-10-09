import { Header } from "@/components/header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="px-4 sm:px-6 pt-6">
      <div className="max-w-6xl mx-auto"><Header /></div>
      <article className="prose prose-sm sm:prose-base md:prose-lg prose-a:text-primary-500 prose-headings:font-display max-w-4xl mx-auto px-2 sm:px-6 pt-16 pb-24">
        {children}
      </article>
    </main>
  )
}
