'use client';

import React from 'react';
import styles from '@/styles/layout.module.css';
import obs from '@/styles/observatory.module.css';
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
} from '@/components/icons';

/* ============================================================
   NAV & GROUPS (same as other pages)
   ============================================================ */

const navItems = [
  { id: 'overview', label: 'Overview', icon: <IconChartBar size={20} />, active: false },
  { id: 'graph', label: 'Граф связей', icon: <IconNetwork size={20} />, active: false },
  { id: 'observatory', label: 'Обсерватория', icon: <IconTelescope size={20} />, active: true },
  { id: 'insights', label: 'Инсайты', icon: <IconSparkles size={20} />, active: false },
];

const groups = [
  { label: 'Прямые конкуренты', count: 3, color: '#A855F7' },
  { label: 'Косвенные', count: 1, color: '#06B6D4' },
  { label: 'Потенциальные', count: 1, color: '#F97316' },
];

/* ============================================================
   MOCK DATA — Observatory
   ============================================================ */

const kpiData = [
  { icon: <IconEye size={16} />, label: 'Под наблюдением', value: '5', delta: '+2', direction: 'up' as const },
  { icon: <IconActivity size={16} />, label: 'Событий / 24ч', value: '47', delta: '+12', direction: 'up' as const },
  { icon: <IconZap size={16} />, label: 'Критичных', value: '3', delta: '+1', direction: 'up' as const },
  { icon: <IconGlobe size={16} />, label: 'Каналов', value: '12', delta: '0', direction: 'stable' as const },
  { icon: <IconClock size={16} />, label: 'Последний скан', value: '2м', delta: 'назад', direction: 'stable' as const },
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
    source: 'Pool Hall Pro',
    sourceColor: '#A855F7',
    severity: 'critical',
    category: 'Цены',
    categoryType: 'price',
    text: 'Снижение цены на вечернее время с <strong>950₽</strong> до <strong>800₽/час</strong>. Это на 15.8% ниже вашей текущей цены.',
    time: '12 мин назад',
    channel: 'Сайт',
  },
  {
    id: 'evt-2',
    source: 'Shark Lounge',
    sourceColor: '#A855F7',
    severity: 'warning',
    category: 'Маркетинг',
    categoryType: 'marketing',
    text: 'Запущена таргетированная реклама в Instagram. Бюджет оценивается в <strong>50-80K₽/мес</strong>. Фокус на аудиторию 25-35.',
    time: '1 час назад',
    channel: 'Instagram',
  },
  {
    id: 'evt-3',
    source: 'Pool Hall Pro',
    sourceColor: '#A855F7',
    severity: 'info',
    category: 'Соцсети',
    categoryType: 'social',
    text: 'Новая публикация: "Летний турнир по пулу — призовой фонд 100 000₽". <strong>342 лайка, 67 комментариев</strong> за 3 часа.',
    time: '3 часа назад',
    channel: 'Instagram',
  },
  {
    id: 'evt-4',
    source: 'Бильярд-Сити',
    sourceColor: '#A855F7',
    severity: 'warning',
    category: 'Продукт',
    categoryType: 'product',
    text: 'Обновлена страница на 2GIS — добавлены новые фото интерьера и <strong>бар-меню</strong>. Акцент на премиум-атмосферу.',
    time: '5 часов назад',
    channel: '2GIS',
  },
  {
    id: 'evt-5',
    source: 'Кий-Клуб «Динамо»',
    sourceColor: '#F97316',
    severity: 'success',
    category: 'Отзывы',
    categoryType: 'review',
    text: 'Негативный отзыв: "Столы давно не перетягивали, кии кривые". Рейтинг <strong>снизился до 3.8</strong>.',
    time: '8 часов назад',
    channel: 'Google Maps',
  },
  {
    id: 'evt-6',
    source: 'Lucky Shot',
    sourceColor: '#06B6D4',
    severity: 'neutral',
    category: 'Активность',
    categoryType: 'activity',
    text: 'Низкая активность — последний пост в Instagram <strong>3 недели назад</strong>. Возможно, сокращение маркетинг-бюджета.',
    time: '1 день назад',
    channel: 'Instagram',
  },
  {
    id: 'evt-7',
    source: 'Shark Lounge',
    sourceColor: '#A855F7',
    severity: 'warning',
    category: 'Цены',
    categoryType: 'price',
    text: 'Запуск программы лояльности: <strong>каждый 5-й час бесплатно</strong>. Прямая угроза удержанию клиентов.',
    time: '1 день назад',
    channel: 'Telegram',
  },
  {
    id: 'evt-8',
    source: 'Pool Hall Pro',
    sourceColor: '#A855F7',
    severity: 'info',
    category: 'Маркетинг',
    categoryType: 'marketing',
    text: 'Обновлён дизайн сайта. Добавлена <strong>онлайн-бронирование</strong> и <strong>виртуальный тур</strong>.',
    time: '2 дня назад',
    channel: 'Сайт',
  },
];

