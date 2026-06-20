'use client';

import React from 'react';
import styles from '@/styles/ozon.module.css';
import { useOzonFilters } from '../hooks/useOzonFilters';

const METRIC_OPTIONS = [
  { value: 'revenue', label: 'Выручка' },
  { value: 'units', label: 'Штуки' },
  { value: 'sharePercent', label: 'Доля (%)' },
  { value: 'velocity', label: 'Velocity' },
  { value: 'asp', label: 'Средний чек' },
  { value: 'buyoutPercent', label: 'Выкуп (%)' },
] as const;

export function MetricModeSwitch() {
  const { metricMode, setMetricMode } = useOzonFilters();

  return (
    <div className={styles.metricSwitcher}>
      {METRIC_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`${styles.metricOption} ${metricMode === option.value ? styles.active : ''}`}
          onClick={() => setMetricMode(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default MetricModeSwitch;
