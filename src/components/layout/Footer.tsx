//components
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    // px-5 sm:px-10 md:px-20 py-5
    <footer className="w-full px-5 sm:px-10 md:px-20 py-10 flex flex-col md:flex-row items-center justify-between text-white bg-[var(--green)]">
      <Image
        src="/img/logo_white1.png"
        width={200}
        height={200}
        style={{ width: "auto", height: "auto" }}
        alt="payzeker-logo-alt-white"
        className="md:-ml-12"
      />

      <p className="text-sm py-3 md:ml-5 text-white">
        © Copyright {new Date().getFullYear()}. All Rights Reserved
      </p>

      {/* social handles */}
      <div className="flex flex-row justify-center items-center">
        <h3 className="text-white mr-1">Follow: </h3>
        <div className="flex flex-row justify-end">
          <Link
            className="mx-1 block"
            target="_blank"
            rel="noopener noreferrer"
            href="https://web.facebook.com/profile.php?id=61575039205827"
          >
            <Image
              src="/icons/f.png"
              width={30}
              height={30}
              alt="Facebook Icon - Link to Facebook page"
            />
          </Link>
          <Link
            className="mx-1 block"
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/payzeker"
          >
            <Image
              src="/icons/x.png"
              width={30}
              height={30}
              alt="Twitter Icon - Link to Twitter page"
            />
          </Link>
          <Link
            className="mx-1 block"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/payzeker/"
          >
            <Image
              src="/icons/i.png"
              width={30}
              height={30}
              alt="Instagram Icon - Instagram  profile"
            />
          </Link>
          <Link
            className="mx-1 block"
            target="_blank"
            rel="noopener noreferrer"
            href="https://wa.link/q91k54"
          >
            <Image
              src="/icons/w.png"
              width={30}
              height={30}
              alt="WhatsApp Icon - Send Us message"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
