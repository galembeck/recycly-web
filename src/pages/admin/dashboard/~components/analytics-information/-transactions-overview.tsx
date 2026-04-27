import {
  ArrowRightLeft,
  BanknoteArrowUp,
  PiggyBank,
  RefreshCcw,
  ShoppingBag,
  TicketCheck,
  Upload,
} from "lucide-react";
import { TransactionsOverviewCard } from "./-transaction-overview-card";

export function TransactionsOverview() {
  return (
    <article className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <TransactionsOverviewCard
        badge={TicketCheck}
        description="Total recebido em cooperativas"
        icon={BanknoteArrowUp}
        rate={{ percentage: "10%", type: "increase" }}
        title="1250,00"
        type="currency"
      />

      <TransactionsOverviewCard
        badge={RefreshCcw}
        description="Coleta(s) realizada(s)"
        icon={ArrowRightLeft}
        rate={{ percentage: "5%", type: "decrease" }}
        title="72"
        type="number"
      />

      <TransactionsOverviewCard
        badge={Upload}
        description="Lucro total (c/ vendas)"
        icon={PiggyBank}
        rate={{ percentage: "8%", type: "increase" }}
        title="1000,00"
        type="currency"
      />
    </article>
  );
}
