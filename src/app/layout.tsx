import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WEBSITE } from "@/global";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

// Variable font, so the app's 750 weight resolves exactly.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const title = "Cuisko: Cook from what you already own";
const description = "Cuisko plans a week of meals from the food already in your kitchen, lists only what's missing, and keeps your stock up to date as you shop and cook.";

// The share image is `opengraph-image.jpg` next to this file; Next emits it for og: and twitter:.
// No `url`: every page inherits this block, and a fixed one would point them all at the home page.
export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE.URL),
  title,
  description,
  openGraph: {
    type: "website",
    siteName: WEBSITE.NAME,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${interSans.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
