import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { MaterialKgPoint } from "@/types/statistics";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

interface Props {
  data: MaterialKgPoint[];
}

export function MaterialDistributionChart({ data }: Props) {
  const chartData = data.map((d, i) => ({
    material: d.material,
    weightKg: Number(d.weightKg),
    fill: COLORS[i % COLORS.length],
  }));

  const chartConfig = Object.fromEntries(
    data.map((d, i) => [
      d.material,
      { label: d.material, color: COLORS[i % COLORS.length] },
    ]),
  ) as ChartConfig;

  const totalKg = data.reduce((s, d) => s + Number(d.weightKg), 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribuição por Material</CardTitle>
        <CardDescription>
          {totalKg > 0
            ? `${totalKg.toFixed(2)} kg totais coletados`
            : "Nenhum dado disponível"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {chartData.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
            Nenhuma coleta registrada ainda.
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    nameKey="material"
                    formatter={(value) => [`${Number(value).toFixed(2)} kg`]}
                  />
                }
              />
              <Pie data={chartData} dataKey="weightKg" nameKey="material" />
              <ChartLegend
                content={<ChartLegendContent nameKey="material" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
