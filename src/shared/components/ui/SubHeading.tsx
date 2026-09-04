import React from "react";

type SubHeadingProbs = { title: string; desc: string; };

export default function SubHeading({ title, desc }: SubHeadingProbs) {
  return (
    <div className="mb-6">
      <h1 className="section-title">{title}</h1>
      <p className="section-desc">{desc}</p>
    </div>
  );
}
