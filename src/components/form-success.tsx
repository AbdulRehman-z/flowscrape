import { CheckIcon } from "lucide-react";

export default function FormSuccess({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center text-emerald-500 gap-x-2 text-sm">
      <CheckIcon className="size-6" />
      <p>{message}</p>
    </div>
  );
}
