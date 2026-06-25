'use client';

import React from 'react';
import styles from '@/styles/layout.module.css';
import obs from '@/styles/observatory.module.css';
import StyleSwitcher from '@/components/ui/StyleSwitcher';
import DatabaseTelemetry from '@/components/ui/DatabaseTelemetry';
import {
  IconChartBar,
  IconNetwork,
  IconTelescope,
  IconSparkles,
  IconPlus,
  IconSend,
  IconEye,
  IconClock,
  IconGlobe,
  IconZap,
  IconFilter,
  IconRefresh,
  IconRadar,
  IconHash,
  IconActivity,
  IconCamera,
  IconStar,
  IconDollarSign,
  IconArrowUp,
  IconArrowDown,
  IconExternalLink,
  IconShoppingBag,
} from '@/components/icons';

/* ============================================================
   NAV & GROUPS (обновлено под реальные данные)
   ============================================================ */

const navItems = [
  { id: 'overview', label: 'Overview', icon: <IconChartBar size={20} />, active: false },
  { id: 'graph', label: 'Граф связей', icon: <IconNetwork size={20} />, active: false },
  { id: 'observatory', label: 'Обсерватория', icon: <IconTelescope size={20} />, active: true },
  { id: 'insights', label: 'Инсайты', icon: <IconSparkles size={20} />, active: false },

];

const groups = [
  { label: 'Прямые конкуренты', count: 8, color: '#A855F7' },
  { label: 'Косвенные', count: 6, color: '#06B6D4' },
  { label: 'Нишевые', count: 7, color: '#F97316' },
];

/* ============================================================
   REAL DATA — Observatory
   ============================================================ */

const kpiData = [
  { icon: <IconEye size={16} />, label: 'Под наблюдением', value: '21', delta: '+21', direction: 'up' as const },
  { icon: <IconActivity size={16} />, label: 'Событий / анализ', value: '15', delta: 'из CSV', direction: 'stable' as const },
  { icon: <IconZap size={16} />, label: 'Критичных', value: '1', delta: 'B-Group', direction: 'up' as const },
  { icon: <IconGlobe size={16} />, label: 'Каналов', value: '4', delta: 'Сайт/YT/VK/TG', direction: 'stable' as const },
  { icon: <IconClock size={16} />, label: 'Последний скан', value: '19.06', delta: '2026', direction: 'stable' as const },
];

interface FeedEvent {
  id: string;
  source: string;
  sourceColor: string;
  severity: 'critical' | 'warning' | 'success' | 'info' | 'neutral';
  category: string;
  categoryType: string;
  text: string;
  time: string;
  channel: string;
}

