import { useDashboardStats } from "@/hooks/services/use-dashboard";
import { ArrowRightLeft, Leaf, PiggyBank, RefreshCcw, Upload } from "lucide-react";
import { TransactionsOverviewCard } from "./-transaction-overview-card";

export function TransactionsOverview() {
  const { data: stats } = useDashboardStats();

  const profit = stats
    ? new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2 }).format(
        stats.totalSalesProfit,
      )
    : "—";

  const totalRecycledKg = stats
    ? stats.metalKg + stats.plasticKg + stats.glassKg
    : null;

  const recycledLabel = totalRecycledKg !== null
    ? `${totalRecycledKg.toFixed(2)} kg`
    : "—";

  const greenImpact = (() => {
    if (!stats?.chartData?.length) return null;
    const data = stats.chartData;
    const recent = data.slice(-30).reduce((s, d) => s + d.collects, 0);
    const previous = data.slice(-60, -30).reduce((s, d) => s + d.collects, 0);
    if (previous === 0) return recent > 0 ? { pct: 100, type: "increase" as const } : null;
    const pct = Math.round(Math.abs(((recent - previous) / previous) * 100));
    return { pct, type: recent >= previous ? ("increase" as const) : ("decrease" as const) };
  })();

  return (
    <article className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <TransactionsOverviewCard
        badge={Upload}
        description="Lucro total (c/ vendas)"
        icon={PiggyBank}
        title={profit}
        type="currency"
      />

      <TransactionsOverviewCard
        badge={RefreshCcw}
        description="Coleta(s) realizada(s)"
        icon={ArrowRightLeft}
        title={stats?.totalCollectsCount ?? "—"}
        type="number"
      />

      <TransactionsOverviewCard
        badge={Leaf}
        description="Total reciclado — impacto verde vs. mês anterior"
        icon={Leaf}
        title={recycledLabel}
        type="number"
        rate={
          greenImpact
            ? { percentage: `${greenImpact.pct}%`, type: greenImpact.type }
            : undefined
        }
      />
    </article>
  );
}
