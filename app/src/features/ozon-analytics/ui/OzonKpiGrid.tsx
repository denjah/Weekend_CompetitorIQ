'use client';

import React from 'react';
import styles from '@/styles/ozon.module.css';
import { OzonKpiCard } from './OzonKpiCard';
import {
  IconDollarSign,
  IconShoppingBag,
  IconActivity,
  IconTrendingUp,
  IconStar,
  IconPackage,
} from '@/components/icons';
import { OzonAnalyticsData } from '../model/types';
import { formatCurrency, formatPercent, formatNumber, formatVelocity } from '../lib/formatters';

interface OzonKpiGridProps {
  kpi: OzonAnalyticsData['kpi'];
}

export function OzonKpiGrid({ kpi }: OzonKpiGridProps) {
  const kpis = [
    {
      icon: <IconDollarSign size={16} />,
      label: 'Выручка рынка',
      value: formatCurrency(kpi.totalRevenue),
      delta: `${kpi.totalBrands} брендов`,
      deltaDirection: 'stable' as const,
    },
    {
      icon: <IconShoppingBag size={16} />,
      label: 'Заказов',
      value: formatNumber(kpi.totalOrdered),
      delta: `${kpi.totalSKUs} SKU`,
      deltaDirection: 'stable' as const,
    },
    {
      icon: <IconActivity size={16} />,
      label: 'Средний выкуп',
      value: formatPercent(kpi.avgBuyout),
      delta: kpi.avgBuyout >= 70 ? 'Здоровый рынок' : 'Ниже нормы',
      deltaDirection: kpi.avgBuyout >= 70 ? ('up' as const) : ('down' as const),
    },
    {
      icon: <IconDollarSign size={16} />,
      label: 'Средний чек',
      value: formatCurrency(kpi.asp),
      deltaDirection: 'stable' as const,
    },
    {
      icon: <IconTrendingUp size={16} />,
      label: 'Velocity',
      value: formatVelocity(kpi.avgVelocity),
      delta: 'шт/день',
      deltaDirection: 'stable' as const,
    },
    {
      icon: <IconStar size={14} />,
      label: 'Средний рейтинг',
      value: kpi.avgRating.toFixed(1),
      delta: kpi.avgRating >= 4.5 ? 'Отлично' : kpi.avgRating >= 4.0 ? 'Хорошо' : 'Ниже 4.0',
      deltaDirection: kpi.avgRating >= 4.5 ? ('up' as const) : kpi.avgRating >= 4.0 ? ('stable' as const) : ('down' as const),
    },
  ];

  return (
    <div className={styles.kpiRow} id="ozon-kpi-row">
      {kpis.map((kpi, i) => (
        <OzonKpiCard
          key={i}
          icon={kpi.icon}
          label={kpi.label}
          value={kpi.value}
          delta={kpi.delta}
          deltaDirection={kpi.deltaDirection}
        />
      ))}
    </div>
  );
}

export default OzonKpiGrid;