const feedEvents: FeedEvent[] = [
  {
    id: 'evt-1',
    source: 'Billiard-Group',
    sourceColor: '#A855F7',
    severity: 'critical',
    category: 'Аудит',
    categoryType: 'seo',
    text: 'Лидер аудита <strong>26/40</strong>. 15 000 SKU, 300 брендов, 8–10 салонов в 7 городах, гарантия до 25 лет. Рассрочка, кешбэк, бот-эксперт.',
    time: 'Аудит CSV',
    channel: 'Сайт',
  },
  {
    id: 'evt-2',
    source: 'Weekend Бильярд',
    sourceColor: '#0157a4',
    severity: 'warning',
    category: 'SEO',
    categoryType: 'seo',
    text: '<strong>4 страницы 404:</strong> /kontakty/, /dostavka/, /oplata/, /garantiya/. Canonical отсутствует. JSON-LD Schema отсутствует. robots.txt блокирует пагинацию.',
    time: 'Аудит CSV',
    channel: 'SEO',
  },
  {
    id: 'evt-3',
    source: 'Ф-ка «Старт»',
    sourceColor: '#A855F7',
    severity: 'warning',
    category: 'UX',
    categoryType: 'ux',
    text: 'Лучший <strong>конфигуратор бильярдного стола</strong> на рынке. Выбор игры, размера, материала, сукна → итоговая цена. Рассрочка «Сплит» без переплаты.',
    time: 'Аудит CSV',
    channel: 'Сайт',
  },
  {
    id: 'evt-4',
    source: '1000Cues',
    sourceColor: '#F97316',
    severity: 'info',
    category: 'Digital',
    categoryType: 'content',
    text: '<strong>3D-тур салона</strong> (единственный на рынке). Пожизненная гарантия Арисова. Скидка 10% на 2-й кий. Гравировка на заказ.',
    time: 'Аудит CSV',
    channel: 'Сайт',
  },
  {
    id: 'evt-5',
    source: 'Luza.ru',
    sourceColor: '#06B6D4',
    severity: 'warning',
    category: 'Контент',
    categoryType: 'content',
    text: 'Медиа-доминирование: <strong>37 900 YouTube, 670+ видео</strong>. Weekend: 655 подписчиков, 93 ролика. Отставание в 57 раз по охвату.',
    time: 'Аудит CSV',
    channel: 'YouTube',
  },
  {
    id: 'evt-6',
    source: 'Бильярд.ру',
    sourceColor: '#A855F7',
    severity: 'info',
    category: 'Структура',
    categoryType: 'seo',
    text: '2-е место аудита (<strong>24/40</strong>). Первый производитель в России (с 1990). Ручная работа, итальянский сланец. SEO: H1=акция, robots блокирует каталог.',
    time: 'Аудит CSV',
    channel: 'Сайт',
  },
  {
    id: 'evt-7',
    source: 'Бильярд №1',
    sourceColor: '#A855F7',
    severity: 'info',
    category: 'Сервис',
    categoryType: 'content',
    text: 'Рассрочка <strong>0-0-6 через 4 банка</strong>. 8000+ SKU, 2 фабрики. «Хочу скидку» + «Нашли дешевле». SEO: H1 отсутствует, плейсхолдеры CITY_PP.',
    time: 'Аудит CSV',
    channel: 'Сайт',
  },
  {
    id: 'evt-8',
    source: 'ESBShop',
    sourceColor: '#F97316',
    severity: 'info',
    category: 'Digital',
    categoryType: 'content',
    text: '<strong>Бауров + Сталев</strong> — амбассадоры. Подбор кия 99%, 3 года гарантии. Лучший cross-sell. Tilda — технологический тупик.',
    time: 'Аудит CSV',
    channel: 'Сайт',
  },
];

const channels = [
  {
    name: 'Сайты конкурентов',
    platform: 'google' as const,
    accounts: 21,
    postsTracked: 69,
    postsDelta: 'параметров',
    postsDeltaDir: 'up' as const,
    engagement: '22',
    engagementDelta: 'компаний',
    engagementDeltaDir: 'up' as const,
    fillPercent: 95,
    fillColor: 'linear-gradient(90deg, #4285F4, #34A853)',
  },
  {
    name: 'YouTube',
    platform: 'instagram' as const,
    accounts: 8,
    postsTracked: 1300,
    postsDelta: '+видео',
    postsDeltaDir: 'up' as const,
    engagement: '42K',
    engagementDelta: 'подписч.',
    engagementDeltaDir: 'up' as const,
    fillPercent: 72,
    fillColor: 'linear-gradient(90deg, #FF0000, #CC0000)',
  },
  {
    name: 'SEO-аудит',
    platform: 'yandex' as const,
    accounts: 22,
    postsTracked: 15,
    postsDelta: 'проблем',
    postsDeltaDir: 'up' as const,
    engagement: '10+',
    engagementDelta: '404',
    engagementDeltaDir: 'down' as const,
    fillPercent: 55,
    fillColor: '#FC3F1D',
  },
];

/* Heatmap data — конкуренты x аудит-категории */
const heatmapCompetitors = ['B-Group', 'Бильярд.ру', '1000Cues', 'Luza.ru', 'Бильярд №1', 'B-Prof', '8futов', 'Ф-ка Игра', 'Weekend'];
const heatmapDays = ['Покуп', 'Маркет', 'SEO', 'Прод', 'UX', 'Диз', 'Конт'];

