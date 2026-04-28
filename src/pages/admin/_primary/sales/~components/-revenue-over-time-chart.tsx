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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  revenue: {
    label: "Receita (R$)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface Props {
  sales: Sale[];
}

export function RevenueOverTimeChart({ sales }: Props) {
  const { chartData, total } = useMemo(() => {
    const map = new Map<string, { month: string; revenue: number }>();

    for (const s of sales) {
      const month = format(new Date(s.soldAt), "MMM/yy", { locale: ptBR });
      const existing = map.get(month);
      if (existing) {
        existing.revenue += Number(s.price);
      } else {
        map.set(month, { month, revenue: Number(s.price) });
      }
    }

    const data = Array.from(map.values());
    const sum = data.reduce((acc, d) => acc + d.revenue, 0);
    return { chartData: data, total: sum };
  }, [sales]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-6">
          <CardTitle>Receita ao longo do tempo</CardTitle>
          <CardDescription>Receita total agrupada por mês.</CardDescription>
        </div>
        <div className="flex border-t sm:border-t-0 sm:border-l">
          <div className="flex flex-col justify-center gap-1 px-6 py-4 sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">Total</span>
            <span className="font-bold text-lg leading-none sm:text-3xl">
              R$ {total.toFixed(2)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        {chartData.length === 0 ? (
          <div className="flex h-62.5 items-center justify-center text-muted-foreground text-sm">
            Nenhuma venda registrada ainda.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-62.5 w-full">
            <BarChart data={chartData} margin={{ left: 8, right: 8 }}>
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
                tickFormatter={(v) => `R$ ${v}`}
                width={72}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`R$ ${Number(value).toFixed(2)}`]}
                    nameKey="month"
                  />
                }
              />
              <Bar
                dataKey="revenue"
                fill="var(--color-revenue)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
