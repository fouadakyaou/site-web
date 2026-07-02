import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LUXE | Premium Fashion for the Modern Individual",
    template: "%s | LUXE"
  },
  description: "Discover timeless elegance and modern sophistication. Premium luxury fashion collection featuring the finest materials and exceptional craftsmanship.",
  keywords: ["luxury fashion", "premium clothing", "designer wear", "elegant fashion", "high-end apparel"],
  authors: [{ name: "LUXE" }],
  creator: "LUXE",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luxe.com",
    siteName: "LUXE",
    title: "LUXE | Premium Fashion for the Modern Individual",
    description: "Discover timeless elegance and modern sophistication. Premium luxury fashion collection.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LUXE Premium Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXE | Premium Fashion for the Modern Individual",
    description: "Discover timeless elegance and modern sophistication.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
