import User from "@/model/userModel";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import { fetchModelById } from "@/utils/modelFunc";

//components
// import Script from "next/script";
import PayGamer from "./PayGamer";
import SpinMotivate from "./SpinMotivate";
import SpinHistoryCardCom from "./SpinHistoryCardCom";

export default async function PayGameCom() {
  const token = await getToken();
  if (!token) return redirect("/login");

  const user = await fetchModelById(User, token.id);
  const { balance } = user.account;

  return (
    <>
      <SpinMotivate />

      <div className="flex flex-col md:flex-row items-start justify-center gap-3 mb-5 bg-white border border-[var(--gray-10)] shadow-lg rounded-lg">
        <PayGamer balance={balance} />

        <div className="w-full p-3">
          <h1 className="font-black text-2xl mb-3">History</h1>

          <div className="flex flex-col gap-3">
            <SpinHistoryCardCom />
          </div>
        </div>
      </div>

      {/* <div className="relative w-full overflow-hidden">
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
      </div> */}
    </>
  );
}
