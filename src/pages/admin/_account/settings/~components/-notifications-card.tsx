import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const STORAGE_KEY = "recycly-notification-prefs";

interface NotificationPrefs {
  newCollect: boolean;
  newSale: boolean;
  weeklyReport: boolean;
  systemAlerts: boolean;
}

const DEFAULTS: NotificationPrefs = {
  newCollect: true,
  newSale: true,
  weeklyReport: false,
  systemAlerts: true,
};

const ITEMS: { key: keyof NotificationPrefs; label: string; description: string }[] = [
  {
    key: "newCollect",
    label: "Nova coleta registrada",
    description: "Receba uma notificação ao registrar uma nova coleta.",
  },
  {
    key: "newSale",
    label: "Nova venda registrada",
    description: "Receba uma notificação ao registrar uma nova venda.",
  },
  {
    key: "weeklyReport",
    label: "Relatório semanal",
    description: "Resumo semanal das atividades da sua cooperativa.",
  },
  {
    key: "systemAlerts",
    label: "Alertas do sistema",
    description: "Notificações sobre atualizações e manutenção da plataforma.",
  },
];

export function NotificationsCard() {
  const [prefs, setPrefs] = useState<NotificationPrefs>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULTS, ...JSON.parse(stored) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  function toggle(key: keyof NotificationPrefs) {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Notificações</CardTitle>
        <CardDescription>
          Escolha quais eventos geram notificações para você.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-1">
        {ITEMS.map((item, index) => (
          <div key={item.key}>
            <div className="flex items-center justify-between py-3">
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-sm">{item.label}</span>
                <span className="text-muted-foreground text-xs">
                  {item.description}
                </span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={prefs[item.key]}
                onClick={() => toggle(item.key)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green ${
                  prefs[item.key] ? "bg-primary-green" : "bg-input"
                }`}
              >
                <span
                  className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${
                    prefs[item.key] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {index < ITEMS.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
