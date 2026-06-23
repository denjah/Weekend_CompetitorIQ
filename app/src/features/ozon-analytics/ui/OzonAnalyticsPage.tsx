'use client';

import React, { useState } from 'react';
import styles from '@/styles/layout.module.css';
import ozon from '@/styles/ozon.module.css';
import StyleSwitcher from '@/components/ui/StyleSwitcher';
import DatabaseTelemetry from '@/components/ui/DatabaseTelemetry';
import {
  IconChartBar,
  IconNetwork,
  IconTelescope,
  IconSparkles,
  IconShoppingBag,
  IconPlus,
  IconFilter,
  IconRefresh,
  IconGrid,
  IconPackage,
  IconTarget,
  IconTrendingUp,
  IconClock,
} from '@/components/icons';
import { useOzonAnalytics } from '../hooks/useOzonAnalytics';
import { OzonKpiGrid } from './OzonKpiGrid';
import { OzonOverviewSection } from './OzonOverviewSection';
import { GlobalFiltersBar } from './GlobalFiltersBar';
import { SalesMatrix } from './SalesMatrix';
import { ContentAnalysisSection } from './ContentAnalysisSection';
import { BrandDrilldownSection } from './BrandDrilldownSection';
import { InsightsSection } from './InsightsSection';
import { ImportSourcesSection } from './ImportSourcesSection';
import { ProductCardsTable } from './ProductCardsTable';
import { ProductCardDrawer } from './ProductCardDrawer';
import { UnitEconomicsSection } from './UnitEconomicsSection';
import { ReviewsAnalysisSection } from './ReviewsAnalysisSection';
import { AggregatedProduct } from '../model/types';

/* ============================================================
   NAV (с пунктом Ozon)
   ============================================================ */

const navItems = [
  { id: 'overview', label: 'Overview', icon: <IconChartBar size={20} />, active: false },
  { id: 'graph', label: 'Граф связей', icon: <IconNetwork size={20} />, active: false },
  { id: 'observatory', label: 'Обсерватория', icon: <IconTelescope size={20} />, active: false },
  { id: 'insights', label: 'Инсайты', icon: <IconSparkles size={20} />, active: false },
  { id: 'ozon', label: 'Ozon Анализ', icon: <IconShoppingBag size={20} />, active: true },
];

const groups = [
  { label: 'Прямые конкуренты', count: 8, color: '#A855F7' },
  { label: 'Косвенные', count: 6, color: '#06B6D4' },
  { label: 'Нишевые', count: 7, color: '#F97316' },
];

/* ============================================================
   TAB DEFINITIONS
   ============================================================ */

type OzonTab = 'cards' | 'economics' | 'reviews' | 'content' | 'brands' | 'insights' | 'import';

const tabs: { id: OzonTab; label: string; icon: React.ReactNode }[] = [
  { id: 'cards', label: 'Карточки', icon: <IconPackage size={14} /> },
  { id: 'economics', label: 'Юнит-Экономика', icon: <IconTarget size={14} /> },
  { id: 'reviews', label: 'Отзывы', icon: <IconSparkles size={14} /> },
  { id: 'content', label: 'Контент-анализ', icon: <IconTarget size={14} /> },
  { id: 'brands', label: 'Бренды', icon: <IconTrendingUp size={14} /> },
  { id: 'insights', label: 'Инсайты', icon: <IconSparkles size={14} /> },
  { id: 'import', label: 'Источники', icon: <IconRefresh size={14} /> },
];

/* ============================================================
   PAGE COMPONENT
   ============================================================ */

