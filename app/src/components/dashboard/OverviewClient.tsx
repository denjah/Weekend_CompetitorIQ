'use client';

import React from 'react';
import styles from '@/styles/layout.module.css';
import overviewStyles from '@/styles/overview.module.css';
import StyleSwitcher from '@/components/ui/StyleSwitcher';
import DatabaseTelemetry from '@/components/ui/DatabaseTelemetry';
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
   REAL DATA — 21 конкурент из CSV (69 параметров)
   ============================================================ */

const kpiData = [
  { icon: <IconChartBar size={18} />, label: 'Конкуренты', value: '21', delta: '+21', direction: 'up' as const, deltaLabel: 'из CSV' },
  { icon: <IconActivity size={18} />, label: 'Средний аудит', value: '15.5', delta: '/40', direction: 'stable' as const, deltaLabel: 'средний балл' },
  { icon: <IconAlertTriangle size={18} />, label: 'Угрозы (warning+)', value: '9', delta: '+1 critical', direction: 'up' as const, deltaLabel: '' },
  { icon: <IconTrendingUp size={18} />, label: 'Weekend UX', value: '4/10', delta: 'ниже рынка', direction: 'down' as const, deltaLabel: 'сред. 4.9' },
];

const competitorsTable = [
  { id: 'billiard-group', name: 'Billiard-Group', type: 'direct', typeLabel: 'Прямой', color: '#A855F7', auditScore: 26, uxScore: 8, designScore: 7, activity: 'high', activityLabel: 'Высокая', threat: 'critical', threatLabel: 'Критично' },
  { id: 'billiard-ru', name: 'Бильярд.ру', type: 'direct', typeLabel: 'Прямой', color: '#A855F7', auditScore: 24, uxScore: 7, designScore: 7, activity: 'medium', activityLabel: 'Средняя', threat: 'warning', threatLabel: 'Внимание' },
  { id: '1000cues', name: '1000Cues', type: 'niche', typeLabel: 'Нишевой', color: '#F97316', auditScore: 23, uxScore: 7, designScore: 6, activity: 'medium', activityLabel: 'Средняя', threat: 'warning', threatLabel: 'Внимание' },
  { id: 'luza', name: 'Luza.ru', type: 'indirect', typeLabel: 'Косвенный', color: '#06B6D4', auditScore: 20, uxScore: 6, designScore: 6.5, activity: 'high', activityLabel: 'Высокая', threat: 'warning', threatLabel: 'Внимание' },
  { id: 'billiard-1', name: 'Бильярд №1', type: 'direct', typeLabel: 'Прямой', color: '#A855F7', auditScore: 20, uxScore: 7, designScore: 6, activity: 'medium', activityLabel: 'Средняя', threat: 'warning', threatLabel: 'Внимание' },
  { id: 'billiard-prof', name: 'Billiard-Prof', type: 'direct', typeLabel: 'Прямой', color: '#A855F7', auditScore: 20, uxScore: 6, designScore: 5, activity: 'medium', activityLabel: 'Средняя', threat: 'warning', threatLabel: 'Внимание' },
  { id: '8futov', name: '8futов', type: 'direct', typeLabel: 'Прямой', color: '#A855F7', auditScore: 19, uxScore: 6, designScore: 5, activity: 'medium', activityLabel: 'Средняя', threat: 'warning', threatLabel: 'Внимание' },
  { id: 'fabrika-igra', name: 'Ф-ка «Игра»', type: 'indirect', typeLabel: 'Косвенный', color: '#06B6D4', auditScore: 19, uxScore: 5, designScore: 7, activity: 'medium', activityLabel: 'Средняя', threat: 'warning', threatLabel: 'Внимание' },
  { id: 'dom-sporta', name: 'Дом Спорта', type: 'indirect', typeLabel: 'Косвенный', color: '#06B6D4', auditScore: 18, uxScore: 5, designScore: 4, activity: 'low', activityLabel: 'Низкая', threat: 'warning', threatLabel: 'Внимание' },
  { id: 'esbshop', name: 'ESBShop', type: 'niche', typeLabel: 'Нишевой', color: '#F97316', auditScore: 18, uxScore: 4, designScore: 6, activity: 'medium', activityLabel: 'Средняя', threat: 'warning', threatLabel: 'Внимание' },
  { id: 'bs1991', name: 'БС 1991', type: 'direct', typeLabel: 'Прямой', color: '#A855F7', auditScore: 15, uxScore: 5, designScore: 4, activity: 'low', activityLabel: 'Низкая', threat: 'normal', threatLabel: 'Норма' },
  { id: 'billiard-city-real', name: 'Бильярд Сити', type: 'niche', typeLabel: 'Нишевой', color: '#F97316', auditScore: 15, uxScore: 4, designScore: 3, activity: 'low', activityLabel: 'Низкая', threat: 'normal', threatLabel: 'Норма' },
  { id: 'ruptur', name: 'РуптуР', type: 'direct', typeLabel: 'Прямой', color: '#A855F7', auditScore: 13, uxScore: 2, designScore: 5, activity: 'low', activityLabel: 'Низкая', threat: 'normal', threatLabel: 'Норма' },
  { id: 'tableplay', name: 'TablePlay', type: 'niche', typeLabel: 'Нишевой', color: '#F97316', auditScore: 12, uxScore: 5, designScore: 6, activity: 'low', activityLabel: 'Низкая', threat: 'normal', threatLabel: 'Норма' },
  { id: 'avelonsport', name: 'AvelonSport', type: 'indirect', typeLabel: 'Косвенный', color: '#06B6D4', auditScore: 11, uxScore: 4, designScore: 5, activity: 'low', activityLabel: 'Низкая', threat: 'normal', threatLabel: 'Норма' },
  { id: 'start-line', name: 'Start-Line', type: 'indirect', typeLabel: 'Косвенный', color: '#06B6D4', auditScore: 11, uxScore: 3, designScore: 4, activity: 'low', activityLabel: 'Низкая', threat: 'normal', threatLabel: 'Норма' },
  { id: 'fabrika-start', name: 'Ф-ка «Старт»', type: 'direct', typeLabel: 'Прямой', color: '#A855F7', auditScore: 10.5, uxScore: 8, designScore: 6, activity: 'high', activityLabel: 'Высокая', threat: 'normal', threatLabel: 'Норма' },
  { id: 'biliard-expert', name: 'Biliard-Expert', type: 'niche', typeLabel: 'Нишевой', color: '#F97316', auditScore: 10, uxScore: 5, designScore: 5, activity: 'low', activityLabel: 'Низкая', threat: 'normal', threatLabel: 'Норма' },
  { id: 'billiardika', name: 'Бильярдика', type: 'niche', typeLabel: 'Нишевой', color: '#F97316', auditScore: 9, uxScore: 2, designScore: 2, activity: 'low', activityLabel: 'Низкая', threat: 'normal', threatLabel: 'Норма' },
  { id: 'billiroom', name: 'BilliRoom', type: 'niche', typeLabel: 'Нишевой', color: '#F97316', auditScore: 9, uxScore: 2, designScore: 3, activity: 'low', activityLabel: 'Низкая', threat: 'normal', threatLabel: 'Норма' },
  { id: 'top-turnik', name: 'Top-Turnik/DFC', type: 'indirect', typeLabel: 'Косвенный', color: '#06B6D4', auditScore: 0, uxScore: 5, designScore: 5.5, activity: 'low', activityLabel: 'Низкая', threat: 'normal', threatLabel: 'Норма' },
];

