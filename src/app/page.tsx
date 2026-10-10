import { Calm } from "@/components/landing/calm"
import { Features } from "@/components/landing/features"
import { GetTheApp } from "@/components/landing/get-the-app"
import { Hero } from "@/components/landing/hero"
import { Loop } from "@/components/landing/loop"
import { Menu } from "@/components/landing/menu"

export default function Home() {
  return (
    <main>
      <Hero />
      <Loop />
      <Features />
      <Menu />
      <Calm />
      <GetTheApp />
    </main>
  )
}