// Audit subscores mapped to heatmap levels (0-5)
const heatmapData = [
  // Billiard-Group — лидер
  [[5,5,4,5,5,4,4], [4,5,5,5,4,4,5], [5,4,5,5,5,4,4], [5,5,4,5,5,4,5]],
  // Бильярд.ру
  [[4,4,3,4,4,4,4], [4,4,4,4,4,4,4], [5,4,4,4,4,4,4], [4,5,3,4,4,4,4]],
  // 1000Cues
  [[4,3,3,4,4,3,4], [4,4,3,4,4,4,3], [4,3,4,4,4,3,4], [5,4,3,4,4,3,3]],
  // Luza.ru
  [[3,4,4,3,3,4,5], [3,4,4,3,3,4,5], [3,3,4,3,3,4,5], [3,4,4,3,3,4,5]],
  // Бильярд №1
  [[4,3,2,4,4,3,3], [4,4,2,3,4,3,3], [4,3,3,3,4,3,3], [4,3,2,4,4,3,3]],
  // B-Prof
  [[3,4,3,3,3,3,4], [3,4,3,3,3,3,3], [3,4,3,3,3,3,4], [3,4,3,3,3,3,3]],
  // 8futов
  [[3,3,2,3,3,3,3], [3,4,2,3,3,3,3], [3,3,3,3,3,3,3], [3,4,2,3,3,3,3]],
  // Ф-ка Игра
  [[3,3,3,3,3,4,3], [3,4,3,3,3,4,3], [3,3,3,3,3,4,3], [3,3,3,3,3,4,3]],
  // Weekend
  [[2,2,1,2,2,2,3], [2,2,2,2,2,2,3], [2,2,1,2,2,2,3], [2,2,1,2,2,2,2]],
];

/* ============================================================
   RADAR SCAN COMPONENT (SVG-based)
   ============================================================ */

interface RadarTarget {
  id: string;
  name: string;
  angle: number;
  distance: number;
  color: string;
  size: number;
  threat: 'high' | 'medium' | 'low';
}

const radarTargets: RadarTarget[] = [
  { id: 'bg', name: 'Billiard-Group', angle: 30, distance: 0.25, color: '#FF3B30', size: 8, threat: 'high' },
  { id: 'bru', name: 'Бильярд.ру', angle: 70, distance: 0.35, color: '#FF9800', size: 7, threat: 'medium' },
  { id: '1kc', name: '1000Cues', angle: 110, distance: 0.40, color: '#FF9800', size: 6.5, threat: 'medium' },
  { id: 'luza', name: 'Luza', angle: 150, distance: 0.45, color: '#FF9800', size: 6, threat: 'medium' },
  { id: 'b1', name: 'Бильярд №1', angle: 190, distance: 0.45, color: '#FF9800', size: 6, threat: 'medium' },
  { id: 'bp', name: 'B-Prof', angle: 230, distance: 0.50, color: '#FF9800', size: 5.5, threat: 'medium' },
  { id: '8f', name: '8futов', angle: 260, distance: 0.55, color: '#FF9800', size: 5, threat: 'medium' },
  { id: 'fi', name: 'Ф-ка Игра', angle: 290, distance: 0.55, color: '#FF9800', size: 5, threat: 'medium' },
  { id: 'fs', name: 'Ф-ка Старт', angle: 320, distance: 0.65, color: '#00E676', size: 5, threat: 'low' },
  { id: 'ds', name: 'Дом Спорта', angle: 345, distance: 0.60, color: '#FF9800', size: 4.5, threat: 'medium' },
  { id: 'esb', name: 'ESBShop', angle: 15, distance: 0.60, color: '#FF9800', size: 4.5, threat: 'medium' },
  { id: 'bs', name: 'БС 1991', angle: 50, distance: 0.70, color: '#00E676', size: 4, threat: 'low' },
  { id: 'rpt', name: 'РуптуР', angle: 95, distance: 0.75, color: '#00E676', size: 4, threat: 'low' },
  { id: 'tp', name: 'TablePlay', angle: 135, distance: 0.75, color: '#00E676', size: 3.5, threat: 'low' },
  { id: 'bc', name: 'Б.Сити', angle: 170, distance: 0.70, color: '#00E676', size: 4, threat: 'low' },
  { id: 'av', name: 'Авелон', angle: 210, distance: 0.80, color: '#00E676', size: 3.5, threat: 'low' },
  { id: 'sl', name: 'Start-Line', angle: 240, distance: 0.80, color: '#00E676', size: 3.5, threat: 'low' },
  { id: 'be', name: 'B-Expert', angle: 275, distance: 0.80, color: '#00E676', size: 3, threat: 'low' },
  { id: 'bka', name: 'Б-дика', angle: 305, distance: 0.85, color: '#00E676', size: 3, threat: 'low' },
  { id: 'br', name: 'BilliRoom', angle: 335, distance: 0.85, color: '#00E676', size: 3, threat: 'low' },
  { id: 'tt', name: 'DFC', angle: 360, distance: 0.90, color: '#00E676', size: 2.5, threat: 'low' },
];

