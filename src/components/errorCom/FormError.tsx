type FormErrorProbs = {
  msg: string;
};

export default function FormError({ msg }: FormErrorProbs) {
  return (
    <div className="text-white text-center text-[12px] mt-2 mb-1 p-2 bg-red-600">
      {msg}
    </div>
  );
}
