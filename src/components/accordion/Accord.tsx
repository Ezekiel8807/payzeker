import React from "react";

type AccordProbs = {
  question: string;
  answer: string;
  isActive: boolean;
};

export default function Accord({ question, answer, isActive }: AccordProbs) {
  return (
    <div>
      <div>
        <h1>{question}</h1>

        <span>{isActive ? "up" : "down"}</span>
      </div>

      <p>{answer}</p>
    </div>
  );
}
