import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Work_Sans, Quicksand } from "next/font/google";
import Script from "next/script";
// import ServiceWorkerRegister from "./registerServiceWorker";

// components
import AddToHomeScreen from "@/shared/components/feedback/AddToHomeScreen";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.payzeker.com"),

  // Title Configuration
  title: {
    default: "Payzeker - Earn Money Online by Completing Simple Tasks",
    template: "%s | Payzeker",
  },

  // Description
  description:
    "Join Payzeker to earn money online by completing simple social media tasks. Get paid instantly for liking, commenting, posting, and more. Start earning today in Nigeria!",

  // Keywords for SEO
  keywords: [
    "earn money online",
    "make money online Nigeria",
    "online tasks",
    "micro jobs",
    "freelance work",
    "social media tasks",
    "instant payment",
    "work from home",
    "side hustle Nigeria",
    "online earning platform",
    "micro freelancing",
    "task-based earning",
    "Payzeker",
  ],

  // Authors and Creator
  authors: [{ name: "Payzeker", url: "https://www.payzeker.com" }],
  creator: "Payzeker",
  publisher: "Payzeker",

  // Robots Configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.payzeker.com",
    siteName: "Payzeker",
    title: "Payzeker - Earn Money Online by Completing Simple Tasks",
    description:
      "Complete simple social media tasks and get paid instantly. Join thousands earning daily on Payzeker. Start your online earning journey today!",
    images: [
      {
        url: "/icons/pIcon.png",
        width: 1200,
        height: 630,
        alt: "Payzeker - Earn Money Online",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@payzeker",
    creator: "@payzeker",
    title: "Payzeker - Earn Money Online by Completing Simple Tasks",
    description:
      "Complete simple tasks and get paid instantly. Join thousands earning daily on Payzeker!",
    images: ["/icons/pIcon.png"],
  },

  // Icons
  icons: {
    icon: [
      { url: "/icons/pIcon.png" },
      { url: "/icons/pIcon.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/pIcon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/pIcon.png" },
      { url: "/icons/pIcon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icons/pIcon.png",
  },

  // PWA Manifest
  manifest: "/manifest.json",

  // App Links (for mobile apps if applicable)
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Payzeker",
  },

  // Verification Tags (add your verification codes)
  // verification: {
  //   google: "3F89lO-Y5fqytC3Nwm1caXZW2qSDJ4XUm93MFmcVfaI",
  // },

  // Category
  category: "Business & Finance",

  // Alternate Languages (if you support multiple languages)
  alternates: {
    canonical: "https://www.payzeker.com",
    languages: {
      "en-NG": "https://www.payzeker.com",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#29cd9c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* google meta verification
        <meta
          name="google-site-verification"
          content="3F89lO-Y5fqytC3Nwm1caXZW2qSDJ4XUm93MFmcVfaI"
        /> */}

        {/* ezoic meta verification */}
        <meta
          name="ezoic-site-verification"
          content="gfL4le20ODCIyaInWTbUTMcbFrq0wo"
        />

        {process.env.NODE_ENV === "production" && (
          <>
            {/* adsterra ads scripts */}
            <Script
              strategy="afterInteractive"
              src="//intimidatingsideway.com/cd/25/e0/cd25e0a72342f4fb6f2b0e1bc8faf396.js"
            />

            <Script
              strategy="afterInteractive"
              data-cfasync="false"
              src="//intimidatingsideway.com/ba42027f6ac5fb9c6f4b3bbcc8a5f13e/invoke.js"
            />

            {/* google Ads com */}
            <Script
              strategy="afterInteractive"
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3810051236937370"
              crossOrigin="anonymous"
            />

            {/* Ezoic's Ads com */}
            <Script
              strategy="afterInteractive"
              src="https://cmp.gatekeeperconsent.com/min.js"
              data-cfasync="false"
            />
            <Script
              strategy="afterInteractive"
              src="https://the.gatekeeperconsent.com/cmp.min.js"
              data-cfasync="false"
            />

            <Script
              strategy="afterInteractive"
              src="//www.ezojs.com/ezoic/sa.min.js"
            />
            <Script id="ezoic-standalone-setup" strategy="afterInteractive">
              {`
                window.ezstandalone = window.ezstandalone || {};
                ezstandalone.cmd = ezstandalone.cmd || [];
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${workSans.variable} ${quicksand.variable}`}>
        {children}
        {/* <ServiceWorkerRegister /> */}
        <AddToHomeScreen />
      </body>
    </html>
  );
}
