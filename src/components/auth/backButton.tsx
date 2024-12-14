import Link from "next/link";

type BackButtonProps = {
  href: string;
  label: string;
  titleFooter?: string;
};

export default function BackButton({
  href,
  label,
  titleFooter,
}: BackButtonProps) {
  return (
    <div className="text-sm text-muted-foreground text-center">
      {label}{" "}
      <Link
        href={href}
        className="underline underline-offset-4 hover:text-primary font-semibold"
      >
        {titleFooter}
      </Link>
    </div>
  );
}
