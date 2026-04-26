import { ChartLine, History, MapPin, SquareTerminal } from "lucide-react";

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
			isActive: true,
		},
		{
			title: "Histórico",
			url: "/admin/history",
			icon: History,
			isActive: true,
		},
		{
			title: "Estatísticas",
			url: "/admin/statistics",
			icon: ChartLine,
			isActive: true,
		},
	],
};
