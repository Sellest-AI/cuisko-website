
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative overflow-hidden px-4 sm:px-6 pt-5 sm:pt-6">
      <div className="glow size-[800px] -top-[400px] -left-[350px] opacity-10" />
      <div className="h-14" />
      <article className="relative prose prose-sm sm:prose-base md:prose-lg prose-a:text-primary-500 prose-headings:font-display max-w-4xl mx-auto px-2 sm:px-6 pt-16 pb-24">
        {children}
      </article>
    </main>
  )
}
