import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";

const THEMES = [
  { value: "light", label: "Claro", icon: Sun },
  { value: "dark", label: "Escuro", icon: Moon },
  { value: "system", label: "Sistema", icon: Monitor },
] as const;

export function AppearanceCard() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Aparência</CardTitle>
        <CardDescription>
          Escolha como a plataforma deve ser exibida para você.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {THEMES.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              className={cn(
                "flex flex-col items-center gap-3 rounded-lg border-2 cursor-pointer p-4 text-sm font-medium transition-all hover:bg-muted/50",
                theme === value
                  ? "border-primary-green bg-primary-green/5 text-primary-green"
                  : "border-border text-muted-foreground",
              )}
            >
              <Icon className="h-6 w-6" />
              {label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
