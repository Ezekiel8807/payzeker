type MainProbs = { children: React.ReactNode };

export default function Main({ children }: MainProbs) {
  return <div className="w-full min-h-screen">{children}</div>;
}
