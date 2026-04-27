import { API } from "@/api/api";
import type { StatisticsData } from "@/types/statistics";

export const statisticsService = {
  getStats: () => API.get<StatisticsData>("/statistics/stats"),
};
