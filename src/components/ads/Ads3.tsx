"use client";
import { useEffect } from "react";

export default function Ads3() {
  useEffect(() => {
    (function (d, z, s) {
      s.src = `https://${d}/401/${z}`;
      try {
        (document.body || document.documentElement).appendChild(s);
      } catch (e) {
        console.error(e);
      }
    })("groleegni.net", 9711366, document.createElement("script"));
  }, []);

  return null; // nothing to render visually
}
