'use client';

import React from 'react';
import styles from '@/styles/layout.module.css';
import overviewStyles from '@/styles/overview.module.css';
import {
  IconChartBar,
  IconNetwork,
  IconTelescope,
  IconSparkles,
  IconSearch,
  IconPlus,
  IconSend,
  IconDollarSign,
  IconAlertTriangle,
  IconActivity,
  IconStar,
  IconRobot,
  IconArrowUp,
  IconArrowDown,
  IconMinus,
  IconTrendingUp,
} from '@/components/icons';

/* ============================================================
   MOCK DATA (inline for first visual result)
   ============================================================ */

const kpiData = [
  { icon: <IconChartBar size={18} />, label: 'Конкуренты', value: '5', delta: '+2', direction: 'up' as const, deltaLabel: 'за месяц' },
  { icon: <IconDollarSign size={18} />, label: 'Ценовой индекс', value: '1.00', delta: '-0.08', direction: 'down' as const, deltaLabel: 'vs прошлый мес.' },
  { icon: <IconAlertTriangle size={18} />, label: 'Активные угрозы', value: '3', delta: '+1', direction: 'up' as const, deltaLabel: 'новых' },
  { icon: <IconTrendingUp size={18} />, label: 'Sentiment Score', value: '68', delta: '+5', direction: 'up' as const, deltaLabel: 'за месяц' },
];

const competitorsTable = [
  { id: 'pool-hall-pro', name: 'Pool Hall Pro', type: 'direct', typeLabel: 'Прямой', color: '#A855F7', rating: 4.7, price: 800, priceDelta: -15.8, activity: 'high', activityLabel: 'Высокая', threat: 'critical', threatLabel: 'Критично' },
  { id: 'shark-lounge', name: 'Shark Lounge', type: 'direct', typeLabel: 'Прямой', color: '#A855F7', rating: 4.6, price: 1400, priceDelta: 16.7, activity: 'high', activityLabel: 'Высокая', threat: 'warning', threatLabel: 'Внимание' },
  { id: 'billiard-city', name: 'Бильярд-Сити', type: 'direct', typeLabel: 'Прямой', color: '#A855F7', rating: 4.3, price: 700, priceDelta: 7.7, activity: 'medium', activityLabel: 'Средняя', threat: 'warning', threatLabel: 'Внимание' },
  { id: 'kiy-club', name: 'Кий-Клуб «Динамо»', type: 'potential', typeLabel: 'Потенц.', color: '#F97316', rating: 4.0, price: 600, priceDelta: -14.3, activity: 'veryHigh', activityLabel: 'Оч.высокая', threat: 'warning', threatLabel: 'Внимание' },
  { id: 'lucky-shot', name: 'Lucky Shot', type: 'indirect', typeLabel: 'Косвенный', color: '#06B6D4', rating: 4.1, price: 450, priceDelta: 0, activity: 'low', activityLabel: 'Низкая', threat: 'normal', threatLabel: 'Норма' },
];

const alerts = [
  { severity: 'critical' as const, title: 'Pool Hall Pro снизил цены на 15.8%', source: 'Pool Hall Pro', time: '2 часа назад', action: 'Проанализировать' },
  { severity: 'warning' as const, title: 'Новая рекламная кампания в Instagram', source: 'Pool Hall Pro', time: 'вчера', action: 'Посмотреть' },
  { severity: 'warning' as const, title: 'Shark Lounge запустил онлайн-бронирование', source: 'Shark Lounge', time: '3 дня назад', action: 'Детали' },
  { severity: 'success' as const, title: 'Ваш рейтинг растёт быстрее рынка (+0.3)', source: 'Weekend Бильярд', time: 'сегодня', action: 'Подробнее' },
];

const navItems = [
  { id: 'overview', label: 'Overview', icon: <IconChartBar size={20} />, active: true },
  { id: 'graph', label: 'Граф связей', icon: <IconNetwork size={20} />, active: false },
  { id: 'observatory', label: 'Обсерватория', icon: <IconTelescope size={20} />, active: false },
  { id: 'insights', label: 'Инсайты', icon: <IconSparkles size={20} />, active: false },
];