export default function OzonAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<OzonTab>('cards');
  const [selectedProduct, setSelectedProduct] = useState<AggregatedProduct | null>(null);
  const data = useOzonAnalytics();

  return (
    <div className={styles.layout}>
      {/* ---- SIDEBAR ---- */}
      <aside className={styles.sidebar} id="sidebar">
        <div className={styles.logo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo_icon.svg" alt="CompetitorIQ" className={styles.logoIcon} />
          <span className={styles.logoText}>CompetitorIQ</span>
        </div>
        <div className={styles.logoSubtitle}>Competitor Intelligence</div>

        <DatabaseTelemetry />

        <div className={styles.sectionLabel}>Навигация</div>
        <nav className={styles.navList} id="nav-main">
          {navItems.map(item => (
            <a
              key={item.id}
              className={`${styles.navItem} ${item.active ? styles.active : ''}`}
              href={item.id === 'overview' ? '/' : `/${item.id}`}
              id={`nav-${item.id}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.sectionLabel}>Группы</div>
        <div className={styles.groupList} id="groups-list">
          {groups.map(group => (
            <div key={group.label} className={styles.groupItem}>
              <span className={styles.groupDot} style={{ backgroundColor: group.color }} />
              <span>{group.label}</span>
              <span className={styles.groupCount}>{group.count}</span>
            </div>
          ))}
          <button className={styles.addGroupBtn}>
            <IconPlus size={14} /> Добавить группу
          </button>
        </div>

        <div className={styles.userCard} id="user-card" style={{ marginTop: 'auto' }}>
          <div className={styles.userAvatar}>DP</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Denis Polotsk</div>
            <div className={styles.userEmail}>denis@weekend.ru</div>
          </div>
        </div>
      </aside>

      {/* ---- MAIN CONTENT ---- */}
      <main className={styles.mainContent}>
        <div className={ozon.page}>

          <StyleSwitcher />

          {/* Header */}
          <div className={ozon.header}>
            <div className={ozon.headerLeft}>
              <h1 className={ozon.pageTitle}>
                <IconShoppingBag size={28} className={ozon.pageTitleIcon} />
                Ozon Market Intelligence
                <span className={ozon.ozonBadge}>BETA</span>
                <div className={ozon.liveStatus} id="ozon-live-status" style={{ marginLeft: '8px' }}>
                  <span className={ozon.liveDot} />
                  MOCK
                </div>
              </h1>
              <p className={ozon.pageSubtitle}>
                Анализ конкурентов на маркетплейсе · Бильярдные столы
                {data.snapshot && (
                  <> · Снимок {new Date(data.snapshot.capturedAt).toLocaleDateString('ru-RU')}</>
                )}
              </p>
            </div>
          </div>

          {/* Snapshot Info */}
          {data.snapshot && (
            <div className={ozon.snapshotInfo}>
              <IconClock size={14} />
              <span className={ozon.snapshotInfoLabel}>Снимок:</span>
              {new Date(data.snapshot.periodStart).toLocaleDateString('ru-RU')} –{' '}
              {new Date(data.snapshot.periodEnd).toLocaleDateString('ru-RU')}
              <span style={{ marginLeft: 'auto', opacity: 0.6 }}>
                Источник: {data.snapshot.source}
              </span>
              <button className={ozon.actionBtn} id="ozon-btn-refresh" style={{ marginLeft: '12px' }}>
                <IconRefresh size={14} /> Обновить
              </button>
            </div>
          )}

          {/* Loading */}
          {data.isLoading && (
            <div className={ozon.loadingContainer}>
              <div className={ozon.loadingSpinner} />
              <div className={ozon.loadingText}>Загрузка данных Ozon...</div>
            </div>
          )}

          {/* Error */}
          {data.error && (
            <div className={ozon.errorContainer}>
              <div className={ozon.errorText}>⚠️ {data.error}</div>
              <button className={ozon.errorRetry} onClick={() => window.location.reload()}>
                Повторить
              </button>
            </div>
          )}

          {/* Main content (when loaded) */}
          {!data.isLoading && !data.error && (
            <>
              {/* KPI Row */}
              <OzonKpiGrid kpi={data.kpi} />

              <div style={{ marginTop: '24px' }}>
                <OzonOverviewSection brands={data.brands} products={data.products} />
              </div>

              {/* Top Filters & Interactive Matrix */}
              <div style={{ marginTop: '24px' }}>
                <GlobalFiltersBar />
                <SalesMatrix />
              </div>

              {/* Tab Bar */}
              <div className={ozon.tabBar} id="ozon-tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`${ozon.tabBtn} ${activeTab === tab.id ? ozon.active : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                    id={`ozon-tab-${tab.id}`}
                  >
                    {tab.icon}
                    {tab.label}
                    {tab.id === 'cards' && (
                      <span className={ozon.tabBtnBadge}>{data.products.length}</span>
                    )}
                    {tab.id === 'insights' && (
                      <span className={ozon.tabBtnBadge}>{data.insights.length}</span>
                    )}
                    {tab.id === 'brands' && (
                      <span className={ozon.tabBtnBadge}>{data.brands.length}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content (placeholders for Этапы 4-6) */}
              <div className={ozon.sectionCard}>
                <div className={ozon.sectionHeader}>
                  <div className={ozon.sectionTitle}>
                    {tabs.find(t => t.id === activeTab)?.icon}
                    {tabs.find(t => t.id === activeTab)?.label}
                  </div>
                  <span className={ozon.sectionSubtitle}>
                    {activeTab === 'cards' && `${data.products.length} карточек товаров`}
                    {activeTab === 'economics' && `Юнит-экономика FBO / FBS / rFBS`}
                    {activeTab === 'reviews' && `Семантический анализ отзывов покупателей`}
                    {activeTab === 'content' && `Анализ качества контента`}
                    {activeTab === 'brands' && `${data.brands.length} брендов`}
                    {activeTab === 'insights' && `${data.insights.length} AI-инсайтов`}
                    {activeTab === 'import' && `Управление источниками данных`}
                  </span>
                </div>
                <div className={ozon.sectionBody}>
                  {activeTab === 'cards' && (
                    <ProductCardsTable products={data.products} onRowClick={setSelectedProduct} />
                  )}
                  {activeTab === 'economics' && (
                    <UnitEconomicsSection />
                  )}
                  {activeTab === 'reviews' && (
                    <ReviewsAnalysisSection reviewsData={data.reviewsData} />
                  )}
                  {activeTab === 'content' && (
                    <ContentAnalysisSection products={data.products} />
                  )}
                  {activeTab === 'brands' && (
                    <BrandDrilldownSection brands={data.brands} products={data.products} />
                  )}
                  {activeTab === 'insights' && (
                    <InsightsSection insights={data.insights} />
                  )}
                  {activeTab === 'import' && (
                    <ImportSourcesSection />
                  )}
                </div>
              </div>
            </>
          )}

        </div>
      </main>

      {/* Drawer */}
      <ProductCardDrawer product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
