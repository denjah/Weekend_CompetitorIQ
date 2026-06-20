import React from 'react';
import styles from '@/styles/ozon.module.css';
import { AggregatedProduct, Brand } from '../model/types';
import { formatCurrency, formatNumber } from '../lib/formatters';
import { Brand3DPointCloud } from './Brand3DPointCloud';

interface Props {
  brands: Brand[];
  products: AggregatedProduct[];
}

export function OzonOverviewSection({ brands, products }: Props) {
  // Вычисляем топ брендов по выручке
  const brandStats = brands.map(brand => {
    const brandProducts = products.filter(p => p.brandId === brand.id);
    const rev = brandProducts.reduce((sum, p) => sum + p.revenue, 0);
    return { ...brand, revenue: rev, count: brandProducts.length };
  }).sort((a, b) => b.revenue - a.revenue);

  const topProducts = [...products].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
      <div className={styles.sectionCard} style={{ padding: '24px', background: 'var(--surface)', overflow: 'hidden' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Топ Брендов по Выручке</h3>
        <Brand3DPointCloud data={brandStats} />
      </div>

      <div className={styles.sectionCard} style={{ padding: '24px', background: 'var(--surface)' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Топ 5 Товаров</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {topProducts.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                {p.mainImage && (
                  <a href={p.mainImage} target="_blank" rel="noreferrer" style={{ flexShrink: 0, display: 'block' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={p.mainImage} 
                      alt="" 
                      style={{ 
                        width: 48, 
                        height: 64, 
                        borderRadius: '4px', 
                        objectFit: 'contain', 
                        backgroundColor: 'var(--bg-primary)',
                        cursor: 'pointer' 
                      }} 
                     onError={(e) => { e.currentTarget.src = "https://placehold.co/300x400/1E293B/FFFFFF?text=No+Photo" }} />
                  </a>
                )}
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{p.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <span>{p.brandName}</span>
                    <span>·</span>
                    <span>{p.sizeFt}ft</span>
                    <span>·</span>
                    <a 
                      href={p.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={{ color: '#005BFF', textDecoration: 'none' }}
                      onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      На Ozon ↗
                    </a>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600 }}>{formatCurrency(p.revenue)}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Оборот</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
