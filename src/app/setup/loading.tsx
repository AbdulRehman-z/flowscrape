import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { LoaderIcon } from "lucide-react";

export default function loading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <Logo />
      <Separator className="max-w-xs" />
      <div className="flex items-center gap-2 justify-center">
        <LoaderIcon size={16} className="animate-spin stroke-primary" />
        <p className="text-muted-foreground">Setting up your account</p>
      </div>
    </div>
  );
}
