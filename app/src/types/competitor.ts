import { MetricTrend } from './analysis';

/**
 * Описание метрик конкурента для каждого вида анализа
 */
export interface FinancialMetrics {
  revenue: number; // Выручка
  marketShare: number; // Доля рынка (%)
  averageCheck: number; // Средний чек
  revenueTrend: MetricTrend;
}

export interface MarketingMetrics {
  traffic: number; // Посещаемость
  conversionRate: number; // Конверсия
  adSpendEstimate: number; // Оценка бюджета на рекламу
  trafficTrend: MetricTrend;
}

export interface ActivityMetrics {
  socialMentions: number; // Упоминания в соцсетях
  newInitiativesCount: number; // Новые акции/инициативы
  customerReviewsScore: number; // Средняя оценка по отзывам (из 5)
  activityTrend: MetricTrend;
}

export interface DynamicsMetrics {
  growthRate: number; // Темп роста (%)
  marketPenetrationVelocity: number; // Скорость проникновения на рынок
  dynamicsTrend: MetricTrend;
}

export interface AssortmentMetrics {
  totalSKU: number; // Количество товарных позиций
  newProductsLastMonth: number; // Новинки
  priceIndex: number; // Индекс цен (относительно рынка, 100 = среднее)
  assortmentTrend: MetricTrend;
}

export interface CompetitorData {
  id: string;
  name: string;
  isMainBrand: boolean; // true для 'Weekend Billiard'
  color: string; // Цвет узла/графиков конкурента
  
  // Метрики по 5 видам анализа
  financial: FinancialMetrics;
  marketing: MarketingMetrics;
  activity: ActivityMetrics;
  dynamics: DynamicsMetrics;
  assortment: AssortmentMetrics;
}
