import { Icon } from "@iconify/react";

type ModalFrameProbs = {
  children: React.ReactNode;
  title: string;
  bgColor?: string;
  closeModal?: () => void;
};

export default function ModalFrame({ children, title, closeModal, bgColor = "bg-white" }: ModalFrameProbs) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className={`max-h-[90vh] w-full max-w-[420px] overflow-y-auto rounded-2xl shadow-modal animate-fade-up ${bgColor}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-black text-ink">{title}</h2>
          {closeModal && (
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-slate-100 hover:text-ink"
            >
              <Icon icon="mdi:close" width={20} />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
