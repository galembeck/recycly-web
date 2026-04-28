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
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface Props {
  collects: Collect[];
}

export function CollectWeightByMaterialChart({ collects }: Props) {
  const { chartData, chartConfig } = useMemo(() => {
    const map = new Map<
      string,
      { material: string; weightKg: number; fill: string }
    >();

    for (const c of collects) {
      const name = c.material?.name ?? "Desconhecido";
      const color = c.material?.color ?? "var(--chart-1)";
      const existing = map.get(name);
      if (existing) {
        existing.weightKg += Number(c.weightKg);
      } else {
        map.set(name, {
          material: name,
          weightKg: Number(c.weightKg),
          fill: color,
        });
      }
    }

    const data = Array.from(map.values()).sort(
      (a, b) => b.weightKg - a.weightKg,
    );

    const config = Object.fromEntries(
      data.map((d) => [d.material, { label: d.material, color: d.fill }]),
    ) as ChartConfig;

    return { chartData: data, chartConfig: config };
  }, [collects]);

  const totalKg = chartData.reduce((s, d) => s + d.weightKg, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Peso por material</CardTitle>
        <CardDescription>
          {totalKg > 0
            ? `${totalKg.toFixed(2)} kg coletados no total`
            : "Nenhuma coleta registrada ainda"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-62.5 items-center justify-center text-muted-foreground text-sm">
            Nenhuma coleta registrada ainda.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-62.5 w-full">
            <BarChart data={chartData} margin={{ left: 8, right: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="material"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(v) => `${v} kg`}
                width={64}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`${Number(value).toFixed(2)} kg`]}
                    nameKey="material"
                  />
                }
              />
              <Bar dataKey="weightKg" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
