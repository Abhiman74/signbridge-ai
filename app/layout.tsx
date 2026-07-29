import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ThemeScript } from "@/components/layout/theme-script";
import { Navbar } from "@/components/layout/navbar";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Real-Time Browser Sign Language Interpreter`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="flex flex-1 flex-col">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
