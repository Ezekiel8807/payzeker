import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Work_Sans, Quicksand } from "next/font/google";
import ServiceWorkerRegister from "./registerServiceWorker";

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
        <meta name="monetag" content="7843fd53e3b091bef9898efe16389281" />

        {/* google ads script */}
<script type='text/javascript' src='//pl27984449.effectivegatecpm.com/df/e5/a4/dfe5a4112cf84067739c2d1a7cfdb46f.js'></script>
      </head>
      <body className={`${workSans.variable} ${quicksand.variable}`}>
        {children}
        <ServiceWorkerRegister />
        <AddToHomeScreen />
      </body>
    </html>
  );
}
