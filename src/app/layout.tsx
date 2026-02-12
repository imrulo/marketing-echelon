import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import 'regenerator-runtime/runtime';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Club Echelon | Strategic Dashboard",
  description: "Interactive Marketing & Event Strategy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-hidden h-screen w-screen flex flex-col md:flex-row`}
      >
        <Navigation />
        <main className="flex-1 h-full overflow-y-auto w-full p-4 pb-24 md:p-8 relative z-0 scroll-smooth">
          {children}
        </main>
      </body>
    </html>
  );
}
