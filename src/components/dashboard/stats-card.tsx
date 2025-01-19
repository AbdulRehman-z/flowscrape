import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import ReactCountUpWrapper from "../workflow/react-countup-wrapper";

type StatsCardProps = {
  title: string;
  value: number;
  icon: LucideIcon
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  const Icon = icon;
  return (
    <Card className="relative overflow-hidden shadow-none">
      <CardHeader className="font-semibold text-lg">
        {title}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-base text-muted-foreground">
            <ReactCountUpWrapper value={value} />
          </span>
          <Icon className="size-24 absolute -right-8 stroke-primary/20 top-100" />
        </div>
      </CardContent>
    </Card >
  )
}
