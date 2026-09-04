import Executive from "@/shared/components/layout/Executive";

const executives = [
  { name: "Ayebidun Ezekiel", imgPath: "/img/Image 1.svg", title: "Founder & CEO", fLink: "", lLink: "", xLink: "" },
  { name: "Guy Hawkins", imgPath: "/img/Image 2.svg", title: "Head of Marketing", fLink: "", lLink: "", xLink: "" },
  { name: "Ronald Richards", imgPath: "/img/Image 3.svg", title: "Lead Designer", fLink: "", lLink: "", xLink: "" },
];

export default function OurTeam() {
  return (
    <div className="page-container py-5 sm:py-10 bg-white">
      <div className="w-full sm:max-w-[800px] m-auto p-5 text-center">
        <h1 className="font-black text-sm text-[var(--green)]">Our Team</h1>
        <h1 className="font-black text-lg">Meet the passionate individuals behind Payzeker</h1>
        <p className="text-sm">Together, we&apos;re committed to empowering freelancers and businesses.</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between py-5 gap-10">
        {executives.map((e) => (
          <Executive key={e.name} name={e.name} imgPath={e.imgPath} title={e.title} fLink={e.fLink} lLink={e.lLink} xLink={e.xLink} />
        ))}
      </div>
    </div>
  );
}
