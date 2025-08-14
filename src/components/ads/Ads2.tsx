"use client";
import { useEffect } from "react";

export default function Ads2() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = `https://groleegni.net/401/9711366`;

    try {
      (document.body || document.documentElement).appendChild(s);
    } catch (e) {
      console.error("Failed to append external script:", e);
    }

    // Optional cleanup: remove script on unmount
    return () => {
      s.remove();
    };
  }, []);

  return null; // This component renders nothing visible
}
