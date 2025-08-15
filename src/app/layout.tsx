import "./globals.css";
// import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// components

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
        <meta property="og:title" content="Payzeker" />
        <meta property="og:image" content="/icons/pIcon.png" />
        <meta name="twitter:card" content="/icons/pIcon.png" />
        {/* <meta name="monetag" content="7843fd53e3b091bef9898efe16389281" /> */}

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

        {/* montag Ads */}
        {/* <script
          src="https://fpyf8.com/88/tag.min.js"
          data-zone="163203"
          async
          data-cfasync="false"
        ></script> */}

        {/* Google Ads script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3810051236937370"
          crossOrigin="anonymous"
        ></script>

        {/* Paystack script */}
        <script src="https://js.paystack.co/v1/inline.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