function RadarScan() {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 20;

  const [hovered, setHovered] = React.useState<RadarTarget | null>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  // Округляем до 2 знаков, чтобы избежать hydration mismatch из-за разницы Float в Node и V8
  const round = (val: number) => Math.round(val * 100) / 100;

  return (
    <div className={obs.radarContainer} style={{ width: '100%', aspectRatio: '1' }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circles */}
        {[0.25, 0.5, 0.75, 1.0].map((r, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={round(maxR * r)}
            fill="none"
            stroke="var(--border-default)"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
        ))}

        {/* Cross lines */}
        <line x1={cx} y1={cy - maxR} x2={cx} y2={cy + maxR} stroke="var(--border-default)" strokeOpacity="0.25" strokeWidth="1" />
        <line x1={cx - maxR} y1={cy} x2={cx + maxR} y2={cy} stroke="var(--border-default)" strokeOpacity="0.25" strokeWidth="1" />
        <line
          x1={round(cx - maxR * 0.707)} y1={round(cy - maxR * 0.707)}
          x2={round(cx + maxR * 0.707)} y2={round(cy + maxR * 0.707)}
          stroke="var(--border-subtle)" strokeOpacity="0.2" strokeWidth="1"
        />
        <line
          x1={round(cx + maxR * 0.707)} y1={round(cy - maxR * 0.707)}
          x2={round(cx - maxR * 0.707)} y2={round(cy + maxR * 0.707)}
          stroke="var(--border-subtle)" strokeOpacity="0.2" strokeWidth="1"
        />

        {/* Sweep cone */}
        <defs>
          <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(80,70,229,0)" />
            <stop offset="100%" stopColor="rgba(80,70,229,0.3)" />
          </linearGradient>
        </defs>
        <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'radarSweep 4s linear infinite', pointerEvents: 'none' }}>
          <path
            d={`M ${cx} ${cy} L ${cx} ${cy - maxR} A ${maxR} ${maxR} 0 0 1 ${round(cx + maxR * Math.sin(Math.PI / 6))} ${round(cy - maxR * Math.cos(Math.PI / 6))} Z`}
            fill="url(#sweepGrad)"
            opacity="0.6"
          />
          <line x1={cx} y1={cy} x2={cx} y2={cy - maxR} stroke="rgba(80,70,229,0.5)" strokeWidth="1.5" />
        </g>

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="4" fill="#0157a4" />
        <circle cx={cx} cy={cy} r="8" fill="none" stroke="rgba(1,87,164,0.3)" strokeWidth="1" />

        {/* Targets */}
        {radarTargets.map(target => {
          const rad = (target.angle * Math.PI) / 180;
          const tx = round(cx + maxR * target.distance * Math.sin(rad));
          const ty = round(cy - maxR * target.distance * Math.cos(rad));

          return (
            <g 
              key={target.id}
              style={{ cursor: 'crosshair' }}
              onMouseEnter={(e) => { setHovered(target); setPos({ x: e.clientX, y: e.clientY }); }}
              onMouseMove={(e) => { setPos({ x: e.clientX, y: e.clientY }); }}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Invisible larger circle for easier hovering */}
              <circle cx={tx} cy={ty} r={target.size + 15} fill="transparent" stroke="none" />
              <circle
                cx={tx}
                cy={ty}
                r={target.size + 4}
                fill="none"
                stroke={target.color}
                strokeWidth="1"
                opacity="0.3"
                style={{ animation: 'radarPing 3s ease-in-out infinite', animationDelay: `${target.angle * 10}ms` }}
              />
              <circle
                cx={tx}
                cy={ty}
                r={target.size}
                fill={target.color + '33'}
                stroke={target.color}
                strokeWidth="1.5"
              />
              <text
                x={tx}
                y={ty - target.size - 4}
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="7"
                fontFamily="Inter, sans-serif"
                pointerEvents="none"
              >
                {target.name}
              </text>
            </g>
          );
        })}

        {/* Zone labels */}
        <text x={cx + 4} y={cy - maxR * 0.25 + 4} fill="var(--text-muted)" fontSize="8" fontFamily="IBM Plex Mono, monospace" pointerEvents="none">БЛИЗКО</text>
        <text x={cx + 4} y={cy - maxR * 0.75 + 4} fill="var(--text-muted)" fontSize="8" fontFamily="IBM Plex Mono, monospace" pointerEvents="none">ДАЛЕКО</text>
      </svg>
      
      {/* Tooltip */}
      {hovered && (
        <div 
          className={obs.tooltip}
          style={{ 
            position: 'fixed',
            left: pos.x + 15,
            top: pos.y + 15,
            pointerEvents: 'none',
            zIndex: 9999
          }}
        >
          <div className={obs.tooltipTitle} style={{ color: hovered.color }}>{hovered.name}</div>
          <div className={obs.tooltipMeta}>Угроза: {hovered.threat.toUpperCase()}</div>
          <div className={obs.tooltipMeta}>Дистанция: {Math.round(hovered.distance * 100)}%</div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   FEED FILTER COMPONENT
   ============================================================ */

type FilterType = 'all' | 'critical' | 'seo' | 'ux' | 'content';

const filterLabels: Record<FilterType, string> = {
  all: 'Все',
  critical: 'Критичные',
  seo: 'SEO',
  ux: 'UX',
  content: 'Контент',
};

/* ============================================================
   PAGE COMPONENT
   ============================================================ */

export default function ObservatoryClient() {
  const [feedFilter, setFeedFilter] = React.useState<FilterType>('all');

  const filteredEvents = feedEvents.filter(evt => {
    if (feedFilter === 'all') return true;
    if (feedFilter === 'critical') return evt.severity === 'critical' || evt.severity === 'warning';
    return evt.categoryType === feedFilter;
  });

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
        <div className={obs.page}>

          <StyleSwitcher />

          {/* Header */}
          <div className={obs.header}>
            <div className={obs.headerLeft}>
              <h1 className={obs.pageTitle}>
                <IconTelescope size={28} className={obs.pageTitleIcon} />
                Обсерватория
              </h1>
              <p className={obs.pageSubtitle}>Мониторинг 21 конкурента · Аудит из CSV · Июнь 2026</p>
            </div>
            <div className={obs.headerActions}>
              <div className={obs.liveStatus} id="live-status">
                <span className={obs.liveDot} />
                LIVE
              </div>
              <button className={obs.actionBtn} id="btn-filter">
                <IconFilter size={14} /> Фильтры
              </button>
              <button className={obs.actionBtn} id="btn-refresh">
                <IconRefresh size={14} /> Обновить
              </button>
            </div>
          </div>

          {/* KPI Row */}
          <div className={obs.kpiRow} id="observatory-kpi">
            {kpiData.map((kpi, i) => (
              <div key={i} className={obs.kpiCard} id={`obs-kpi-${i}`}>
                <div className={obs.kpiHeader}>
                  <span className={obs.kpiIcon}>{kpi.icon}</span>
                  <span className={obs.kpiLabel}>{kpi.label}</span>
                </div>
                <div className={obs.kpiValue}>{kpi.value}</div>
                {kpi.direction !== 'stable' ? (
                  <span className={`${obs.kpiDelta} ${obs[kpi.direction]}`}>
                    {kpi.direction === 'up' ? <IconArrowUp size={12} /> : <IconArrowDown size={12} />}
                    {kpi.delta}
                  </span>
                ) : (
                  <span className={obs.kpiDelta} style={{ color: 'var(--text-muted)' }}>{kpi.delta}</span>
                )}
              </div>
            ))}
          </div>

          {/* Main Grid: Radar + Feed */}
          <div className={obs.mainGrid}>
            
            {/* Radar Scan */}
            <div className={obs.radarCard} id="radar-scan">
              <div className={obs.radarHeader}>
                <div className={obs.radarTitle}>
                  <IconRadar size={18} />
                  Радар угроз
                </div>
                <div className={obs.radarScanStatus}>21 целей</div>
              </div>
              <RadarScan />
              <div className={obs.radarLegend}>
                <div className={obs.radarLegendItem}>
                  <span className={obs.radarLegendDot} style={{ background: '#FF3B30' }} />
                  Высокая (1)
                </div>
                <div className={obs.radarLegendItem}>
                  <span className={obs.radarLegendDot} style={{ background: '#FF9800' }} />
                  Средняя (9)
                </div>
                <div className={obs.radarLegendItem}>
                  <span className={obs.radarLegendDot} style={{ background: '#00E676' }} />
                  Низкая (11)
                </div>
              </div>
            </div>

            {/* Feed / Timeline */}
            <div className={obs.feedCard} id="event-feed">
              <div className={obs.feedHeader}>
                <div className={obs.feedTitle}>
                  <IconActivity size={18} />
                  Лента событий (данные аудита)
                </div>
                <div className={obs.feedFilters}>
                  {(Object.keys(filterLabels) as FilterType[]).map(key => (
                    <button
                      key={key}
                      className={`${obs.feedFilterBtn} ${feedFilter === key ? obs.active : ''}`}
                      onClick={() => setFeedFilter(key)}
                      id={`filter-${key}`}
                    >
                      {filterLabels[key]}
                    </button>
                  ))}
                </div>
              </div>
              <div className={obs.feedList}>
                {filteredEvents.map((evt, i) => (
                  <div key={evt.id} className={obs.feedItem} id={`event-${evt.id}`}>
                    <div className={obs.feedTimeline}>
                      <div className={`${obs.feedDot} ${obs[evt.severity]}`} />
                      {i < filteredEvents.length - 1 && <div className={obs.feedLine} />}
                    </div>
                    <div className={obs.feedContent}>
                      <div className={obs.feedContentHeader}>
                        <span className={obs.feedSource}>
                          <span className={obs.feedSourceDot} style={{ background: evt.sourceColor }} />
                          {evt.source}
                        </span>
                        <span className={`${obs.feedCategory} ${obs[evt.categoryType]}`}>
                          {evt.category}
                        </span>
                      </div>
                      <div className={obs.feedText} dangerouslySetInnerHTML={{ __html: evt.text }} />
                      <div className={obs.feedMeta}>
                        <span className={obs.feedMetaItem}>
                          <IconClock size={12} /> {evt.time}
                        </span>
                        <span className={obs.feedMetaItem}>
                          <IconGlobe size={12} /> {evt.channel}
                        </span>
                        <span className={obs.feedMetaItem} style={{ marginLeft: 'auto', color: 'var(--accent-primary)', cursor: 'pointer' }}>
                          <IconExternalLink size={12} /> Детали
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Channels Monitoring */}
          <div className={obs.channelsGrid} id="channels-grid">
            {channels.map(ch => (
              <div key={ch.name} className={`${obs.channelCard} ${obs[ch.platform]}`} id={`channel-${ch.platform}`}>
                <div className={obs.channelHeader}>
                  <div className={obs.channelName}>
                    {ch.platform === 'instagram' && <IconCamera size={16} />}
                    {ch.platform === 'google' && <IconStar size={16} />}
                    {ch.platform === 'yandex' && <IconHash size={16} />}
                    {ch.name}
                  </div>
                  <div className={obs.channelStatus}>
                    <span className={obs.channelStatusDot} />
                    Мониторинг
                  </div>
                </div>
                <div className={obs.channelMetrics}>
                  <div className={obs.channelMetric}>
                    <span className={obs.channelMetricLabel}>Компаний</span>
                    <span className={obs.channelMetricValue}>{ch.accounts}</span>
                  </div>
                  <div className={obs.channelMetric}>
                    <span className={obs.channelMetricLabel}>Записей</span>
                    <span>
                      <span className={obs.channelMetricValue}>{ch.postsTracked}</span>
                      <span className={`${obs.channelMetricDelta} ${obs[ch.postsDeltaDir]}`}>{ch.postsDelta}</span>
                    </span>
                  </div>
                  <div className={obs.channelMetric}>
                    <span className={obs.channelMetricLabel}>Охват</span>
                    <span>
                      <span className={obs.channelMetricValue}>{ch.engagement}</span>
                      <span className={`${obs.channelMetricDelta} ${obs[ch.engagementDeltaDir]}`}>{ch.engagementDelta}</span>
                    </span>
                  </div>
                </div>
                <div className={obs.channelBar}>
                  <div
                    className={obs.channelBarFill}
                    style={{ width: `${ch.fillPercent}%`, background: ch.fillColor }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Activity Heatmap */}
          <div className={obs.heatmapCard} id="activity-heatmap">
            <div className={obs.heatmapTitle}>Карта компетенций конкурентов</div>
            <div className={obs.heatmapSubtitle}>Оценки по аудит-категориям · 4 среза</div>

            <div className={obs.heatmapGrid}>
              {heatmapCompetitors.map((comp, ci) => (
                <div key={comp} className={obs.heatmapRow}>
                  <div className={obs.heatmapLabel}>{comp}</div>
                  <div className={obs.heatmapCells}>
                    {heatmapData[ci].flat().map((level, di) => (
                      <div
                        key={di}
                        className={`${obs.heatmapCell} ${obs[`l${level}`]}`}
                        title={`${comp} — ${heatmapDays[di % 7]}: ${level}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={obs.heatmapDayLabels}>
              {Array.from({ length: 4 }).map((_, wi) => (
                <React.Fragment key={wi}>
                  {heatmapDays.map((day, di) => (
                    <span key={`${wi}-${di}`} className={obs.heatmapDayLabel}>
                      {wi === 0 ? day : ''}
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>

            <div className={obs.heatmapLegend}>
              <span>Слабо</span>
              {[0, 1, 2, 3, 4, 5].map(l => (
                <div key={l} className={`${obs.heatmapLegendCell} ${obs[`l${l}`]}`} />
              ))}
              <span>Сильно</span>
            </div>
          </div>

          {/* AI Prompt */}
          <div className={obs.aiPrompt} id="ai-prompt-observatory">
            <IconSparkles size={20} className={obs.aiPromptIcon} />
            <input
              type="text"
              className={obs.aiPromptInput}
              placeholder="Спроси AI-аналитика: «Какие SEO-проблемы у Billiard-Group?»"
              id="ai-observatory-input"
            />
            <button className={obs.aiPromptSend} id="ai-observatory-send">
              <IconSend size={18} />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
