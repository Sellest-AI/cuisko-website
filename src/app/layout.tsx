import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
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
  title: "Cuisko: The recipe app for every home cook",
  description: "Find recipes you'll love, plan your week, and get your grocery list done for you — all in one app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${interSans.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
