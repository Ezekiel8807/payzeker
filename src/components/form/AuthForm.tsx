import Link from "next/link";

type AuthFormProbs = {
  children: React.ReactNode;
  title: string;
  // closeModal?: () => void;
};

export default function AuthForm({ children, title }: AuthFormProbs) {
  return (
    <div className="fixed inset-0 bg-opacity-1 backdrop-blur-sm flex items-center justify-center">
      <div className="p-3 w-[90%] max-w-[400px] mx-auto rounded-lg shadow-xl">
        <div className="flex items-center justify-between">
          <h1 className="font-black text-3xl text-[var(--green)]">{title}</h1>
          <span className="w-[20px] h-[20px] p-1 cursor-pointer font-black text-[var(--white)] text-[10px] bg-[var(--green)] text-center rounded-full">
            <Link href="/">X</Link>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
