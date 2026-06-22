'use client';

import { useMemo, useState } from 'react';
import { generateInsights } from '../lib/insight-rules';
import { useOzonFilters } from './useOzonFilters';
import {
  AggregatedProduct,
  Brand,
  InsightItem,
  Snapshot,
  SizeMatrixRow,
  OzonAnalyticsData
} from '../model/types';
import { realOzonData } from '../model/real-data-dashboard';

import { useEffect } from 'react';

export function useOzonAnalytics(): OzonAnalyticsData {
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [reviewsData, setReviewsData] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    fetch('/api/ozon/reviews')
      .then(res => res.json())
      .then(data => {
        if (data && data.products) {
          setReviewsData(data.products);
        }
      })
      .catch(err => console.error('Failed to load reviews data:', err));
  }, []);

  const {
    selectedBrandIds,
    selectedSizes,
    selectedSchemes,
    hasVideoOnly,
    minRating,
    minContentScore,
    searchQuery,
    sortField,
    sortDirection,
    metricMode,
  } = useOzonFilters();

  // ── Строим плоский список AggregatedProduct из реальных данных ──
  const allProducts: AggregatedProduct[] = useMemo(() => {
    const baseProducts = realOzonData.products ?? [];
    
    // Подменяем заглушки на реально скачанные картинки
    return baseProducts.map(p => {
      // Ищем спарсенные данные по ID товара
      const scraped = reviewsData.find(rd => rd.productId === p.id);
      if (scraped && scraped.mainImages && scraped.mainImages.length > 0) {
        return {
          ...p,
          mainImage: scraped.mainImages[0], // Берем первую Hires-картинку
          imageUrls: scraped.mainImages
        };
      }
      return p;
    });
  }, [reviewsData]);

  // ── Фильтрация ─────────────────────────────────────────────────────────────
  const filteredProducts = useMemo<AggregatedProduct[]>(() => {
    let result = allProducts;

    if (selectedBrandIds.length > 0) {
      result = result.filter((p) => selectedBrandIds.includes(p.brandId));
    }
    if (selectedSizes.length > 0) {
      result = result.filter((p) => selectedSizes.includes(p.sizeFt));
    }
    if (selectedSchemes.length > 0) {
      result = result.filter((p) => selectedSchemes.includes(p.workScheme));
    }
    if (hasVideoOnly) {
      result = result.filter((p) => p.hasVideo);
    }
    if (minRating !== null) {
      result = result.filter((p) => p.rating >= minRating);
    }
    if (minContentScore !== null) {
      result = result.filter((p) => p.contentScore >= minContentScore);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brandName.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    // Сортировка
    result = [...result].sort((a, b) => {
      const dir = sortDirection === 'asc' ? 1 : -1;
      switch (sortField) {
        case 'revenue':       return dir * (a.revenue - b.revenue);
        case 'ordered':       return dir * (a.ordered - b.ordered);
        case 'buyoutPercent': return dir * (a.buyoutPercent - b.buyoutPercent);
        case 'rating':        return dir * (a.rating - b.rating);
        case 'reviews':       return dir * (a.reviews - b.reviews);
        case 'contentScore':  return dir * (a.contentScore - b.contentScore);
        case 'velocity':      return dir * (a.velocity - b.velocity);
        case 'price':         return dir * (a.price - b.price);
        case 'asp':           return dir * (a.asp - b.asp);
        default:              return 0;
      }
    });

    return result;
  }, [
    allProducts,
    selectedBrandIds,
    selectedSizes,
    selectedSchemes,
    hasVideoOnly,
    minRating,
    minContentScore,
    searchQuery,
    sortField,
    sortDirection,
  ]);

  // ── Матрица размеров ───────────────────────────────────────────────────────
  const matrixRows = useMemo<SizeMatrixRow[]>(() => {
    return realOzonData.matrixRows ?? [];
  }, [metricMode]); 

  // ── Инсайты ───────────────────────────────────────────────────────────────
  const insights = useMemo<InsightItem[]>(() => {
    if (!allProducts.length || !matrixRows.length) return [];
    return generateInsights(allProducts, matrixRows, realOzonData.kpi?.avgBuyout ?? 95);
  }, [allProducts, matrixRows]);

  return {
    isLoading,
    error,
    brands: realOzonData.brands ?? [],
    snapshot: null,
    products: filteredProducts,
    matrixRows,
    insights,
    kpi: realOzonData.kpi ?? {
      totalRevenue: 0,
      totalOrdered: 0,
      avgBuyout: 95,
      asp: 0,
      avgVelocity: 0,
      avgRating: 0,
      totalBrands: 0,
      totalSKUs: 0
    },
    availableSizes: realOzonData.availableSizes ?? [],
    reviewsData: reviewsData,
  };
}

