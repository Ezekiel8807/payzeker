import ContactForm from "@/features/marketing/forms/ContactForm";
import Footer from "@/shared/components/layout/Footer";
import Header from "@/shared/components/layout/Header";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Payzeker - Contact page",
  description: "Connect with us at payzeker",
};

export default function Contact() {
  return (
    <>
      <Header />

      <div className="page-container py-10 min-h-screen bg-[#D9EDE7]">
        {/* Breadcrumb & Header */}
        <div className="mb-10">
          <p className="text-sm font-medium">
            <span className="text-[var(--green)]">Home </span> &gt; Contact Us
          </p>
          <div className="mt-8 bg-white rounded-xl p-8 shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/icons/contact23.svg"
                width={50}
                height={50}
                alt="duo"
              />
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
              <div className="w-[150px] flex p-2 items-center bg-white rounded-lg shadow-md gap-5">
                <Link href="https://web.facebook.com/profile.php?id=61575039205827">
                  <Image
                    width={50}
                    height={50}
                    src="/icons/Facebook (1).svg"
                    alt="icon- social-f"
                  />
                </Link>

                <Link href="https://web.facebook.com/profile.php?id=61575039205827">
                  <Image
                    width={50}
                    height={50}
                    src="/icons/Facebook (2).svg"
                    alt="icon- social-f"
                  />
                </Link>
                <Link href="https://web.facebook.com/profile.php?id=61575039205827">
                  <Image
                    width={50}
                    height={50}
                    src="/icons/Facebook (3).svg"
                    alt="icon- social-f"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white md:col-span-2 p-6 rounded-xl shadow-md">
            <ContactForm />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
