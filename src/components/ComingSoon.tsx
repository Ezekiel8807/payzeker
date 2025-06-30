import React from "react";

//image
import ilux from "../../public/img/ilux.svg";

//components
import Image from "next/image";
import NewLetterForm from "./form/NewLetterForm";

export default function ComingSoon() {
  return (
    <div className=" bg-white flex items-center justify-center p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            Your solution for <br />
            <span className="text-[var(--green)]">Simple and easy tasks</span>
          </h1>
          <p className="text-gray-600">
            Payzeker helps businesses easily find reliable freelancers to
            complete simple tasks quickly.
            <br />
            Freelancers can earn by handling micro-tasks, enabling businesses to
            stay productive and efficient.
          </p>

          <div>
            <p className="mb-3 text-gray-700">
              We are launching soon!!! Sign up to our newsletter to stay updated
            </p>

            <NewLetterForm />
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
            src={ilux}
            alt="Launch Illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
