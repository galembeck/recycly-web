import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
import type { WeeklyActivityPoint } from "@/types/statistics";

const chartConfig = {
  collects: {
    label: "Coletas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface Props {
  data: WeeklyActivityPoint[];
}

export function WeeklyActivityChart({ data }: Props) {
  const total = React.useMemo(() => data.reduce((s, d) => s + d.collects, 0), [data]);

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-6">
          <CardTitle>Atividade Semanal</CardTitle>
          <CardDescription>Coletas por dia da semana (total histórico)</CardDescription>
        </div>
        <div className="flex border-t sm:border-t-0 sm:border-l">
          <div className="flex flex-col justify-center gap-1 px-6 py-4 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {total}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[140px]"
                  nameKey="collects"
                  labelFormatter={(v) => v}
                />
              }
            />
            <Bar dataKey="collects" fill="var(--color-collects)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
