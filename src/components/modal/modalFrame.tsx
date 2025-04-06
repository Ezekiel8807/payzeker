type ModalFrameProbs = {
  children: React.ReactNode;
  title: string;
  bgColor?: string;
  closeModal?: () => void;
};

export default function ModalFrame({
  children,
  title,
  closeModal,
  bgColor = "bg-[var(--white)]",
}: ModalFrameProbs) {
  return (
    // fixed  bg-opacity-1  hiden
    <div className="fixed z-10 top-0 left-0 w-screen h-screen bg-[var(--black-trans)] bg-opacity-1 flex items-center justify-center backdrop-blur-sm ">
      <div className={` w-[90%] max-w-[400px] m-auto rounded ${bgColor}`}>
        <h1 className="relative font-black p-3 text-3xl bg-[var(--gray-05)]">
          {title}
          <div
            onClick={closeModal}
            className="absolute top-3 right-3 w-[30px] h-[30px] rounded-full bg-[var(--green)]"
          >
            X
          </div>
        </h1>

        {children}
      </div>
    </div>
  );
}