const channels = [
  {
    name: 'Instagram',
    platform: 'instagram' as const,
    accounts: 5,
    postsTracked: 127,
    postsDelta: '+18',
    postsDeltaDir: 'up' as const,
    engagement: '3.2K',
    engagementDelta: '+24%',
    engagementDeltaDir: 'up' as const,
    fillPercent: 78,
    fillColor: 'linear-gradient(90deg, #833AB4, #FD1D1D, #F77737)',
  },
  {
    name: 'Google Maps',
    platform: 'google' as const,
    accounts: 5,
    postsTracked: 43,
    postsDelta: '+5',
    postsDeltaDir: 'up' as const,
    engagement: '89',
    engagementDelta: '+12%',
    engagementDeltaDir: 'up' as const,
    fillPercent: 52,
    fillColor: 'linear-gradient(90deg, #4285F4, #34A853)',
  },
  {
    name: 'Яндекс Карты',
    platform: 'yandex' as const,
    accounts: 4,
    postsTracked: 31,
    postsDelta: '+3',
    postsDeltaDir: 'up' as const,
    engagement: '67',
    engagementDelta: '-8%',
    engagementDeltaDir: 'down' as const,
    fillPercent: 38,
    fillColor: '#FC3F1D',
  },
];

/* Heatmap data — competitors x days */
const heatmapCompetitors = ['Pool Hall Pro', 'Shark Lounge', 'Бильярд-Сити', 'Кий-Клуб', 'Lucky Shot'];
const heatmapDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

// Pre-generated activity levels (0-5) for each competitor per day of the past 4 weeks
const heatmapData = [
  // Pool Hall Pro — very active
  [[4,3,5,2,4,5,3], [3,5,4,3,5,4,2], [5,4,3,5,4,5,4], [4,5,5,3,4,5,3]],
  // Shark Lounge — moderately active
  [[2,3,2,1,3,4,2], [3,2,3,2,4,3,1], [2,4,3,3,2,4,3], [3,3,4,2,3,4,2]],
  // Бильярд-Сити — average
  [[1,2,1,0,2,3,1], [2,1,2,1,3,2,0], [1,3,2,2,1,3,2], [2,2,3,1,2,3,1]],
  // Кий-Клуб — burst activity
  [[0,0,1,0,0,1,0], [0,1,0,0,1,0,0], [4,5,4,5,4,5,4], [3,4,3,4,5,4,3]],
  // Lucky Shot — low
  [[0,0,0,0,1,0,0], [0,0,1,0,0,0,0], [0,0,0,0,0,1,0], [0,0,0,0,1,0,0]],
];

/* ============================================================
   RADAR SCAN COMPONENT (SVG-based)
   ============================================================ */

