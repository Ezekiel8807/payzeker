"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

type userTask = {
  _id?: string;
  level?: number;
  price?: number;
  socialTarget?: string;
  media?: {
    type?: "image" | "video" | "others";
    content?: string;
  };
};

//icons
import web from "../../../public/icons/f.svg";
import facebook from "../../../public/icons/f.png";
import instagram from "../../../public/icons/i.png";
import youtube from "../../../public/icons/y.png";
import linkedin from "../../../public/icons/l.png";
import whatsapp from "../../../public/icons/w.png";

//images
import taskBackImg from "../../../public/img/b.jpg";

//video
// import taskBackVid from "../../public/video/a.mp4";

export default function DailyTaskCard({ userTask }: { userTask: userTask }) {
  const [targetSocialIcon, setTargetSocialIcon] =
    useState<StaticImageData>(web);
  const [taskBackImage, setTaskBackImage] = useState<StaticImageData | string>(
    taskBackImg
  );

  const router = useRouter();

  // const taskBackImgCheck: StaticImageData | string =
  //    ? userTask.media?.content : taskkBackImg;
  // const taskBackvidCheck: StaticImageData | string =
  //   userTask.media?.content != "" ? userTask.media?.content : taskkBackImg;

  // function to select roundom image
  // function getroundBackTaskImg() {
  //   // image array
  //   const taskBack = [back1, back2, back3];

  //   const roundomNum = Math.floor(Math.random() * taskBack.length - 1);
  //   return taskBack[roundomNum];
  // }

  function checkTaskMediaImage(mediaContent: string) {
    if (mediaContent != "") {
      setTaskBackImage(mediaContent);
    }
  }

  //fuction to set social icons base on task social target
  function checkTaskSocial(socialTarget: string) {
    switch (socialTarget) {
      case "facebook":
        setTargetSocialIcon(facebook);
        break;

      case "instagram":
        setTargetSocialIcon(instagram);
        break;

      case "youtube":
        setTargetSocialIcon(youtube);
        break;

      case "linkedin":
        setTargetSocialIcon(linkedin);
        break;

      case "whatsapp":
        setTargetSocialIcon(whatsapp);
        break;

      default:
        setTargetSocialIcon(web);
        break;
    }
  }

  useEffect(() => {
    checkTaskSocial(userTask.socialTarget as string);
    checkTaskMediaImage(userTask.media?.content as string);
  }, [userTask.socialTarget, userTask.media?.content]);

  return (
    <div
      onClick={() => router.push(`/tasks/${userTask._id}`)}
      className="group relative w-[200px] h-[200px] bg-[var(--gray-20)] shadow-xl rounded-lg"
    >
      {userTask.media?.type === "image" && (
        <Image
          src={taskBackImage}
          width={200}
          height={200}
          alt="task background image"
          className="w-full h-full rounded-lg"
        />
      )}

      {userTask.media?.type === "video" && (
        <video
          width={200}
          height={200}
          muted
          src={"/video/a.mp4"}
          autoPlay
          className="w-full h-full rounded-lg"
        ></video>
      )}

      {userTask.media?.type === "others" && (
        <Image
          width={200}
          height={200}
          src={taskBackImg}
          alt="task background image"
          className="w-full h-full rounded-lg"
        />
      )}

      <div className="group absolute top-0 left-0  w-[200px] h-[200px] hover:bg-[var(--green-trans)] rounded-lg">
        <div className="w-full h-full p-2 rounded-lg">
          <div className="flex flex-row justify-end ">
            <div className="flex flex-row justify-between items-center w-[100px] bg-[var(--green)] group-hover:bg-[var(--white)] rounded-full">
              <div className="w-[30px] h-[30px] p-2 rounded-full bg-[var(--white)]">
                <Image
                  src={targetSocialIcon}
                  width={100}
                  alt="social icons"
                  className="m-auto"
                />
              </div>
              <span className="mx-3 font-black text-[12px] text-[var(--white)] group-hover:text-[var(--black)] ">
                Level: {userTask.level}
              </span>
            </div>
          </div>

          <div className="absolute font-black p-1 w-[60px] text-center left-2 bottom-2 group-hover:bg-white bg-[var(--green)] text-[var(--white)] group-hover:text-[var(--black)] rounded-lg">
            {`#${userTask.price}`}
          </div>
        </div>
      </div>
    </div>
  );
}
