import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Work_Sans, Quicksand } from "next/font/google";
// import ServiceWorkerRegister from "./registerServiceWorker";

// components
import AddToHomeScreen from "@/components/AddToHomeScreen";

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

        {/* ezoic meta verification */}
        <meta
          name="ezoic-site-verification"
          content="gfL4le20ODCIyaInWTbUTMcbFrq0wo"
        />

        {/* adsterra ads scripts */}
        <script
          type="text/javascript"
          src="//intimidatingsideway.com/cd/25/e0/cd25e0a72342f4fb6f2b0e1bc8faf396.js"
        ></script>

        <script
          async
          data-cfasync="false"
          src="//intimidatingsideway.com/ba42027f6ac5fb9c6f4b3bbcc8a5f13e/invoke.js"
        ></script>

        {/* google   Ads com */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3810051236937370"
          crossOrigin="anonymous"
        ></script>

        {/* Ezoic's  Ads com */}

        <script
          src="https://cmp.gatekeeperconsent.com/min.js"
          data-cfasync="false"
        ></script>
        <script
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          data-cfasync="false"
        ></script>

        <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.ezstandalone = window.ezstandalone || {};
              ezstandalone.cmd = ezstandalone.cmd || [];
            `,
          }}
        />
      </head>
      <body className={`${workSans.variable} ${quicksand.variable}`}>
        {children}
        {/* <ServiceWorkerRegister /> */}
        <AddToHomeScreen />
      </body>
    </html>
  );
}
