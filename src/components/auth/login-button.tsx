"use client";

import { useRouter } from "next/navigation";

type LoginButtonProps = {
  mode: "model" | "redirect";
  children: React.ReactNode;
  asChild?: boolean;
};

export default function LoginButton({ children, mode }: LoginButtonProps) {
  const router = useRouter();

  function handleClick() {
    router.push("/auth/login");
  }

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
}
