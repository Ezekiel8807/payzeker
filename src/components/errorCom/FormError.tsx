import { Icon } from "@iconify/react";

type FormErrorProbs = {
  msg: string;
};

export default function FormError({ msg }: FormErrorProbs) {
  if (!msg) return null;
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 flex items-center gap-x-2 text-sm text-red-600 mt-2">
      <Icon icon="heroicons:exclamation-triangle" className="h-4 w-4" />
      <p>{msg}</p>
    </div>
  );
}
