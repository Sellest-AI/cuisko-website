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

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE.URL),
  title: "Cuisko: Cook from what you already own",
  description: "Cuisko plans a week of meals from the food already in your kitchen, lists only what's missing, and keeps your stock up to date as you shop and cook.",
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
