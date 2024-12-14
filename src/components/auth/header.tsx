type HeaderProps = {
  titleHeader: string;
  label: string;
};
export default function Header({ label, titleHeader }: HeaderProps) {
  return (
    <>
      <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-xl flex items-center justify-center">
        <div className="w-8 h-8 bg-white rounded-md" />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{titleHeader}</h1>
        <p className="text-base text-muted-foreground">{label}</p>
      </div>
    </>
  );
}
