import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Work_Sans, Quicksand } from "next/font/google";
// import ServiceWorkerRegister from "./registerServiceWorker";

// components
import AddToHomeScreen from "@/components/AddToHomeScreen";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
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
  themeColor: "#29cd9c",
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
        {/* ads scripts */}
        <script
          type="text/javascript"
          src="//intimidatingsideway.com/cd/25/e0/cd25e0a72342f4fb6f2b0e1bc8faf396.js"
        ></script>

        <script
          async
          data-cfasync="false"
          src="//intimidatingsideway.com/ba42027f6ac5fb9c6f4b3bbcc8a5f13e/invoke.js"
        ></script>

        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3810051236937370"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${workSans.variable} ${quicksand.variable}`}>
        {children}
        {/* <ServiceWorkerRegister /> */}
        <AddToHomeScreen />
      </body>
    </html>
  );
}
