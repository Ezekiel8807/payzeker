"use client";
import { useEffect } from "react";

export default function Ads4() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://fpyf8.com/88/tag.min.js";
    script.async = true;
    script.dataset.zone = "163203";
    script.setAttribute("data-cfasync", "false");

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null; // nothing visible
}
