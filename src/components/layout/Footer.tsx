//components
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[var(--green)] text-white text-xl">
      <div className="flex flex-col md:flex-row p-5 justify-center">
        <div className="flex flex-col md:flex-row items-center md:w-[70%]">
          <Image
            src="/img/logo_white.png"
            width={300}
            height={200}
            style={{ width: "auto", height: "auto" }}
            alt="payzeker-logo-alt-white"
          />
          <p className="text-sm py-3 md:ml-5 text-white">
            © Copyright {new Date().getFullYear()}. All Rights Reserved
          </p>
        </div>

        {/* social handles */}
        <div className="flex flex-row justify-center items-center md:w-[20%]">
          <h3 className="text-white mr-1">Follow: </h3>
          <div className="flex flex-row justify-end">
            <Link
              className="mx-1 block"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/profile.php?id=100077701836062/"
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
              href="https://x.com/AyebidunEzekiel/"
            >
              <Image
                src="/icons/f.svg"
                width={30}
                height={30}
                alt="Twitter Icon - Link to Twitter page"
              />
            </Link>
            <Link
              className="mx-1 block"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/Ezekiel8807/"
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
              href="mailto:ayebidunezekiel@gmail.com"
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
      </div>
    </footer>
  );
}
