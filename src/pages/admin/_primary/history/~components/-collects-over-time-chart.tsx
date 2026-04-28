import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { Collect } from "@/types/collect";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  count: {
    label: "Coletas",
    color: "var(--chart-1)",
  },
  weightKg: {
    label: "kg coletados",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface Props {
  collects: Collect[];
}

export function CollectsOverTimeChart({ collects }: Props) {
  const chartData = useMemo(() => {
    const map = new Map<
      string,
      { month: string; count: number; weightKg: number }
    >();

    for (const c of collects) {
      const month = format(new Date(c.collectedAt), "MMM/yy", { locale: ptBR });
      const existing = map.get(month);
      if (existing) {
        existing.count += 1;
        existing.weightKg += Number(c.weightKg);
      } else {
        map.set(month, { month, count: 1, weightKg: Number(c.weightKg) });
      }
    }

    return Array.from(map.values());
  }, [collects]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coletas ao longo do tempo</CardTitle>
        <CardDescription>
          Quantidade e peso coletado agrupados por mês.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-62.5 items-center justify-center text-muted-foreground text-sm">
            Nenhuma coleta registrada ainda.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-62.5 w-full">
            <AreaChart data={chartData} margin={{ left: 8, right: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={40}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) =>
                      name === "weightKg"
                        ? [`${Number(value).toFixed(2)} kg`]
                        : [value, " coletas"]
                    }
                  />
                }
              />
              <Area
                dataKey="count"
                type="monotone"
                stroke="var(--color-count)"
                fill="var(--color-count)"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Area
                dataKey="weightKg"
                type="monotone"
                stroke="var(--color-weightKg)"
                fill="var(--color-weightKg)"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
