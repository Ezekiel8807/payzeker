type ModalFrame2Probs = {
  children: React.ReactNode;
  bgColor?: string;
};

export default function ModalFrame2({ children, bgColor = "bg-white" }: ModalFrame2Probs) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className={`w-full max-w-[340px] rounded-2xl p-4 shadow-modal animate-fade-up ${bgColor}`}>
        {children}
      </div>
    </div>
  );
}
