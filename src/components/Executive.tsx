import Image from "next/image";
import Link from "next/link";
import React from "react";

type ExecutiveProbs = {
  name: string;
  imgPath: string;
  title: string;
  fLink: string;
  lLink: string;
  xLink: string;
};

export default function Executive({
  name,
  imgPath,
  title,
  fLink,
  lLink,
  xLink,
}: ExecutiveProbs) {
  return (
    <div className="m-auto">
      <Image width={300} height={300} src={imgPath} alt="executine-photo" />

      <h1 className="font-black text-lg mt-2">{name}</h1>
      <p className="text-md mb-2">{title} </p>

      <div className="flex gap-5">
        <Link href={fLink}>
          <Image
            width={30}
            height={30}
            src="/icons/Facebook (1).svg"
            alt="icon- social-f"
          />
        </Link>

        <Link href={lLink}>
          <Image
            width={30}
            height={30}
            src="/icons/Facebook (2).svg"
            alt="icon- social-f"
          />
        </Link>
        <Link href={xLink}>
          <Image
            width={30}
            height={30}
            src="/icons/Facebook (3).svg"
            alt="icon- social-f"
          />
        </Link>
      </div>
    </div>
  );
}
