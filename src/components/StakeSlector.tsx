export default function StakeSlector({
  onAdd,
  onReset,
}: {
  onAdd: React.Dispatch<React.SetStateAction<number>>;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-row my-3 items-center justify-between gap-2">
      {["100", "500", "1000", "5000"].map((val) => (
        <div
          key={val}
          className="w-[60px] p-1 text-center font-black bg-[var(--green)] hover:bg-[#019875] text-white text-[12px] rounded cursor-pointer"
          onClick={() => {
            onAdd((e) => (e += parseInt(val)));
          }}
        >
          {val}
        </div>
      ))}
      <div
        className="w-[60px] p-1 text-center font-black bg-[#FF6B6B] hover:bg-red-500 text-white text-[12px] rounded cursor-pointer"
        onClick={onReset}
      >
        Reset
      </div>
    </div>
  );
}