const groups = [
  { label: 'Прямые конкуренты', count: 3, color: '#A855F7' },
  { label: 'Косвенные', count: 1, color: '#06B6D4' },
  { label: 'Потенциальные', count: 1, color: '#F97316' },
];

/* ============================================================
   SCATTER CHART (Canvas-based for performance)
   ============================================================ */

interface MarketPoint {
  id: string;
  name: string;
  x: number;  // price level (0-10)
  y: number;  // quality score (0-10)
  r: number;  // market share
  color: string;
  isSelf?: boolean;
}

const marketData: MarketPoint[] = [
  { id: 'weekend', name: 'Weekend Бильярд', x: 7.0, y: 7.5, r: 18, color: '#0157a4', isSelf: true },
  { id: 'php', name: 'Pool Hall Pro', x: 6.2, y: 8.5, r: 22, color: '#A855F7' },
  { id: 'bc', name: 'Бильярд-Сити', x: 5.5, y: 6.5, r: 14, color: '#A855F7' },
  { id: 'ls', name: 'Lucky Shot', x: 3.0, y: 4.5, r: 5, color: '#06B6D4' },
  { id: 'sl', name: 'Shark Lounge', x: 9.5, y: 9.0, r: 12, color: '#A855F7' },
  { id: 'kc', name: 'Кий-Клуб', x: 4.5, y: 5.5, r: 3, color: '#F97316' },
];

