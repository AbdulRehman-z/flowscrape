import { TriangleAlert } from "lucide-react";

export default function FormError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center text-destructive text-sm gap-x-2">
      <TriangleAlert className="size-6" />
      <p>{message}</p>
    </div>
  );
}
