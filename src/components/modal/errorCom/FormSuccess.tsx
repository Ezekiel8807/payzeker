type FormSuccessProbs = {
  msg: string;
};

export default function FormSuccess({ msg }: FormSuccessProbs) {
  return (
    <div className="text-white text-center text-[12px] mt-2 mb-1 p-2 bg-green-600">
      {msg}
    </div>
  );
}
