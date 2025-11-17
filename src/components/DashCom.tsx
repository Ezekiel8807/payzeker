// components
// import Script from "next/script";
import MoneyCom from "./MoneyCom";
import DailyTask from "./DailyTask";
import Performance from "./Performance";
import PayGameCom from "./PayGameCom";

export default function DashCom() {
  return (
    <>
      <MoneyCom />

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

      {/* {show && (
        <div className="bg-[#e6fff7] p-5 rounded-2xl shadow-md mt-6 w-full mx-auto">
          <div className="flex items-start justify-between">
            <h2 className="w-[90%] text-2xl font-bold text-[#29cd9c] mb-3 flex items-center gap-2">
              🔓 Upgrade & Unlock More Features
            </h2>

            <button
              onClick={() => setShow(false)}
              className="text-gray-500 hover:text-red-500 text-xl leading-none"
            >
              &times;
            </button>
          </div>
          <p className="text-gray-700 mb-6">
            Get access to exclusive tasks, increased rewards, and more by
            upgrading your account today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/upgrade"
              className="bg-[#29cd9c] hover:bg-[#22b891] text-white font-medium px-6 py-2 rounded-xl transition-all duration-200"
            >
              Upgrade Now
            </Link>
            <Link
              href="/upgrade"
              className="border border-[#29cd9c] text-[#29cd9c] hover:bg-[#f0fffa] font-medium px-6 py-2 rounded-xl transition-all duration-200"
            >
              View Plans
            </Link>
          </div>
        </div>
      )} */}

      <Performance />

      <div className="flex flex-col-reverse sm:flex-row justify-between my-5 gap-5">
        <div className="w-full sm:w-[30%]">
          <PayGameCom />
        </div>

        <div className="w-full sm:w-[70%]">
          <DailyTask />
        </div>
      </div>
    </>
  );
}