function ScatterChart() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [hoveredPoint, setHoveredPoint] = React.useState<MarketPoint | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState({ x: 0, y: 0 });

  const padding = { top: 30, right: 30, bottom: 40, left: 50 };

  const drawChart = React.useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const plotW = w - padding.left - padding.right;
    const plotH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i += 2) {
      const x = padding.left + (i / 10) * plotW;
      const y = padding.top + ((10 - i) / 10) * plotH;
      ctx.beginPath(); ctx.moveTo(x, padding.top); ctx.lineTo(x, padding.top + plotH); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(padding.left + plotW, y); ctx.stroke();
    }

    // Axis labels
    ctx.font = '10px IBM Plex Mono, monospace';
    ctx.fillStyle = '#55555C';
    ctx.textAlign = 'center';
    for (let i = 0; i <= 10; i += 2) {
      const x = padding.left + (i / 10) * plotW;
      ctx.fillText(`${i}`, x, h - 10);
    }
    ctx.textAlign = 'right';
    for (let i = 0; i <= 10; i += 2) {
      const y = padding.top + ((10 - i) / 10) * plotH;
      ctx.fillText(`${i}`, padding.left - 8, y + 4);
    }

    // Axis titles
    ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = '#8E8E93';
    ctx.textAlign = 'center';
    ctx.fillText('Уровень цен →', w / 2, h - 0);

    ctx.save();
    ctx.translate(12, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Качество / Рейтинг →', 0, 0);
    ctx.restore();

    // Points
    marketData.forEach(point => {
      const cx = padding.left + (point.x / 10) * plotW;
      const cy = padding.top + ((10 - point.y) / 10) * plotH;
      const radius = Math.max(8, point.r * 1.5);

      if (point.isSelf) {
        // Glow effect
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius + 12);
        gradient.addColorStop(0, 'rgba(1, 87, 164, 0.4)');
        gradient.addColorStop(1, 'rgba(1, 87, 164, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath(); ctx.arc(cx, cy, radius + 12, 0, Math.PI * 2); ctx.fill();
      }

      // Circle
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = point.color + '33';
      ctx.fill();
      ctx.strokeStyle = point.color;
      ctx.lineWidth = point.isSelf ? 2.5 : 1.5;
      ctx.stroke();

      // Label
      ctx.font = point.isSelf ? 'bold 11px Inter, sans-serif' : '10px Inter, sans-serif';
      ctx.fillStyle = point.isSelf ? '#FFFFFF' : '#8E8E93';
      ctx.textAlign = 'center';
      ctx.fillText(point.name, cx, cy - radius - 6);
    });
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    drawChart(canvas);

    const handleResize = () => drawChart(canvas);
    const observer = new ResizeObserver(handleResize);
    observer.observe(canvas.parentElement!);
    return () => observer.disconnect();
  }, [drawChart]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const plotW = rect.width - padding.left - padding.right;
    const plotH = rect.height - padding.top - padding.bottom;

    let found: MarketPoint | null = null;
    for (const point of marketData) {
      const cx = padding.left + (point.x / 10) * plotW;
      const cy = padding.top + ((10 - point.y) / 10) * plotH;
      const radius = Math.max(8, point.r * 1.5);
      const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
      if (dist < radius + 5) {
        found = point;
        setTooltipPos({ x: cx, y: cy - radius - 30 });
        break;
      }
    }
    setHoveredPoint(found);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '280px' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredPoint(null)}
      />
      {hoveredPoint && (
        <div style={{
          position: 'absolute',
          left: tooltipPos.x,
          top: tooltipPos.y,
          transform: 'translate(-50%, -100%)',
          background: '#1B1B22',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '8px',
          padding: '8px 12px',
          pointerEvents: 'none',
          zIndex: 10,
          whiteSpace: 'nowrap',
          fontSize: '12px',
        }}>
          <div style={{ fontWeight: 600, marginBottom: 2 }}>{hoveredPoint.name}</div>
          <div style={{ color: '#8E8E93', fontFamily: 'IBM Plex Mono, monospace', fontSize: 11 }}>
            Цена: {hoveredPoint.x} / Качество: {hoveredPoint.y} / Доля: {hoveredPoint.r}%
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   RADAR CHART (Canvas-based)
   ============================================================ */

interface RadarData {
  label: string;
  ours: number;
  competitor: number;
  competitor2: number;
}

const radarData: RadarData[] = [
  { label: 'Цена', ours: 6.0, competitor: 7.5, competitor2: 3.0 },
  { label: 'Качество', ours: 7.5, competitor: 8.5, competitor2: 9.0 },
  { label: 'Сервис', ours: 7.0, competitor: 8.0, competitor2: 9.2 },
  { label: 'Локация', ours: 7.5, competitor: 9.0, competitor2: 9.5 },
  { label: 'Ассортимент', ours: 7.0, competitor: 8.2, competitor2: 7.5 },
  { label: 'Атмосфера', ours: 7.2, competitor: 7.8, competitor2: 9.5 },
  { label: 'Маркетинг', ours: 5.5, competitor: 9.0, competitor2: 8.5 },
  { label: 'Лояльность', ours: 6.0, competitor: 6.5, competitor2: 7.0 },
];

function RadarChart() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const drawRadar = React.useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.min(w, h) / 2 - 40;
    const axes = radarData.length;

    // Grid rings
    for (let ring = 2; ring <= 10; ring += 2) {
      const r = (ring / 10) * maxR;
      ctx.beginPath();
      for (let i = 0; i <= axes; i++) {
        const angle = (i / axes) * Math.PI * 2 - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axis lines and labels
    ctx.font = '10px Inter, sans-serif';
    ctx.fillStyle = '#8E8E93';
    ctx.textAlign = 'center';
    for (let i = 0; i < axes; i++) {
      const angle = (i / axes) * Math.PI * 2 - Math.PI / 2;
      const x1 = cx + maxR * Math.cos(angle);
      const y1 = cy + maxR * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.stroke();

      const labelX = cx + (maxR + 20) * Math.cos(angle);
      const labelY = cy + (maxR + 20) * Math.sin(angle);
      ctx.fillText(radarData[i].label, labelX, labelY + 4);
    }

    // Draw data polygon
    const drawPolygon = (values: number[], color: string, fill: boolean) => {
      ctx.beginPath();
      for (let i = 0; i <= axes; i++) {
        const idx = i % axes;
        const angle = (idx / axes) * Math.PI * 2 - Math.PI / 2;
        const r = (values[idx] / 10) * maxR;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      if (fill) {
        ctx.fillStyle = color + '20';
        ctx.fill();
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = fill ? 2 : 1.5;
      ctx.stroke();

      // Draw points
      for (let i = 0; i < axes; i++) {
        const angle = (i / axes) * Math.PI * 2 - Math.PI / 2;
        const r = (values[i] / 10) * maxR;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    };

    // Competitor 2 (Shark Lounge) — behind
    drawPolygon(radarData.map(d => d.competitor2), '#A855F7', false);
    // Competitor 1 (Pool Hall Pro) — middle
    drawPolygon(radarData.map(d => d.competitor), '#FF3B30', false);
    // Ours — front, with fill
    drawPolygon(radarData.map(d => d.ours), '#0157a4', true);

  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawRadar(canvas);
    const observer = new ResizeObserver(() => drawRadar(canvas));
    observer.observe(canvas.parentElement!);
    return () => observer.disconnect();
  }, [drawRadar]);

  return (
    <div style={{ width: '100%', height: '280px' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

/* ============================================================
   AREA CHART (Canvas-based)
   ============================================================ */

function AreaChart() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const labels = ['18 Мая', '25 Мая', '1 Июн', '8 Июн', '15 Июн'];
  const series = [
    { label: 'Соцсети', data: [12, 15, 18, 22, 28], color: '#5046E5' },
    { label: 'Обновления', data: [3, 2, 5, 4, 6], color: '#06B6D4' },
    { label: 'Реклама', data: [2, 3, 4, 5, 7], color: '#FF9800' },
    { label: 'Промо', data: [1, 2, 3, 3, 5], color: '#00E676' },
  ];

  const drawArea = React.useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 20, right: 20, bottom: 40, left: 40 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    ctx.clearRect(0, 0, w, h);

    const maxVal = 30;

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (i / 5) * plotH;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + plotW, y); ctx.stroke();
      ctx.font = '10px IBM Plex Mono, monospace';
      ctx.fillStyle = '#55555C';
      ctx.textAlign = 'right';
      ctx.fillText(`${maxVal - (i / 5) * maxVal}`, pad.left - 8, y + 4);
    }

    // X labels
    ctx.textAlign = 'center';
    labels.forEach((label, i) => {
      const x = pad.left + (i / (labels.length - 1)) * plotW;
      ctx.fillText(label, x, h - 10);
    });

    // Draw stacked areas (reversed order for visual stacking)
    const stacked: number[][] = Array.from({ length: labels.length }, () => [0]);

    // Calculate stacked values
    series.forEach((s, si) => {
      s.data.forEach((val, i) => {
        if (si === 0) stacked[i] = [val];
        else stacked[i].push(stacked[i][si - 1] + val);
      });
    });

    // Draw from top to bottom
    for (let si = series.length - 1; si >= 0; si--) {
      const s = series[si];
      ctx.beginPath();

      // Top line
      for (let i = 0; i < labels.length; i++) {
        const x = pad.left + (i / (labels.length - 1)) * plotW;
        let cumVal = 0;
        for (let j = 0; j <= si; j++) cumVal += series[j].data[i];
        const y = pad.top + ((maxVal - cumVal) / maxVal) * plotH;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      // Bottom line (previous stack level or baseline)
      for (let i = labels.length - 1; i >= 0; i--) {
        const x = pad.left + (i / (labels.length - 1)) * plotW;
        let cumVal = 0;
        for (let j = 0; j < si; j++) cumVal += series[j].data[i];
        const y = pad.top + ((maxVal - cumVal) / maxVal) * plotH;
        ctx.lineTo(x, y);
      }

      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
      gradient.addColorStop(0, s.color + '40');
      gradient.addColorStop(1, s.color + '05');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Line on top
      ctx.beginPath();
      for (let i = 0; i < labels.length; i++) {
        const x = pad.left + (i / (labels.length - 1)) * plotW;
        let cumVal = 0;
        for (let j = 0; j <= si; j++) cumVal += series[j].data[i];
        const y = pad.top + ((maxVal - cumVal) / maxVal) * plotH;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawArea(canvas);
    const observer = new ResizeObserver(() => drawArea(canvas));
    observer.observe(canvas.parentElement!);
    return () => observer.disconnect();
  }, [drawArea]);

  return (
    <div>
      <div style={{ width: '100%', height: '280px' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className={overviewStyles.chartLegend}>
        {series.map(s => (
          <div key={s.label} className={overviewStyles.legendItem}>
            <span className={overviewStyles.legendLine} style={{ background: s.color }} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   PAGE COMPONENT
   ============================================================ */

export default function OverviewPage() {
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

        <button className={styles.newReportBtn} id="btn-new-report">
          <IconPlus size={16} /> Новый отчёт
        </button>

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

        <div className={styles.sectionLabel}>Последние отчёты</div>
        <div className={styles.reportList}>
          <div className={styles.reportItem}>Q2 2026 — Бильярдный рынок Москвы</div>
          <div className={styles.reportItem}>Июнь — Ценовой анализ</div>
        </div>

        <div className={styles.userCard} id="user-card">
          <div className={styles.userAvatar}>DP</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Denis Polotsk</div>
            <div className={styles.userEmail}>denis@weekend.ru</div>
          </div>
        </div>
      </aside>

      {/* ---- MAIN CONTENT ---- */}
      <main className={styles.mainContent}>
        <div className={overviewStyles.page}>

          {/* Search Bar */}
          <div className={overviewStyles.searchBar} id="search-bar">
            <IconSearch size={16} className={overviewStyles.searchIcon} />
            <input
              type="text"
              className={overviewStyles.searchInput}
              placeholder="Поиск конкурентов, метрик, отчётов..."
              id="search-input"
            />
            <span className={overviewStyles.searchShortcut}>⌘ K</span>
          </div>

          {/* Header */}
          <div className={overviewStyles.header}>
            <div className={overviewStyles.headerLeft}>
              <h1 className={overviewStyles.pageTitle}>Обзор конкурентной среды</h1>
              <p className={overviewStyles.pageSubtitle}>Weekend Бильярд · Июнь 2026</p>
            </div>
            <div className={overviewStyles.headerRight}>
              <div className={overviewStyles.periodSelector} id="period-selector">
                {['7д', '30д', '90д', '1г'].map((p, i) => (
                  <button
                    key={p}
                    className={`${overviewStyles.periodBtn} ${i === 1 ? overviewStyles.active : ''}`}
                    id={`period-${p}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* KPI Row */}
          <div className={overviewStyles.kpiRow} id="kpi-row">
            {kpiData.map((kpi, i) => (
              <div key={i} className={overviewStyles.kpiCard} id={`kpi-${i}`}>
                <div className={overviewStyles.kpiHeader}>
                  <span className={overviewStyles.kpiIcon}>{kpi.icon}</span>
                  <span className={overviewStyles.kpiLabel}>{kpi.label}</span>
                </div>
                <div className={overviewStyles.kpiValue}>{kpi.value}</div>
                <span className={`${overviewStyles.kpiDelta} ${overviewStyles[kpi.direction]}`}>
                  {kpi.direction === 'up' ? <IconArrowUp size={12} /> : kpi.direction === 'down' ? <IconArrowDown size={12} /> : <IconMinus size={12} />}
                  {kpi.delta}
                  <span className={overviewStyles.kpiDeltaLabel}>{kpi.deltaLabel}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className={overviewStyles.chartsGrid}>
            {/* Scatter Plot — Market Position */}
            <div className={overviewStyles.chartCard} id="chart-scatter">
              <div className={overviewStyles.chartTitle}>Рыночная позиция</div>
              <div className={overviewStyles.chartSubtitle}>Цена vs Качество · Размер = доля рынка</div>
              <div className={overviewStyles.chartContainer}>
                <ScatterChart />
              </div>
              <div className={overviewStyles.chartLegend}>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendDot} style={{ background: '#0157a4' }} /> Weekend Бильярд
                </div>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendDot} style={{ background: '#A855F7' }} /> Прямые
                </div>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendDot} style={{ background: '#06B6D4' }} /> Косвенные
                </div>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendDot} style={{ background: '#F97316' }} /> Потенциальные
                </div>
              </div>
            </div>

            {/* Radar Chart — Price Radar */}
            <div className={overviewStyles.chartCard} id="chart-radar">
              <div className={overviewStyles.chartTitle}>Ценовой радар</div>
              <div className={overviewStyles.chartSubtitle}>Weekend vs Pool Hall Pro vs Shark Lounge</div>
              <div className={overviewStyles.chartContainer}>
                <RadarChart />
              </div>
              <div className={overviewStyles.chartLegend}>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendLine} style={{ background: '#0157a4', height: 3 }} /> Weekend Бильярд
                </div>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendLine} style={{ background: '#FF3B30' }} /> Pool Hall Pro
                </div>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendLine} style={{ background: '#A855F7' }} /> Shark Lounge
                </div>
              </div>
            </div>

            {/* Area Chart — Activity Dynamics */}
            <div className={overviewStyles.chartCard} id="chart-area">
              <div className={overviewStyles.chartTitle}>Динамика активности конкурентов</div>
              <div className={overviewStyles.chartSubtitle}>Последние 30 дней · Все конкуренты</div>
              <div className={overviewStyles.chartContainer}>
                <AreaChart />
              </div>
            </div>

            {/* AI Alerts */}
            <div className={overviewStyles.alertsCard} id="alerts-panel">
              <div className={overviewStyles.alertsHeader}>
                <div className={overviewStyles.alertsTitle}>
                  <IconRobot size={20} />
                  AI Alerts
                </div>
                <span className={overviewStyles.alertsSeeAll}>Все алерты →</span>
              </div>
              <div className={overviewStyles.alertsList}>
                {alerts.map((alert, i) => (
                  <div
                    key={i}
                    className={`${overviewStyles.alertItem} ${overviewStyles[alert.severity]}`}
                    id={`alert-${i}`}
                  >
                    <div className={overviewStyles.alertItemTitle}>{alert.title}</div>
                    <div className={overviewStyles.alertItemMeta}>{alert.source} · {alert.time}</div>
                    <span className={overviewStyles.alertItemAction}>{alert.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Competitors Table */}
          <div className={overviewStyles.tableCard} id="competitors-table">
            <div className={overviewStyles.tableTitle}>Конкуренты</div>
            <div className={overviewStyles.tableWrapper}>
              <table className={overviewStyles.table}>
                <thead>
                  <tr>
                    <th>Конкурент</th>
                    <th>Тип</th>
                    <th>Рейтинг</th>
                    <th>Цена (ср.)</th>
                    <th>Δ Цена</th>
                    <th>Активность</th>
                    <th>Угроза</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorsTable.map(comp => (
                    <tr key={comp.id} id={`row-${comp.id}`}>
                      <td>
                        <div className={overviewStyles.competitorName}>
                          <span className={overviewStyles.competitorDot} style={{ backgroundColor: comp.color }} />
                          {comp.name}
                        </div>
                      </td>
                      <td>
                        <span className={`${overviewStyles.typeBadge} ${overviewStyles[comp.type]}`}>
                          {comp.typeLabel}
                        </span>
                      </td>
                      <td className={overviewStyles.ratingCell}>
                        <IconStar size={13} /> {comp.rating}
                      </td>
                      <td className={overviewStyles.priceCell}>{comp.price.toLocaleString()}₽/ч</td>
                      <td className={`${overviewStyles.deltaCell} ${comp.priceDelta < 0 ? overviewStyles.negative : comp.priceDelta > 0 ? overviewStyles.positive : overviewStyles.neutral}`}>
                        {comp.priceDelta > 0 ? '↑' : comp.priceDelta < 0 ? '↓' : '—'} {comp.priceDelta !== 0 ? `${Math.abs(comp.priceDelta)}%` : ''}
                      </td>
                      <td>
                        <span className={`${overviewStyles.activityDot} ${overviewStyles[comp.activity]}`} />
                        {comp.activityLabel}
                      </td>
                      <td>
                        <span className={`${overviewStyles.threatBadge} ${overviewStyles[comp.threat]}`}>
                          {comp.threatLabel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Prompt Input */}
          <div className={overviewStyles.aiPrompt} id="ai-prompt">
            <IconSparkles size={20} className={overviewStyles.aiPromptIcon} />
            <input
              type="text"
              className={overviewStyles.aiPromptInput}
              placeholder="Задай вопрос AI-аналитику... Используй @ для выбора конкурента"
              id="ai-prompt-input"
            />
            <button className={overviewStyles.aiPromptSend} id="ai-prompt-send">
              <IconSend size={18} />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