interface RadarTarget {
  id: string;
  name: string;
  angle: number;  // degrees
  distance: number;  // 0-1 from center
  color: string;
  size: number;
  threat: 'high' | 'medium' | 'low';
}

const radarTargets: RadarTarget[] = [
  { id: 'php', name: 'Pool Hall Pro', angle: 45, distance: 0.35, color: '#FF3B30', size: 7, threat: 'high' },
  { id: 'sl', name: 'Shark Lounge', angle: 150, distance: 0.55, color: '#FF9800', size: 6, threat: 'medium' },
  { id: 'bc', name: 'Бильярд-Сити', angle: 210, distance: 0.6, color: '#FF9800', size: 5, threat: 'medium' },
  { id: 'kc', name: 'Кий-Клуб', angle: 300, distance: 0.75, color: '#00E676', size: 4, threat: 'low' },
  { id: 'ls', name: 'Lucky Shot', angle: 350, distance: 0.85, color: '#00E676', size: 3.5, threat: 'low' },
];

function RadarScan() {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 20;

  return (
    <div className={obs.radarContainer} style={{ maxWidth: size, aspectRatio: '1' }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circles */}
        {[0.25, 0.5, 0.75, 1.0].map((r, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={maxR * r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Cross lines */}
        <line x1={cx} y1={cy - maxR} x2={cx} y2={cy + maxR} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line x1={cx - maxR} y1={cy} x2={cx + maxR} y2={cy} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line
          x1={cx - maxR * 0.707} y1={cy - maxR * 0.707}
          x2={cx + maxR * 0.707} y2={cy + maxR * 0.707}
          stroke="rgba(255,255,255,0.03)" strokeWidth="1"
        />
        <line
          x1={cx + maxR * 0.707} y1={cy - maxR * 0.707}
          x2={cx - maxR * 0.707} y2={cy + maxR * 0.707}
          stroke="rgba(255,255,255,0.03)" strokeWidth="1"
        />

        {/* Sweep cone */}
        <defs>
          <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(80,70,229,0)" />
            <stop offset="100%" stopColor="rgba(80,70,229,0.3)" />
          </linearGradient>
        </defs>
        <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'radarSweep 4s linear infinite' }}>
          <path
            d={`M ${cx} ${cy} L ${cx} ${cy - maxR} A ${maxR} ${maxR} 0 0 1 ${cx + maxR * Math.sin(Math.PI / 6)} ${cy - maxR * Math.cos(Math.PI / 6)} Z`}
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
          const tx = cx + maxR * target.distance * Math.sin(rad);
          const ty = cy - maxR * target.distance * Math.cos(rad);

          return (
            <g key={target.id}>
              {/* Ping animation ring */}
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
              {/* Target dot */}
              <circle
                cx={tx}
                cy={ty}
                r={target.size}
                fill={target.color + '33'}
                stroke={target.color}
                strokeWidth="1.5"
              />
              {/* Label */}
              <text
                x={tx}
                y={ty - target.size - 6}
                textAnchor="middle"
                fill="#8E8E93"
                fontSize="9"
                fontFamily="Inter, sans-serif"
              >
                {target.name}
              </text>
            </g>
          );
        })}

        {/* Zone labels */}
        <text x={cx + 4} y={cy - maxR * 0.25 + 4} fill="#55555C" fontSize="8" fontFamily="IBM Plex Mono, monospace">БЛИЗКО</text>
        <text x={cx + 4} y={cy - maxR * 0.75 + 4} fill="#55555C" fontSize="8" fontFamily="IBM Plex Mono, monospace">ДАЛЕКО</text>
      </svg>
    </div>
  );
}

/* ============================================================
   FEED FILTER COMPONENT
   ============================================================ */

type FilterType = 'all' | 'critical' | 'price' | 'marketing' | 'social';

