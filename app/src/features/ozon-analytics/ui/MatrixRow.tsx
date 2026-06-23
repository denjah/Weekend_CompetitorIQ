'use client';

import React from 'react';
import styles from '@/styles/sales-matrix.module.css';
import { FEET_COLUMNS, MatrixRowData, MatrixCellData } from '../model/useExportedMatrix';
import { useMatrixDrilldown } from '../model/useMatrixDrilldown';
import { useGlobalFilters } from '../model/useGlobalFilters';
import { MatrixDrilldownLevel3 } from './MatrixDrilldownLevel3';

interface Props {
  row: MatrixRowData;
  isLevel2?: boolean;
  maxRevenue: number;
  maxSales: number;
}

export function MatrixRow({ row, isLevel2 = false, maxRevenue, maxSales }: Props) {
  const { expandedRows, expandedCells, toggleRow, toggleCell } = useMatrixDrilldown();
  const { metricMode } = useGlobalFilters();

  const isExpanded = expandedRows.has(row.id);

  const renderCellValue = (cell: MatrixCellData) => {
    switch (metricMode) {
      case 'revenue': return `${cell.revenue.toLocaleString('ru-RU')} ₽`;
      case 'units': return `${cell.sales} шт`;
      case 'asp': return `${Math.round(cell.price).toLocaleString('ru-RU')} ₽`;
      case 'buyoutPercent': return `${Math.round(cell.buyoutPercent)}%`;
      case 'sharePercent': return '-'; // Need extra logic for share
      case 'funnel': return (
        <div className={styles.funnelGrid}>
          <div className={styles.funnelMetric}>
            <span className={styles.funnelLabel}>Показы</span>
            <span className={styles.funnelValue}>{cell.funnel.impressions.toLocaleString('ru-RU')}</span>
          </div>
          <div className={styles.funnelMetric}>
            <span className={styles.funnelLabel}>Просмотры</span>
            <span className={styles.funnelValue}>{cell.funnel.cardViews.toLocaleString('ru-RU')}</span>
          </div>
          <div className={styles.funnelMetric}>
            <span className={styles.funnelLabel}>CTR</span>
            <span className={styles.funnelValue}>{cell.funnel.ctr.toFixed(1)}%</span>
          </div>
          <div className={styles.funnelMetric}>
            <span className={styles.funnelLabel}>В корзину</span>
            <span className={styles.funnelValue}>{cell.funnel.addToCartPercent.toFixed(1)}%</span>
          </div>
          <div className={styles.funnelMetric}>
            <span className={styles.funnelLabel}>ДРР</span>
            <span className={styles.funnelValue}>{cell.funnel.drr.toFixed(1)}%</span>
          </div>
        </div>
      );
      default: return '-';
    }
  };

  const getHeatmapColor = (cell: MatrixCellData) => {
    if (metricMode === 'funnel' || cell.products.length === 0) return 'transparent';
    let intensity = 0;
    if (metricMode === 'revenue' && maxRevenue > 0) {
      intensity = cell.revenue / maxRevenue;
    } else if (metricMode === 'units' && maxSales > 0) {
      intensity = cell.sales / maxSales;
    }
    // Deep blue/cyan heatmap
    if (intensity === 0) return 'transparent';
    return `rgba(56, 189, 248, ${Math.max(0.05, intensity * 0.5)})`;
  };

  return (
    <>
      <tr className={`${styles.row} ${isLevel2 ? styles.drilldownRowLevel2 : ''}`}>
        <td className={styles.cell}>
          <div className={styles.rowLabel}>
            {!isLevel2 && row.children.length > 0 && (
              <button 
                className={`${styles.expander} ${isExpanded ? styles.expanded : ''}`}
                onClick={() => toggleRow(row.id)}
              >
                ▶
              </button>
            )}
            {isLevel2 && <div style={{ width: 24, marginRight: 12 }} />}
            {row.name}
          </div>
        </td>
        
        {FEET_COLUMNS.map(ft => {
          const cell = row.cells[ft];
          const hasProducts = cell && cell.products.length > 0;
          const cellId = `${row.id}-${ft}`;
          const isCellExpanded = expandedCells.has(cellId);

          return (
            <td key={ft} className={styles.cell}>
              {hasProducts ? (
                <div 
                  className={styles.heatmapCell} 
                  style={{ background: getHeatmapColor(cell) }}
                  onClick={() => isLevel2 && toggleCell(row.id, ft)}
                >
                  {renderCellValue(cell)}
                </div>
              ) : (
                <div style={{ color: 'rgba(255,255,255,0.2)' }}>-</div>
              )}
            </td>
          );
        })}
      </tr>

      {/* Render L2 Children */}
      {isExpanded && !isLevel2 && row.children.map(child => (
        <React.Fragment key={child.id}>
          <MatrixRow 
            row={child} 
            isLevel2={true} 
            maxRevenue={maxRevenue} 
            maxSales={maxSales} 
          />
          {/* Render L3 specific to this L2 child if its cells are expanded */}
          {FEET_COLUMNS.map(ft => {
            const cellId = `${child.id}-${ft}`;
            if (expandedCells.has(cellId) && child.cells[ft].products.length > 0) {
              return (
                <tr key={`l3-${cellId}`} className={styles.drilldownRowLevel3}>
                  <td colSpan={FEET_COLUMNS.length + 1} className={styles.cell}>
                    <MatrixDrilldownLevel3 products={child.cells[ft].products} />
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </React.Fragment>
      ))}
    </>
  );
}
