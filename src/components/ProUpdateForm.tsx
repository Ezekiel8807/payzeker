type ProUpdateFormProbs = {
  title: string;
  children: React.ReactNode;
  handleForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function ProUpdateForm({
  children,
  title,
  handleForm,
}: ProUpdateFormProbs) {
  return (
    <div className="w-[100%] md:w-[50%] p-5 bg-[var(--gray-01)]">
      <h2 className="font-black text-xl mb-5">{title}</h2>
      <form onSubmit={handleForm} method="POST">
        {children}
      </form>
    </div>
  );
}
