import Image from "next/image";
import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Payzeker - Coming soon!!!",
};

export default function ComingSoon() {
  return (
    <>
      <Header />
      <div className=" bg-white flex items-center justify-center p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              Your go-to solution for <br />
              <span className="text-[var(--green)]">
                freelance task management
              </span>
            </h1>
            <p className="text-gray-600">
              Payzekre helps businesses easily find reliable freelancers to
              complete simple tasks quickly.
              <br />
              Freelancers can earn by handling micro-tasks, enabling businesses
              to stay productive and efficient.
            </p>

            <div>
              <p className="mb-2 text-gray-700">
                We are launching soon!!! Sign up to our newsletter to stay
                updated
              </p>
              <form className="flex w-full md:max-w-md">
                <input
                  type="email"
                  placeholder="Enter your mail"
                  className="w-[70%] px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-[30%] py-2 bg-[var(--green)] text-white text-center rounded-r-md hover:bg-emerald-600"
                >
                  Submit
                </button>
              </form>
            </div>

            <div className="flex space-x-3">
              <a
                href="https://web.facebook.com/profile.php?id=61575039205827"
                target="_blank"
                className="text-black"
              >
                <Image
                  width={20}
                  height={20}
                  src="/icons/fb.svg"
                  alt="facebook icon"
                  className="object-contain"
                />
              </a>
              <a
                href="https://www.instagram.com/payzeker/"
                target="_blank"
                className=" text-black"
              >
                <Image
                  width={20}
                  height={20}
                  src="/icons/ins.svg"
                  alt="instagram icon"
                  className="object-contain"
                />
              </a>
              <a
                href="https://x.com/payzeker"
                target="_blank"
                className="text-black"
              >
                <Image
                  width={20}
                  height={20}
                  src="/icons/twt.svg"
                  alt="twiter icon"
                  className="object-contain"
                />
              </a>
              <a
                href="https://wa.link/q91k54"
                target="_blank"
                className="text-black"
              >
                <Image
                  width={20}
                  height={20}
                  src="/icons/wht.svg"
                  alt="whatsapp icon"
                  className="object-contain"
                />
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-full hidden md:block">
            <Image
              src="/public/img/Illustration.svg"
              alt="Launch Illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
