import { API } from "@/api/api";
import type { DashboardStats } from "@/types/dashboard";

export const dashboardService = {
  getStats: () => API.get<DashboardStats>("/dashboard/stats"),
};
