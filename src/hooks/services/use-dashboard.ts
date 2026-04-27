import { dashboardService } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => dashboardService.getStats(),
  });
}
