import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ServiceWorkerRegister from "./registerServiceWorker";

// components
// import Script from "next/script";
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
  metadataBase: new URL("https://www.payzeker.com"),
  title: "Payzeker",
  description:
    "Payzeker is an online platform connecting businesses with micro-freelancers...",
  openGraph: {
    title: "Payzeker",
    description: "Complete tasks. Get paid instantly.",
    url: "https://www.payzeker.com",
    siteName: "Payzeker",
    images: ["/icons/pIcon.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payzeker",
    description: "Micro-tasks, instant payments.",
    images: ["/icons/pIcon.png"],
  },
  icons: {
    icon: "/icons/pIcon.png",
    apple: "/icons/pIcon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#29cd9c", // 👈 put brand color here instead
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
        <meta name="monetag" content="7843fd53e3b091bef9898efe16389281" />

        {/* ✅ Load Paystack only on client */}
        <script src="https://js.paystack.co/v1/inline.js"></script>

        {/* google ads script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3810051236937370"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ServiceWorkerRegister />
        <AddToHomeScreen />
      </body>
    </html>
  );
}
