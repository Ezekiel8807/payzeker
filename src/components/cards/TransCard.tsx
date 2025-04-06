import Image from "next/image";

export default function TransCard() {
  return (
    <div className="w-full flex flex-row justify-between mt-3 gap-3">
      <div className="flex flex-row justify-start gap-2">
        <Image
          src="/img/e.svg"
          className="bg-[var(--gray-05)] rounded-full"
          width="50"
          height="50"
          alt="transaction icon"
        />
        <div>
          <p>eri7w94ie0d83ehd8ccecius8cew</p>
          <p>2/4/2025 7:15pm</p>
        </div>
      </div>
      <div>
        <p>-#5000</p>
        <span>sent</span>
      </div>
    </div>
  );
}
