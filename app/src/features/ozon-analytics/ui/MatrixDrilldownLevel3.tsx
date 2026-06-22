'use client';

import React from 'react';
import styles from '@/styles/sales-matrix.module.css';
import { ExportedProduct } from '../model/types';

interface Props {
  products: ExportedProduct[];
}

export function MatrixDrilldownLevel3({ products }: Props) {
  if (!products || products.length === 0) return null;

  return (
    <div className={styles.productCardsContainer}>
      {products.map((p) => (
        <a 
          key={p.id} 
          href={p.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.productCard}
        >
          <div className={styles.productTitle} title={p.name}>
            {p.name}
          </div>
          <div className={styles.productMeta}>
            <span className={styles.productBadge}>ID: {p.id}</span>
            <span className={styles.productBadge}>Размер: {p.exactSize || p.sizeText}</span>
          </div>
          <div className={styles.productMeta} style={{ marginTop: '4px' }}>
            <span>Цена: {p.price.toLocaleString('ru-RU')} ₽</span>
            <span>Выручка: {p.revenue.toLocaleString('ru-RU')} ₽</span>
          </div>
        </a>
      ))}
    </div>
  );
}
