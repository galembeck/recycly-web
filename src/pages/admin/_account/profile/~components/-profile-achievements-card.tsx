import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStatistics } from "@/hooks/services/use-statistics";
import { Lock, Trophy } from "lucide-react";

export function ProfileAchievementsCard() {
  const { data: stats, isLoading } = useStatistics();

  const achievements = stats?.achievements ?? [];
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Conquistas</CardTitle>
            <CardDescription>
              Marcos alcançados pela sua cooperativa na plataforma.
            </CardDescription>
          </div>

          {!isLoading && achievements.length > 0 && (
            <span className="font-semibold text-primary-green text-sm">
              {unlockedCount}/{achievements.length} desbloqueadas
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isLoading && (
          <p className="py-4 text-center text-muted-foreground text-sm">
            Carregando conquistas...
          </p>
        )}

        {!isLoading && achievements.length === 0 && (
          <p className="py-4 text-center text-muted-foreground text-sm">
            Nenhuma conquista disponível ainda.
          </p>
        )}

        {!isLoading && achievements.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${
                  achievement.unlocked
                    ? "border-primary-green/30 bg-primary-green/5"
                    : "opacity-50 grayscale"
                }`}
              >
                <div
                  className={`mt-0.5 rounded-lg p-2 ${
                    achievement.unlocked
                      ? "bg-primary-green text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {achievement.unlocked ? (
                    <Trophy className="h-4 w-4" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                </div>

                <div className="flex flex-col gap-0.5">
                  <span
                    className={`font-semibold text-sm ${
                      achievement.unlocked ? "text-primary-green" : ""
                    }`}
                  >
                    {achievement.title}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {achievement.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