const filterLabels: Record<FilterType, string> = {
  all: 'Все',
  critical: 'Критичные',
  price: 'Цены',
  marketing: 'Маркетинг',
  social: 'Соцсети',
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

          {/* Header */}
          <div className={obs.header}>
            <div className={obs.headerLeft}>
              <h1 className={obs.pageTitle}>
                <IconTelescope size={28} className={obs.pageTitleIcon} />
                Обсерватория
              </h1>
              <p className={obs.pageSubtitle}>Мониторинг конкурентов в реальном времени · Июнь 2026</p>
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
                  <span className={obs.kpiDelta} style={{ color: 'var(--text-muted)' }}>{kpi.delta} {kpi.value === '2м' ? '' : ''}</span>
                )}
              </div>
            ))}
          </div>

          {/* Main Grid: Radar + Feed */}
          <div className={obs.mainGrid}>
            {/* Feed / Timeline */}
            <div className={obs.feedCard} id="event-feed">
              <div className={obs.feedHeader}>
                <div className={obs.feedTitle}>
                  <IconActivity size={18} />
                  Лента событий
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

            {/* Radar Scan */}
            <div className={obs.radarCard} id="radar-scan">
              <div className={obs.radarHeader}>
                <div className={obs.radarTitle}>
                  <IconRadar size={18} />
                  Радар угроз
                </div>
                <div className={obs.radarScanStatus}>SCAN: 00:02:14</div>
              </div>
              <RadarScan />
              <div className={obs.radarLegend}>
                <div className={obs.radarLegendItem}>
                  <span className={obs.radarLegendDot} style={{ background: '#FF3B30' }} />
                  Высокая
                </div>
                <div className={obs.radarLegendItem}>
                  <span className={obs.radarLegendDot} style={{ background: '#FF9800' }} />
                  Средняя
                </div>
                <div className={obs.radarLegendItem}>
                  <span className={obs.radarLegendDot} style={{ background: '#00E676' }} />
                  Низкая
                </div>
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
                    <span className={obs.channelMetricLabel}>Аккаунтов</span>
                    <span className={obs.channelMetricValue}>{ch.accounts}</span>
                  </div>
                  <div className={obs.channelMetric}>
                    <span className={obs.channelMetricLabel}>Записей отслежено</span>
                    <span>
                      <span className={obs.channelMetricValue}>{ch.postsTracked}</span>
                      <span className={`${obs.channelMetricDelta} ${obs[ch.postsDeltaDir]}`}>{ch.postsDelta}</span>
                    </span>
                  </div>
                  <div className={obs.channelMetric}>
                    <span className={obs.channelMetricLabel}>Engagement</span>
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
            <div className={obs.heatmapTitle}>Карта активности конкурентов</div>
            <div className={obs.heatmapSubtitle}>Последние 4 недели · По дням недели</div>

            <div className={obs.heatmapGrid}>
              {heatmapCompetitors.map((comp, ci) => (
                <div key={comp} className={obs.heatmapRow}>
                  <div className={obs.heatmapLabel}>{comp}</div>
                  <div className={obs.heatmapCells}>
                    {heatmapData[ci].flat().map((level, di) => (
                      <div
                        key={di}
                        className={`${obs.heatmapCell} ${obs[`l${level}`]}`}
                        title={`${comp} — ${heatmapDays[di % 7]}: ${level} событий`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={obs.heatmapDayLabels}>
              {/* 4 weeks x 7 days labels */}
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
              <span>Мало</span>
              {[0, 1, 2, 3, 4, 5].map(l => (
                <div key={l} className={`${obs.heatmapLegendCell} ${obs[`l${l}`]}`} />
              ))}
              <span>Много</span>
            </div>
          </div>

          {/* AI Prompt */}
          <div className={obs.aiPrompt} id="ai-prompt-observatory">
            <IconSparkles size={20} className={obs.aiPromptIcon} />
            <input
              type="text"
              className={obs.aiPromptInput}
              placeholder="Спроси AI-аналитика: «Что изменилось у Pool Hall Pro за последнюю неделю?»"
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
