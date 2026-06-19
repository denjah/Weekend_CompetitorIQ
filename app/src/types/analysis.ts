/**
 * Перечисления и типы для 5 видов конкурентного анализа.
 */

export enum AnalysisMode {
  FINANCIAL = 'FINANCIAL',
  MARKETING = 'MARKETING',
  ACTIVITY = 'ACTIVITY',
  DYNAMICS = 'DYNAMICS',
  ASSORTMENT = 'ASSORTMENT',
  OVERVIEW = 'OVERVIEW', // Сводный режим для главного экрана
}

export interface MetricTrend {
  value: number;
  direction: 'up' | 'down' | 'flat';
  percentage: number; // e.g., 12.5 means +12.5%
}

export type TimePeriod = '1M' | '3M' | '6M' | '1Y' | 'ALL';
