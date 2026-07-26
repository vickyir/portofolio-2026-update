import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import { SiteSidebar } from "@/components/shell/SiteSidebar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import "./globals.css";

// Heavy grotesk to match the reference's display type — Geist Sans doesn't go this heavy
// or this tight. Self-hosted (app/fonts/) rather than next/font/google on purpose: the
// build then needs no network at all, which also sidesteps the local TLS/CA issue that
// makes Node unable to reach fonts.googleapis.com on this machine.
const archivo = localFont({
  src: "./fonts/Archivo-Variable.woff2",
  weight: "400 900",
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vicky — iOS & visionOS Engineer",
    template: "%s · Vicky",
  },
  description:
    "Freelance iOS & visionOS engineer. Selected work in enterprise spatial computing and mobile learning.",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#c9c9b3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <SiteSidebar />
        <div className="lg:pl-64">
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
