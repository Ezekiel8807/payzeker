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
    <div className="card w-full md:w-1/2 p-6">
      <h2 className="font-black text-xl mb-5">{title}</h2>
      <form onSubmit={handleForm} method="POST">
        {children}
      </form>
    </div>
  );
}
