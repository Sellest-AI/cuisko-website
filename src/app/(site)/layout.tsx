import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

/** Everything but `/connect`, which approves an assistant and gives a cook nothing else to click. */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
