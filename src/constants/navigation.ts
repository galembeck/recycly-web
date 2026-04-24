import type { LucideIcon } from "lucide-react";
import { dashboardData } from "./sidebar";

export interface NavigationItem {
	id: string;
	title: string;
	url: string;
	description: string;
	group: string;
	icon?: LucideIcon;
	keywords: string[];
}

export const searchNavigationItems: NavigationItem[] = [
	{
		id: "dashboard-overview",
		title: "Visão Geral",
		url: "/admin/dashboard",
		description: "Visão geral (overview) do dashboard",
		group: "Principal",
		icon: dashboardData.primary.find((item) => item.title === "Visão Geral")
			?.icon,
		keywords: ["inicio", "home", "overview", "dashboard"],
	},

	{
		id: "collection-points",
		title: "Pontos de Coleta",
		url: "/admin/collection-points",
		description:
			"Gestão de pontos de coleta já cadastrados e/ou cadastro de novos pontos",
		group: "Principal",
		icon: dashboardData.primary.find(
			(item) => item.title === "Pontos de Coleta"
		)?.icon,
		keywords: ["inicio", "home", "overview", "dashboard"],
	},
	{
		id: "history",
		title: "Histórico",
		url: "/admin/history",
		description:
			"Visão geral do histórico das atividades de reciclagem de sua cooperativa",
		group: "Principal",
		icon: dashboardData.primary.find((item) => item.title === "Histórico")
			?.icon,
		keywords: ["inicio", "home", "overview", "history"],
	},
	{
		id: "statistics",
		title: "Estatísticas",
		url: "/admin/statistics",
		description:
			"Visão geral das estatísticas de reciclagem de sua cooperativa",
		group: "Principal",
		icon: dashboardData.primary.find((item) => item.title === "Estatísticas")
			?.icon,
		keywords: ["inicio", "home", "overview", "statistics"],
	},

	{
		id: "profile",
		title: "Perfil",
		url: "/app/profile",
		description: "Gerenciar informações do perfil",
		group: "Conta",
		keywords: ["perfil", "usuario", "conta", "configuracoes pessoais", "dados"],
	},
	{
		id: "settings",
		title: "Configurações",
		url: "/app/settings",
		description: "Configurações do sistema",
		group: "Sistema",
		keywords: [
			"configuracoes",
			"settings",
			"opcoes",
			"preferencias",
			"sistema",
		],
	},
];

export const getAllNavigationItems = (): NavigationItem[] => {
	return [...searchNavigationItems];
};

export const groupNavigationItems = (items: NavigationItem[]) => {
	return items.reduce(
		(acc, item) => {
			const group = item.group;
			if (!acc[group]) {
				acc[group] = [];
			}
			acc[group].push(item);
			return acc;
		},
		{} as Record<string, NavigationItem[]>
	);
};
