"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import web from "../../../../public/icons/f.svg";
import facebook from "../../../../public/icons/f.png";
import instagram from "../../../../public/icons/i.png";
import youtube from "../../../../public/icons/y.png";
import linkedin from "../../../../public/icons/l.png";
import whatsapp from "../../../../public/icons/w.png";
import taskBackImg from "../../../../public/img/b.jpg";

type userTask = { _id?: string; level?: number; price?: number; socialTarget?: string; media?: { type?: string; content?: string } };

export default function DailyTaskCard({ userTask }: { userTask: userTask }) {
  const [targetSocialIcon, setTargetSocialIcon] = useState<StaticImageData>(web);
  const [taskBackImage, setTaskBackImage] = useState<StaticImageData | string>(taskBackImg);
  const router = useRouter();

  function checkTaskMediaImage(mediaContent: string) {
    if (mediaContent != "") setTaskBackImage(mediaContent);
  }

  function checkTaskSocial(socialTarget: string) {
    const iconMap: Record<string, StaticImageData> = { facebook, instagram, youtube, linkedin, whatsapp };
    setTargetSocialIcon(iconMap[socialTarget] || web);
  }

  useEffect(() => {
    checkTaskSocial(userTask.socialTarget as string);
    checkTaskMediaImage(userTask.media?.content as string);
  }, [userTask.socialTarget, userTask.media?.content]);

  return (
    <div onClick={() => router.push(`/tasks/dailyTask/${userTask._id}`)}
      className="group relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] bg-[var(--gray-20)] shadow-xl rounded-lg">
      {userTask.media?.type === "image" && <Image src={taskBackImage} width={200} height={200} alt="task background image" className="w-full h-full rounded-lg" />}
      {userTask.media?.type === "video" && <video width={200} height={200} muted src={"/video/a.mp4"} autoPlay className="w-full h-full rounded-lg" />}
      {userTask.media?.type === "link" && <Image width={200} height={200} src={taskBackImg} alt="task background image" className="w-full h-full rounded-lg" />}
      <div className="group absolute top-0 left-0 w-full h-full hover:bg-[var(--green-trans)] rounded-lg">
        <div className="w-full h-full p-2 rounded-lg">
          <div className="flex flex-row justify-end">
            <div className="flex flex-row justify-between items-center w-[100px] bg-[var(--green)] group-hover:bg-[var(--white)] rounded-full">
              <div className="w-[30px] h-[30px] p-2 rounded-full bg-[var(--white)]">
                <Image src={targetSocialIcon} width={100} alt="social icons" className="m-auto" />
              </div>
              <span className="mx-3 font-black text-[12px] text-[var(--white)] group-hover:text-[var(--black)]">Level: {userTask.level}</span>
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
