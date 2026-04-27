import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AchievementPoint } from "@/types/statistics";
import { Award } from "lucide-react";

interface Props {
  achievements: AchievementPoint[];
}

export function AchievementsCard({ achievements }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conquistas</CardTitle>
        <CardDescription>
          Marcos alcançados pela sua cooperativa
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {achievements.map((a) => (
          <div
            key={a.title}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
              a.unlocked
                ? "bg-primary-green/10 text-foreground"
                : "bg-muted/40 text-muted-foreground"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                a.unlocked
                  ? "bg-primary-green text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Award className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-semibold ${a.unlocked ? "" : "opacity-60"}`}>
                {a.title}
              </span>
              <span className="text-xs opacity-70">{a.description}</span>
            </div>
            {a.unlocked && (
              <span className="ml-auto text-xs font-medium text-primary-green">
                Desbloqueado
              </span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
