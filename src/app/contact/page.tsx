import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// py-10 px-4 md:px-16
// text-[var(--green)]

//         <p className="font-black py-10">
//           <span className="">Home</span> &gt; Contact Us
//         </p>
//               <div className=" "></div>

export default function Contact() {
  return (
    <>
      <Header />

      <div className="px-5 sm:px-10 md:px-20 py-10 min-h-screen bg-[#D9EDE7] ">
        {/* Breadcrumb & Header */}
        <div className="mb-10">
          <p className="text-sm font-medium">
            <span className="text-[var(--green)]">Home </span> &gt; Contact Us
          </p>
          <div className="mt-8 bg-white rounded-xl p-8 shadow-md text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2 3h20v18H2V3zm18 2H4v14h16V5zm-8 7H6v2h6v-2zm6 0h-4v2h4v-2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Have something to share? We&apos;re here for it!
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="py-2 px-4 font-semibold border border-[#dedede] rounded-md text-sm">
                🕒 24 / 7 Assistance
              </span>
              <span className="py-2 px-4 font-semibold border border-[#dedede] rounded-md text-sm">
                ⚡ Quick Change Resolutions
              </span>
              <span className="py-2 px-4 font-semibold border border-[#dedede] rounded-md text-sm">
                ✨ Flexible Working Hours
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form & Info */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Options */}
          <div className="flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">You can Email us here</p>
                <p className="font-medium">payzeker@gmail.com</p>
              </div>
              <div className="p-1 bg-[#f5f5f5] text-green-600 shadow-sm">→</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Give me a call on</p>
                <p className="font-medium">+2348149547147</p>
              </div>
              <div className="p-1 bg-[#f5f5f5] text-green-600 shadow-sm">→</div>
            </div>

            <div className="mt-6">
              <p className="font-semibold mb-2">Our Social Profile</p>
              <div className="w-[100px] flex p-2 items-center bg-white rounded-lg shadow-md gap-5">
                <Link href="https://web.facebook.com/profile.php?id=61575039205827">
                  <Image
                    width={30}
                    height={30}
                    src="/icons/Facebook (1).svg"
                    alt="icon- social-f"
                  />
                </Link>

                <Link href="https://web.facebook.com/profile.php?id=61575039205827">
                  <Image
                    width={30}
                    height={30}
                    src="/icons/Facebook (2).svg"
                    alt="icon- social-f"
                  />
                </Link>
                <Link href="https://web.facebook.com/profile.php?id=61575039205827">
                  <Image
                    width={30}
                    height={30}
                    src="/icons/Facebook (3).svg"
                    alt="icon- social-f"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white md:col-span-2 p-6 rounded-xl shadow-md">
            <form className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border rounded-md px-4 py-2 w-full outline-none text-black bg-[#f5f5f5]"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border rounded-md px-4 py-2 w-full outline-none text-black bg-[#f5f5f5]"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="border rounded-md px-4 py-2 w-full outline-none text-black bg-[#f5f5f5]"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border rounded-md px-4 py-2 w-full outline-none text-black bg-[#f5f5f5]"
                />
              </div>
              <fieldset className="border border-gray-300 rounded-md px-4 py-2 bg-[#f5f5f5]">
                <legend className="text-sm text-gray-500">
                  Why are you contacting us?
                </legend>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <label className="flex gap-2 text-sm">
                    <input type="checkbox" /> Technical Support
                  </label>
                  <label className="flex gap-2 text-sm">
                    <input type="checkbox" /> Payment Issues
                  </label>
                  <label className="flex gap-2 text-sm">
                    <input type="checkbox" /> Task Inquiry
                  </label>
                  <label className="flex gap-2 text-sm">
                    <input type="checkbox" /> Others
                  </label>
                </div>
              </fieldset>
              <textarea
                rows={4}
                placeholder="Your message here..."
                className="border rounded-md px-4 py-2 w-full bg-[#f5f5f5] outline-none"
              ></textarea>
              <button
                type="submit"
                className="bg-[var(--green)] hover:bg-green-600 text-white px-6 py-2 rounded-md w-full md:w-fit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
