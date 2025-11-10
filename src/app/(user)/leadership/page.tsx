import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import getLeadership from "@/actions/getLeadership";

//components
import Script from "next/script";
import Header from "@/components/layout/Header";
import Leadership from "@/components/Leadership";

export default async function Page() {
  const token = await getToken();
  if (!token) redirect("/login");

  const leaderShip = await getLeadership();

  return (
    <>
      <Header />
      <Leadership leaders={leaderShip} />

      <div className="relative w-full overflow-hidden">
        <Script id="ad-config" strategy="afterInteractive">
          {`
            atOptions = {
              'key': '55eb44035a9c29a44aa55d55dc1574e6',
              'format': 'iframe',
              'height': 60,
              'width': window.innerWidth || document.documentElement.clientWidth,
              'params': {}
            };
          `}
        </Script>

        <Script
          id="ad-script"
          strategy="afterInteractive"
          src="//intimidatingsideway.com/55eb44035a9c29a44aa55d55dc1574e6/invoke.js"
        />
      </div>
    </>
  );
}
