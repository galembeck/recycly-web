import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface AnalyticsCardProps {
  title: string;
  description: string;
  type?: "currency" | "weight" | "number";
  icon: LucideIcon;
}

export function AnalyticsCard({
  title,
  description,
  type = "number",
  icon: Icon,
}: AnalyticsCardProps) {
  return (
    <Card className="bg-primary-green">
      <CardContent className="flex items-center justify-between gap-2">
        <article>
          <h1 className="text-3xl font-bold text-white">
            {type === "currency" && <span>R$ </span>}
            {title} {type === "weight" && <span>kg</span>}
          </h1>

          <p className="text-xl text-white/80">{description}</p>
        </article>

        <div className="rounded-2xl border bg-white p-3">
          <Icon className="text-black" />
        </div>
      </CardContent>
    </Card>
  );
}
