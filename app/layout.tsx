import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { bodoni, jost } from "@/lib/fonts";
import { Header } from "@/components/marca/Header";
import { Footer } from "@/components/marca/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Romão Joias",
  description: "Joalheria tradicional de Macapá, desde 1962.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${bodoni.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
    </html>
  );
}
