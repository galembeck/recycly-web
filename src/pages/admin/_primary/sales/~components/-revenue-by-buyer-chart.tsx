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
import type { Sale } from "@/types/sale";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  revenue: {
    label: "Receita (R$)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface Props {
  sales: Sale[];
}

export function RevenueByBuyerChart({ sales }: Props) {
  const chartData = useMemo(() => {
    const map = new Map<string, { buyer: string; revenue: number }>();

    for (const s of sales) {
      const existing = map.get(s.buyerName);
      if (existing) {
        existing.revenue += Number(s.price);
      } else {
        map.set(s.buyerName, { buyer: s.buyerName, revenue: Number(s.price) });
      }
    }

    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue);
  }, [sales]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receita por comprador</CardTitle>
        <CardDescription>
          Total acumulado de receita agrupado por comprador.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-62.5 items-center justify-center text-muted-foreground text-sm">
            Nenhuma venda registrada ainda.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-62.5 w-full">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 8, right: 16 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(v) => `R$ ${v}`}
              />
              <YAxis
                type="category"
                dataKey="buyer"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={110}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`R$ ${Number(value).toFixed(2)}`]}
                    nameKey="buyer"
                  />
                }
              />
              <Bar
                dataKey="revenue"
                fill="var(--color-revenue)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
