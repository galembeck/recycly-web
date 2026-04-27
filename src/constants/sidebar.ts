import {
  Banknote,
  ChartLine,
  History,
  MapPin,
  SquareTerminal,
} from "lucide-react";

export const dashboardData = {
  primary: [
    {
      title: "Visão Geral",
      url: "/admin/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Pontos de Coleta",
      url: "/admin/collection-points",
      icon: MapPin,
    },
    {
      title: "Histórico de reciclagem",
      url: "/admin/history",
      icon: History,
    },
    {
      title: "Vendas",
      url: "/admin/sales",
      icon: Banknote,
    },
    {
      title: "Estatísticas",
      url: "/admin/statistics",
      icon: ChartLine,
    },
  ],
};
