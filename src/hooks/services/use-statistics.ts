import { statisticsService } from "@/services/statistics";
import { useQuery } from "@tanstack/react-query";

export function useStatistics() {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: statisticsService.getStats,
  });
}
