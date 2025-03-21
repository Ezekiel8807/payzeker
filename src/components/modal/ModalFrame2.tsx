type ModalFrameProbs = {
  children: React.ReactNode;
  bgColor?: string;
  closeModal?: () => void;
};

export default function ModalFrame2({
  children,
  closeModal,
  bgColor = "bg-[var(--white)]",
}: ModalFrameProbs) {
  return (
    // fixed  bg-opacity-1  hiden
    <div className="fixed z-10 top-0 left-0 w-screen h-screen bg-[var(--black-trans)] bg-opacity-1 flex items-center justify-center backdrop-blur-sm ">
      <div
        className={`relative w-[90%] max-w-[300px] m-auto p-2 rounded ${bgColor}`}
      >
        {children}
      </div>
    </div>
  );
}
