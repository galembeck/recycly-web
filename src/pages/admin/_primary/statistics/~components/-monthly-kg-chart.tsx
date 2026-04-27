import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
import type { MonthlyKgPoint } from "@/types/statistics";

const chartConfig = {
  weightKg: {
    label: "kg coletados",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface Props {
  data: MonthlyKgPoint[];
}

export function MonthlyKgChart({ data }: Props) {
  const total = React.useMemo(
    () => data.reduce((acc, d) => acc + d.weightKg, 0),
    [data],
  );

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-6">
          <CardTitle>Evolução Mensal (kg)</CardTitle>
          <CardDescription>Total coletado nos últimos 6 meses</CardDescription>
        </div>
        <div className="flex border-t sm:border-t-0 sm:border-l">
          <div className="flex flex-col justify-center gap-1 px-6 py-4 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {total.toFixed(2)} kg
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart data={data} margin={{ left: 12, right: 12 }}>
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
              tickFormatter={(v) => `${v} kg`}
              width={60}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[160px]"
                  nameKey="weightKg"
                  labelFormatter={(v) => v}
                />
              }
            />
            <Line
              dataKey="weightKg"
              type="monotone"
              stroke="var(--color-weightKg)"
              strokeWidth={2}
              dot={{ r: 4, fill: "var(--color-weightKg)" }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
