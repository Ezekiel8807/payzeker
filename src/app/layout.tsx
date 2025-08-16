import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ServiceWorkerRegister from "./registerServiceWorker";

// components
import Script from "next/script";
import AddToHomeScreen from "@/components/AddToHomeScreen";

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

// export const config = { amp: true };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0f172a" />
        <meta property="og:title" content="Payzeker" />
        <meta property="og:image" content="/icons/pIcon.png" />
        <meta name="twitter:card" content="/icons/pIcon.png" />
        <meta name="monetag" content="7843fd53e3b091bef9898efe16389281" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          property="og:description"
          content="Payzeker is an online platform (accessible via web) connecting businesses with micro‑freelancers who complete simple online tasks—such as liking, commenting, or posting on social media—for instant micro‑payments"
        />

        <meta
          name="description"
          content="Payzeker is an online platform (accessible via web) connecting businesses with micro‑freelancers who complete simple online tasks—such as liking, commenting, or posting on social media—for instant micro‑payments"
        />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple splash screen support */}
        <link rel="apple-touch-icon" href="/icons/pIcon.png" />
        <link rel="icon" type="image/svg+xml" href="/icons/pIcon.png" />

        {/* montag Ads */}
        {/* <script
          src="https://fpyf8.com/88/tag.min.js"
          data-zone="163203"
          async
          data-cfasync="false"
        ></script> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ServiceWorkerRegister />
        <AddToHomeScreen />

        {/* ✅ Load Paystack only on client */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />

        {/* ✅ Load AdSense only on client */}
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3810051236937370"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
