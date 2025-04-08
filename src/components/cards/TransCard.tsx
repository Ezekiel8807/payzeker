// import Image from "next/image";

export default function TransCard() {
  return (
    <div className="w-full p-2 flex flex-row items-center justify-between mt-3 gap-3 bg-[var(--gray-05)] rounded">
      <div className="flex flex-row justify-start gap-2">
        <div className="w-[30px] h-[30px] flex items-center justify-center bg-[var(--green-trans)] text-center rounded">
          B
        </div>
        <div className="font-light text-[10px]">
          <p className="font-black">Deposit</p>
          <p className="text-[11px]">eri7w94ie0d83ehd8ccecius8cew</p>
          <p className="text-[8px]">2/4/2025 7:15pm</p>
        </div>
      </div>
      <div>
        <p className="font-black text-[12px]">-#5000</p>
        <span className="text-[9px] bg-[#00ff0050] px-2 rounded-full">
          successful
        </span>
      </div>
    </div>
  );
}
