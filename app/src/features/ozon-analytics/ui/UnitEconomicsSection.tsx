import React from 'react';
import styles from '@/styles/ozon.module.css';
import { UnitEconomics } from '../model/types';
import { realUnitEconomics } from '../model/real-data';
import { IconPackage, IconTarget, IconChartBar } from '@/components/icons';

export function UnitEconomicsSection() {
  const data = realUnitEconomics as UnitEconomics[];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className={styles.insightsHeader}>
        <div>
          <h3>Юнит-Экономика (Ozon)</h3>
          <p style={{ opacity: 0.7, fontSize: '13px', marginTop: '4px' }}>
            Анализ маржинальности по схемам FBO, FBS, rFBS. Расчеты из таблицы Калькулятора.
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto', paddingBottom: '16px' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th rowSpan={2}>SKU / Название</th>
              <th rowSpan={2} style={{ textAlign: 'right' }}>Цена для пок.</th>
              <th rowSpan={2} style={{ textAlign: 'right' }}>Себест.</th>
              
              <th colSpan={3} style={{ textAlign: 'center', background: 'rgba(168, 85, 247, 0.1)', color: '#A855F7' }}>FBO</th>
              <th colSpan={3} style={{ textAlign: 'center', background: 'rgba(6, 182, 212, 0.1)', color: '#06B6D4' }}>FBS</th>
              <th colSpan={3} style={{ textAlign: 'center', background: 'rgba(249, 115, 22, 0.1)', color: '#F97316' }}>rFBS</th>
            </tr>
            <tr>
              <th style={{ textAlign: 'right', background: 'rgba(168, 85, 247, 0.05)' }}>Комиссия</th>
              <th style={{ textAlign: 'right', background: 'rgba(168, 85, 247, 0.05)' }}>Лог-ка</th>
              <th style={{ textAlign: 'right', background: 'rgba(168, 85, 247, 0.05)' }}>Наценка</th>
              
              <th style={{ textAlign: 'right', background: 'rgba(6, 182, 212, 0.05)' }}>Комиссия</th>
              <th style={{ textAlign: 'right', background: 'rgba(6, 182, 212, 0.05)' }}>Лог-ка</th>
              <th style={{ textAlign: 'right', background: 'rgba(6, 182, 212, 0.05)' }}>Наценка</th>
              
              <th style={{ textAlign: 'right', background: 'rgba(249, 115, 22, 0.05)' }}>Комиссия</th>
              <th style={{ textAlign: 'right', background: 'rgba(249, 115, 22, 0.05)' }}>Лог-ка</th>
              <th style={{ textAlign: 'right', background: 'rgba(249, 115, 22, 0.05)' }}>Наценка</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.sku} className={styles.tableRow}>
                <td>
                  <div style={{ fontWeight: 500 }}>{item.title}</div>
                  <div style={{ fontSize: '11px', opacity: 0.6 }}>{item.sku}</div>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 600 }}>{item.priceForBuyer.toLocaleString('ru')} ₽</td>
                <td style={{ textAlign: 'right', opacity: 0.8 }}>{item.costPrice.toLocaleString('ru')} ₽</td>
                
                {/* FBO */}
                <td style={{ textAlign: 'right', background: 'rgba(168, 85, 247, 0.02)' }}>{item.fbo.commission.toLocaleString('ru')} ₽</td>
                <td style={{ textAlign: 'right', background: 'rgba(168, 85, 247, 0.02)' }}>{item.fbo.logistics.toLocaleString('ru')} ₽</td>
                <td style={{ textAlign: 'right', background: 'rgba(168, 85, 247, 0.02)', color: item.fbo.margin > 0 ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                  {item.fbo.margin > 0 ? '+' : ''}{(item.fbo.margin * 100).toFixed(1)}%
                </td>
                
                {/* FBS */}
                <td style={{ textAlign: 'right', background: 'rgba(6, 182, 212, 0.02)' }}>{item.fbs.commission.toLocaleString('ru')} ₽</td>
                <td style={{ textAlign: 'right', background: 'rgba(6, 182, 212, 0.02)' }}>{item.fbs.logistics.toLocaleString('ru')} ₽</td>
                <td style={{ textAlign: 'right', background: 'rgba(6, 182, 212, 0.02)', color: item.fbs.margin > 0 ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                  {item.fbs.margin > 0 ? '+' : ''}{(item.fbs.margin * 100).toFixed(1)}%
                </td>
                
                {/* rFBS */}
                <td style={{ textAlign: 'right', background: 'rgba(249, 115, 22, 0.02)' }}>{item.rfbs.commission.toLocaleString('ru')} ₽</td>
                <td style={{ textAlign: 'right', background: 'rgba(249, 115, 22, 0.02)' }}>{item.rfbs.logistics.toLocaleString('ru')} ₽</td>
                <td style={{ textAlign: 'right', background: 'rgba(249, 115, 22, 0.02)', color: item.rfbs.margin > 0 ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                  {item.rfbs.margin > 0 ? '+' : ''}{(item.rfbs.margin * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
