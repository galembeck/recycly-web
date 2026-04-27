export interface MonthlyKgPoint {
  month: string;
  weightKg: number;
}

export interface MaterialKgPoint {
  material: string;
  weightKg: number;
}

export interface WeeklyActivityPoint {
  day: string;
  collects: number;
}

export interface AchievementPoint {
  title: string;
  description: string;
  unlocked: boolean;
}

export interface StatisticsData {
  monthlyKg: MonthlyKgPoint[];
  materialDistribution: MaterialKgPoint[];
  weeklyActivity: WeeklyActivityPoint[];
  achievements: AchievementPoint[];
}
