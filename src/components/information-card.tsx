import type { LucideIcon } from "lucide-react";

interface InformationCardProps {
  icon: LucideIcon;
  layout: "success" | "destructive";
  title: string;
  description: string;
}

export function InformationCard({
  icon: Icon,
  layout,
  title,
  description,
}: InformationCardProps) {
  return (
    <div className="flex flex-col items-start gap-3.5 rounded-[10px] bg-white dark:bg-third-dark p-3.5 shadow-xl">
      <div
        className={`${layout === "success" ? "bg-primary-green" : "bg-primary-red/10 dark:bg-primary-red/70"} flex h-12 w-12 items-center justify-center rounded-lg`}
      >
        <Icon
          className={`${layout === "success" ? "text-white" : "text-black dark:text-white"}`}
        />
      </div>

      <h1 className="font-semibold text-2xl text-black dark:text-white">
        {title}
      </h1>

      <p className="text-[#7C7C7C] dark:text-muted-foreground text-lg">
        {description}
      </p>
    </div>
  );
}