const alerts = [
  { severity: 'critical' as const, title: 'Billiard-Group — лидер аудита (26/40), 15K SKU, 8-10 салонов', source: 'Billiard-Group', time: 'сегодня', action: 'Анализ' },
  { severity: 'warning' as const, title: 'Weekend: 4 страницы 404 (/kontakty/, /dostavka/, /oplata/, /garantiya/)', source: 'SEO-аудит', time: 'сегодня', action: 'Исправить' },
  { severity: 'warning' as const, title: 'Рассрочка отсутствует — есть у 4 конкурентов (при чеке 40-500K₽)', source: 'CSV-анализ', time: 'сегодня', action: 'Внедрить' },
  { severity: 'success' as const, title: 'Эксклюзив Rasson/Dynamic/Simonis/Viking — уникальное преимущество', source: 'Weekend', time: 'сегодня', action: 'Использовать' },
];

const navItems = [
  { id: 'overview', label: 'Overview', icon: <IconChartBar size={20} />, active: true },
  { id: 'graph', label: 'Граф связей', icon: <IconNetwork size={20} />, active: false },
  { id: 'observatory', label: 'Обсерватория', icon: <IconTelescope size={20} />, active: false },
  { id: 'insights', label: 'Инсайты', icon: <IconSparkles size={20} />, active: false },
];

