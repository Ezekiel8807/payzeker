"use client";

import { useEffect } from "react";

type AdSenseAutoAdsProps = {
  client: string; // e.g. "ca-pub-3810051236937370"
};

export default function AdSenseAutoAds({ client }: AdSenseAutoAdsProps) {
  useEffect(() => {
    // Prevent duplicate script load
    if (
      !document.querySelector(
        `script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]`
      )
    ) {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.setAttribute("data-ad-client", client);
      document.head.appendChild(script);
    }
  }, [client]);

  return null; // This component just injects the script, nothing to render
}
