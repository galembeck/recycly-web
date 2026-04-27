export interface DashboardChartPoint {
  date: string;
  collects: number;
  sales: number;
}

export interface DashboardStats {
  totalSalesRevenue: number;
  totalCollectsCount: number;
  totalSalesProfit: number;
  chartData: DashboardChartPoint[];
  metalKg: number;
  plasticKg: number;
  glassKg: number;
}