const groups = [
  { label: 'Прямые конкуренты', count: 8, color: '#A855F7' },
  { label: 'Косвенные', count: 6, color: '#06B6D4' },
  { label: 'Нишевые', count: 7, color: '#F97316' },
];

/* ============================================================
   SCATTER CHART — Дизайн vs UX (реальные данные)
   ============================================================ */

interface MarketPoint {
  id: string;
  name: string;
  x: number;  // design score (1-10)
  y: number;  // ux score (1-10)
  r: number;  // audit score normalized
  color: string;
  isSelf?: boolean;
}

const marketData: MarketPoint[] = [
  { id: 'weekend', name: 'Weekend', x: 4, y: 4, r: 12, color: '#0157a4', isSelf: true },
  { id: 'bg', name: 'Billiard-Group', x: 7, y: 8, r: 26, color: '#A855F7' },
  { id: 'bru', name: 'Бильярд.ру', x: 7, y: 7, r: 24, color: '#A855F7' },
  { id: '1kc', name: '1000Cues', x: 6, y: 7, r: 23, color: '#F97316' },
  { id: 'luza', name: 'Luza', x: 6.5, y: 6, r: 20, color: '#06B6D4' },
  { id: 'b1', name: 'Бильярд №1', x: 6, y: 7, r: 20, color: '#A855F7' },
  { id: 'bp', name: 'Billiard-Prof', x: 5, y: 6, r: 20, color: '#A855F7' },
  { id: '8f', name: '8futов', x: 5, y: 6, r: 19, color: '#A855F7' },
  { id: 'fi', name: 'Ф-ка Игра', x: 7, y: 5, r: 19, color: '#06B6D4' },
  { id: 'fs', name: 'Ф-ка Старт', x: 6, y: 8, r: 11, color: '#A855F7' },
  { id: 'esb', name: 'ESBShop', x: 6, y: 4, r: 18, color: '#F97316' },
  { id: 'ds', name: 'Дом Спорта', x: 4, y: 5, r: 18, color: '#06B6D4' },
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

    const computed = getComputedStyle(document.documentElement);
    const gridColor = computed.getPropertyValue('--border-default').trim() || 'rgba(255,255,255,0.05)';
    const textSecondary = computed.getPropertyValue('--text-secondary').trim() || '#8E8E93';
    const textMuted = computed.getPropertyValue('--text-muted').trim() || '#55555C';
    const textPrimary = computed.getPropertyValue('--text-primary').trim() || '#FFFFFF';
    const fontBody = computed.getPropertyValue('--font-body').trim() || 'sans-serif';
    const fontMono = computed.getPropertyValue('--font-mono').trim() || 'monospace';

    const w = rect.width;
    const h = rect.height;
    const plotW = w - padding.left - padding.right;
    const plotH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i += 2) {
      const x = padding.left + (i / 10) * plotW;
      const y = padding.top + ((10 - i) / 10) * plotH;
      ctx.beginPath(); ctx.moveTo(x, padding.top); ctx.lineTo(x, padding.top + plotH); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(padding.left + plotW, y); ctx.stroke();
    }

    // Axis labels
    ctx.font = `10px ${fontMono}`;
    ctx.fillStyle = textMuted;
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
    ctx.font = `11px ${fontBody}`;
    ctx.fillStyle = textSecondary;
    ctx.textAlign = 'center';
    ctx.fillText('Оценка дизайна →', w / 2, h - 0);

    ctx.save();
    ctx.translate(12, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Оценка UX →', 0, 0);
    ctx.restore();

    // Points
    marketData.forEach(point => {
      const cx = padding.left + (point.x / 10) * plotW;
      const cy = padding.top + ((10 - point.y) / 10) * plotH;
      const radius = Math.max(6, point.r * 0.8);

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
      ctx.font = point.isSelf ? `bold 11px ${fontBody}` : `10px ${fontBody}`;
      ctx.fillStyle = point.isSelf ? textPrimary : textSecondary;
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
      const radius = Math.max(6, point.r * 0.8);
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
            Дизайн: {hoveredPoint.x}/10 · UX: {hoveredPoint.y}/10 · Аудит: {hoveredPoint.r}/40
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   RADAR CHART — Weekend vs Billiard-Group vs Ф-ка Старт
   ============================================================ */

interface RadarData {
  label: string;
  ours: number;
  competitor: number;
  competitor2: number;
}

const radarData: RadarData[] = [
  { label: 'UX', ours: 4.0, competitor: 8.0, competitor2: 8.0 },
  { label: 'Дизайн', ours: 4.0, competitor: 7.0, competitor2: 6.0 },
  { label: 'SEO', ours: 3.0, competitor: 6.0, competitor2: 2.5 },
  { label: 'Фильтрация', ours: 6.0, competitor: 8.0, competitor2: 7.0 },
  { label: 'Товар', ours: 8.0, competitor: 8.0, competitor2: 9.0 },
  { label: 'Аргументы', ours: 7.0, competitor: 8.0, competitor2: 8.0 },
  { label: 'Контент', ours: 5.0, competitor: 7.0, competitor2: 8.0 },
  { label: 'Сервис', ours: 7.0, competitor: 8.0, competitor2: 7.0 },
];

function RadarChart() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [hoveredAxis, setHoveredAxis] = React.useState<{ index: number, x: number, y: number } | null>(null);

  const drawRadar = React.useCallback((canvas: HTMLCanvasElement, hoverIndex: number | null) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const computed = getComputedStyle(document.documentElement);
    const gridColor = computed.getPropertyValue('--border-default').trim() || 'rgba(255,255,255,0.06)';
    const textSecondary = computed.getPropertyValue('--text-secondary').trim() || '#8E8E93';
    const textPrimary = computed.getPropertyValue('--text-primary').trim() || '#FFFFFF';
    const fontBody = computed.getPropertyValue('--font-body').trim() || 'sans-serif';

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.min(w, h) / 2 - 40;
    const axes = radarData.length;

    ctx.clearRect(0, 0, w, h);

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
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axis lines and labels
    ctx.font = `10px ${fontBody}`;
    ctx.fillStyle = textSecondary;
    ctx.textAlign = 'center';
    for (let i = 0; i < axes; i++) {
      const angle = (i / axes) * Math.PI * 2 - Math.PI / 2;
      const x1 = cx + maxR * Math.cos(angle);
      const y1 = cy + maxR * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = hoverIndex === i ? textPrimary : gridColor;
      ctx.lineWidth = hoverIndex === i ? 2 : 1;
      ctx.stroke();

      const labelX = cx + (maxR + 20) * Math.cos(angle);
      const labelY = cy + (maxR + 20) * Math.sin(angle);
      ctx.fillStyle = hoverIndex === i ? textPrimary : textSecondary;
      ctx.font = hoverIndex === i ? `bold 11px ${fontBody}` : `10px ${fontBody}`;
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

    // Competitor 2 (Ф-ка Старт) — behind
    drawPolygon(radarData.map(d => d.competitor2), '#00E676', false);
    // Competitor 1 (Billiard-Group) — middle
    drawPolygon(radarData.map(d => d.competitor), '#FF3B30', false);
    // Ours — front, with fill
    drawPolygon(radarData.map(d => d.ours), '#0157a4', true);

  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawRadar(canvas, hoveredAxis?.index ?? null);
    const observer = new ResizeObserver(() => drawRadar(canvas, hoveredAxis?.index ?? null));
    observer.observe(canvas.parentElement!);
    return () => observer.disconnect();
  }, [drawRadar, hoveredAxis]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const maxR = Math.min(rect.width, rect.height) / 2 - 40;
    
    const dist = Math.sqrt((x - cx)**2 + (y - cy)**2);
    if (dist > maxR + 30) {
      setHoveredAxis(null);
      return;
    }
    
    let angle = Math.atan2(y - cy, x - cx);
    let angleOffset = angle + Math.PI / 2;
    if (angleOffset < 0) angleOffset += Math.PI * 2;
    const axes = radarData.length;
    const slice = (Math.PI * 2) / axes;
    let closestIndex = Math.round(angleOffset / slice) % axes;
    if (closestIndex < 0) closestIndex += axes;
    
    setHoveredAxis({ index: closestIndex, x: e.clientX, y: e.clientY });
  };

  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', cursor: hoveredAxis ? 'pointer' : 'default' }} 
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredAxis(null)}
      />
      {hoveredAxis && (
        <div style={{
          position: 'fixed',
          left: hoveredAxis.x + 15,
          top: hoveredAxis.y + 15,
          background: '#1B1B22',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '8px',
          padding: '8px 12px',
          pointerEvents: 'none',
          zIndex: 100,
          whiteSpace: 'nowrap',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4, color: '#FFFFFF', fontSize: '12px' }}>
            {radarData[hoveredAxis.index].label}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 12px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: '#0157a4' }}>Weekend:</span> <span style={{ color: '#FFFFFF' }}>{radarData[hoveredAxis.index].ours}/10</span>
            <span style={{ color: '#FF3B30' }}>Billiard-Group:</span> <span style={{ color: '#FFFFFF' }}>{radarData[hoveredAxis.index].competitor}/10</span>
            <span style={{ color: '#00E676' }}>Ф-ка Старт:</span> <span style={{ color: '#FFFFFF' }}>{radarData[hoveredAxis.index].competitor2}/10</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   BAR CHART — Аудит-баллы (топ-12)
   ============================================================ */

function AuditBarChart() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const barData = [
    { name: 'B-Group', score: 26, color: '#A855F7' },
    { name: 'Б.ру', score: 24, color: '#A855F7' },
    { name: '1KCues', score: 23, color: '#F97316' },
    { name: 'Luza', score: 20, color: '#06B6D4' },
    { name: 'Б.№1', score: 20, color: '#A855F7' },
    { name: 'Б-Проф', score: 20, color: '#A855F7' },
    { name: '8futов', score: 19, color: '#A855F7' },
    { name: 'Ф.Игра', score: 19, color: '#06B6D4' },
    { name: 'ДомСп', score: 18, color: '#06B6D4' },
    { name: 'ESB', score: 18, color: '#F97316' },
    { name: 'Weekend', score: 12, color: '#0157a4' },
    { name: 'Ф.Старт', score: 10.5, color: '#A855F7' },
  ];

  const drawBars = React.useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const computed = getComputedStyle(document.documentElement);
    const gridColor = computed.getPropertyValue('--border-default').trim() || 'rgba(255,255,255,0.05)';
    const textMuted = computed.getPropertyValue('--text-muted').trim() || '#55555C';
    const fontMono = computed.getPropertyValue('--font-mono').trim() || 'monospace';

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 20, right: 20, bottom: 60, left: 40 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    ctx.clearRect(0, 0, w, h);

    const maxVal = 30;
    const barWidth = plotW / barData.length * 0.7;
    const gap = plotW / barData.length * 0.3;

    // Grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = pad.top + (i / 3) * plotH;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + plotW, y); ctx.stroke();
      ctx.font = `10px ${fontMono}`;
      ctx.fillStyle = textMuted;
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.round(maxVal - (i / 3) * maxVal)}`, pad.left - 8, y + 4);
    }

    // Bars
    barData.forEach((bar, i) => {
      const x = pad.left + i * (barWidth + gap) + gap / 2;
      const barH = (bar.score / maxVal) * plotH;
      const y = pad.top + plotH - barH;

      // Bar
      const gradient = ctx.createLinearGradient(x, y, x, pad.top + plotH);
      gradient.addColorStop(0, bar.color + 'CC');
      gradient.addColorStop(1, bar.color + '33');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]);
      ctx.fill();

      // Weekend highlight
      if (bar.name === 'Weekend') {
        ctx.strokeStyle = '#0157a4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]);
        ctx.stroke();
      }

      // Label
      ctx.font = '9px Inter, sans-serif';
      ctx.fillStyle = bar.name === 'Weekend' ? '#FFFFFF' : '#8E8E93';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.save();
      ctx.translate(x + barWidth / 2, pad.top + plotH + 8);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(bar.name, 0, 0);
      ctx.restore();

      // Score on top
      ctx.font = bar.name === 'Weekend' ? 'bold 10px IBM Plex Mono, monospace' : '10px IBM Plex Mono, monospace';
      ctx.fillStyle = bar.name === 'Weekend' ? '#0157a4' : '#8E8E93';
      ctx.textAlign = 'center';
      ctx.fillText(`${bar.score}`, x + barWidth / 2, y - 6);
    });
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawBars(canvas);
    const observer = new ResizeObserver(() => drawBars(canvas));
    observer.observe(canvas.parentElement!);
    return () => observer.disconnect();
  }, [drawBars]);

  return (
    <div style={{ width: '100%', height: '280px' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
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

        <div className={styles.sectionLabel}>Последние отчёты</div>
        <div className={styles.reportList}>
          <div className={styles.reportItem}>Аудит 22 конкурентов — 69 параметров</div>
          <div className={styles.reportItem}>SEO-проблемы рынка</div>
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

          <StyleSwitcher />

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
              <p className={overviewStyles.pageSubtitle}>Weekend Бильярд · Июнь 2026 · 69 параметров × 22 компании</p>
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
            {/* Scatter Plot — UX vs Дизайн */}
            <div className={overviewStyles.chartCard} id="chart-scatter">
              <div className={overviewStyles.chartTitle}>Рыночная позиция</div>
              <div className={overviewStyles.chartSubtitle}>Дизайн vs UX · Размер = аудит-балл</div>
              <div className={overviewStyles.chartContainer}>
                <ScatterChart />
              </div>
              <div className={overviewStyles.chartLegend}>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendDot} style={{ background: '#0157a4' }} /> Weekend
                </div>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendDot} style={{ background: '#A855F7' }} /> Прямые
                </div>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendDot} style={{ background: '#06B6D4' }} /> Косвенные
                </div>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendDot} style={{ background: '#F97316' }} /> Нишевые
                </div>
              </div>
            </div>

            {/* Radar Chart — Weekend vs Лидеры */}
            <div className={overviewStyles.chartCard} id="chart-radar">
              <div className={overviewStyles.chartTitle}>Профиль компетенций</div>
              <div className={overviewStyles.chartSubtitle}>Weekend vs Billiard-Group vs Ф-ка Старт</div>
              <div className={overviewStyles.chartContainer}>
                <RadarChart />
              </div>
              <div className={overviewStyles.chartLegend}>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendLine} style={{ background: '#0157a4', height: 3 }} /> Weekend
                </div>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendLine} style={{ background: '#FF3B30' }} /> Billiard-Group
                </div>
                <div className={overviewStyles.legendItem}>
                  <span className={overviewStyles.legendLine} style={{ background: '#00E676' }} /> Ф-ка Старт
                </div>
              </div>
            </div>

            {/* Bar Chart — Audit Scores */}
            <div className={overviewStyles.chartCard} id="chart-area">
              <div className={overviewStyles.chartTitle}>Рейтинг аудита конкурентов</div>
              <div className={overviewStyles.chartSubtitle}>Итого из 40 (Покупатель + Маркетолог + SEO + Продакт)</div>
              <div className={overviewStyles.chartContainer}>
                <AuditBarChart />
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
            <div className={overviewStyles.tableTitle}>Конкуренты · 21 компания</div>
            <div className={overviewStyles.tableWrapper}>
              <table className={overviewStyles.table}>
                <thead>
                  <tr>
                    <th>Конкурент</th>
                    <th>Тип</th>
                    <th>Аудит (/40)</th>
                    <th>UX (1–10)</th>
                    <th>Дизайн</th>
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
                      <td className={overviewStyles.priceCell}>
                        <strong>{comp.auditScore}</strong>
                      </td>
                      <td className={overviewStyles.ratingCell}>
                        {comp.uxScore}/10
                      </td>
                      <td className={overviewStyles.ratingCell}>
                        {comp.designScore}/10
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
              placeholder="Задай вопрос AI-аналитику... «Сравни SEO Weekend vs Billiard-Group»"
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
