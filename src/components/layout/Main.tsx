type MainProbs = {
  children: React.ReactNode;
};

export default function Main({ children }: MainProbs) {
  return (
    <div className="w-full h-screen m-auto overflow-y-scroll no-scrollbar">
      {children}
    </div>
  );
}
