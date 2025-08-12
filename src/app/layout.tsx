import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// components
import AdSenseAutoAds from "@/components/AdSenseAutoAds";
//
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Payzeker - Landing page",
  description:
    "Payzeker is an online platform (accessible via web) connecting businesses with micro‑freelancers who complete simple online tasks—such as liking, commenting, or posting on social media—for instant micro‑payments",
};

export const config = { amp: true };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta property="og:title" content="Payzeker" />
        <meta property="og:image" content="/icons/pIcon.png" />
        <meta name="twitter:card" content="/icons/pIcon.png" />
        <meta name="google-adsense-account" content="ca-pub-3810051236937370" />

        <meta
          property="og:description"
          content="Payzeker is an online platform (accessible via web) connecting businesses with micro‑freelancers who complete simple online tasks—such as liking, commenting, or posting on social media—for instant micro‑payments"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Payzeker is an online platform (accessible via web) connecting businesses with micro‑freelancers who complete simple online tasks—such as liking, commenting, or posting on social media—for instant micro‑payments"
        />
        <link rel="icon" type="image/svg+xml" href="/icons/pIcon.png" />

        <Script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        ></Script>

        <Script
          async
          custom-element="amp-ad"
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
        ></Script>

        {/* Paystack script */}
        <Script src="https://js.paystack.co/v1/inline.js"></Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Auto ads script injection */}
        <AdSenseAutoAds client="ca-pub-3810051236937370" />

        {children}
      </body>
    </html>
  );
}
