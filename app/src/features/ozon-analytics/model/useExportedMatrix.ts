import { useMemo } from 'react';
import productsData from '../../../data/ozon/products-export.json';
import { ExportedProduct, FunnelMetrics } from './types';
import { useGlobalFilters } from './useGlobalFilters';

export const FEET_COLUMNS = ['-3ft', '3ft', '4ft', '5ft', '6ft', '7ft'];

export interface MatrixCellData {
  revenue: number;
  sales: number;
  price: number; // avg price
  buyoutPercent: number; // avg buyout
  funnel: FunnelMetrics;
  products: ExportedProduct[];
}

export interface MatrixRowData {
  id: string; // seller or brand name
  name: string;
  cells: Record<string, MatrixCellData>;
  totalRevenue: number;
  totalSales: number;
  children: MatrixRowData[]; // L2 rows
}

function createEmptyCell(): MatrixCellData {
  return {
    revenue: 0,
    sales: 0,
    price: 0,
    buyoutPercent: 0,
    funnel: { impressions: 0, cardViews: 0, ctr: 0, addToCartPercent: 0, drr: 0 },
    products: []
  };
}

function aggregateCells(products: ExportedProduct[]): Record<string, MatrixCellData> {
  const cells: Record<string, MatrixCellData> = {};
  FEET_COLUMNS.forEach(ft => cells[ft] = createEmptyCell());

  products.forEach(p => {
    const ft = p.feetCategory || 'Unknown';
    if (!cells[ft]) cells[ft] = createEmptyCell();
    
    const cell = cells[ft];
    cell.revenue += p.revenue;
    cell.sales += p.sales;
    cell.products.push(p);
    
    cell.funnel.impressions += p.funnel.impressions;
    cell.funnel.cardViews += p.funnel.cardViews;
  });

  // Calculate averages
  Object.values(cells).forEach(cell => {
    if (cell.products.length > 0) {
      cell.price = cell.revenue / (cell.sales || 1); // rough avg
      cell.buyoutPercent = cell.products.reduce((acc, p) => acc + p.buyoutPercent, 0) / cell.products.length;
      if (cell.funnel.impressions > 0) {
        cell.funnel.ctr = (cell.funnel.cardViews / cell.funnel.impressions) * 100;
      }
      cell.funnel.addToCartPercent = cell.products.reduce((acc, p) => acc + p.funnel.addToCartPercent, 0) / cell.products.length;
      cell.funnel.drr = cell.products.reduce((acc, p) => acc + p.funnel.drr, 0) / cell.products.length;
    }
  });

  return cells;
}

export function useExportedMatrix() {
  const { groupingMode, selectedSellers } = useGlobalFilters();

  const matrix = useMemo(() => {
    let rawProducts = productsData as ExportedProduct[];

    // Filter by selected sellers
    if (selectedSellers.length > 0) {
      rawProducts = rawProducts.filter(p => selectedSellers.includes(p.seller));
    }

    const rowsMap = new Map<string, ExportedProduct[]>();

    rawProducts.forEach(p => {
      const primaryKey = groupingMode === 'competitor' ? p.seller : p.brand;
      if (!primaryKey) return;
      if (!rowsMap.has(primaryKey)) rowsMap.set(primaryKey, []);
      rowsMap.get(primaryKey)!.push(p);
    });

    const rows: MatrixRowData[] = [];

    Array.from(rowsMap.entries()).forEach(([primaryKey, primaryProducts]) => {
      // Group L2
      const l2Map = new Map<string, ExportedProduct[]>();
      primaryProducts.forEach(p => {
        const secondaryKey = groupingMode === 'competitor' ? p.brand : p.seller;
        const key = secondaryKey || 'Unknown';
        if (!l2Map.has(key)) l2Map.set(key, []);
        l2Map.get(key)!.push(p);
      });

      const children: MatrixRowData[] = [];
      Array.from(l2Map.entries()).forEach(([secondaryKey, secondaryProducts]) => {
        children.push({
          id: `${primaryKey}-${secondaryKey}`,
          name: secondaryKey,
          cells: aggregateCells(secondaryProducts),
          totalRevenue: secondaryProducts.reduce((acc, p) => acc + p.revenue, 0),
          totalSales: secondaryProducts.reduce((acc, p) => acc + p.sales, 0),
          children: []
        });
      });

      // Sort children by revenue
      children.sort((a, b) => b.totalRevenue - a.totalRevenue);

      rows.push({
        id: primaryKey,
        name: primaryKey,
        cells: aggregateCells(primaryProducts),
        totalRevenue: primaryProducts.reduce((acc, p) => acc + p.revenue, 0),
        totalSales: primaryProducts.reduce((acc, p) => acc + p.sales, 0),
        children
      });
    });

    // Sort rows by revenue
    rows.sort((a, b) => b.totalRevenue - a.totalRevenue);

    // Calculate max values for heatmap
    let maxRevenue = 0;
    let maxSales = 0;
    rows.forEach(r => {
      Object.values(r.cells).forEach(c => {
        if (c.revenue > maxRevenue) maxRevenue = c.revenue;
        if (c.sales > maxSales) maxSales = c.sales;
      });
    });

    return { rows, maxRevenue, maxSales };
  }, [groupingMode, selectedSellers]);

  return matrix;
}
