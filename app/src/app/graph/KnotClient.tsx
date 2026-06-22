'use client';

import React, { useState } from 'react';
import styles from '@/styles/layout.module.css';
import knotStyles from '@/styles/knot.module.css';
import KnotGraph from '@/components/KnotGraph';
import DatabaseTelemetry from '@/components/ui/DatabaseTelemetry';
import {
  IconChartBar,
  IconNetwork,
  IconTelescope,
  IconSparkles,
  IconPlus,
  IconArrowUp,
  IconArrowDown,
  IconMinus,
  IconSend,
  IconShoppingBag,
} from '@/components/icons';

const navItems = [
  { id: 'overview', label: 'Overview', icon: <IconChartBar size={20} />, active: false },
  { id: 'graph', label: 'Граф связей', icon: <IconNetwork size={20} />, active: true },
  { id: 'observatory', label: 'Обсерватория', icon: <IconTelescope size={20} />, active: false },
  { id: 'insights', label: 'Инсайты', icon: <IconSparkles size={20} />, active: false },
  { id: 'ozon', label: 'Ozon Анализ', icon: <IconShoppingBag size={20} />, active: false },
];

const groups = [
  { label: 'Прямые конкуренты', count: 8, color: '#A855F7' },
  { label: 'Косвенные', count: 6, color: '#06B6D4' },
  { label: 'Нишевые', count: 7, color: '#F97316' },
];

export default function KnotClient({ graphData }: { graphData: unknown }) {
  const [selectedNode, setSelectedNode] = useState<unknown | null>(null);

  const getBadgeType = (type: string) => {
    switch (type) {
      case 'direct': return 'Прямой конкурент';
      case 'indirect': return 'Косвенный конкурент';
      case 'niche': return 'Нишевой конкурент';
      case 'self': return 'Ваш бизнес';
      case 'audience': return 'Аудитория';
      case 'platform': return 'Платформа';
      default: return type;
    }
  };

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
        <div className={knotStyles.page}>
          
          <KnotGraph data={graphData} onNodeSelect={setSelectedNode} />

          <div className={knotStyles.sidebarRight}>
            {!selectedNode ? (
              <div>
                <div className={knotStyles.infoPanelHeader}>
                  <div className={knotStyles.infoPanelTitle}>Сводка по сети</div>
                  <div className={knotStyles.infoPanelDate}>Обновлено: сегодня</div>
                </div>
                
                <div className={knotStyles.kpiGrid}>
                  <div className={knotStyles.kpiCard}>
                    <div className={knotStyles.kpiLabel}>Всего узлов</div>
                    <div className={knotStyles.kpiValue}>{graphData.nodes.length}</div>
                    <div className={knotStyles.kpiDelta}>
                      Без изменений
                    </div>
                  </div>
                  <div className={knotStyles.kpiCard}>
                    <div className={knotStyles.kpiLabel}>Плотность связей</div>
                    <div className={knotStyles.kpiValue}>{graphData.links.length}</div>
                    <div className={knotStyles.kpiDelta + ' ' + knotStyles.positive}>
                      <IconArrowUp size={12} /> +2 за неделю
                    </div>
                  </div>
                </div>

                <div className={knotStyles.aiInsight}>
                  <div className={knotStyles.aiInsightTitle}>
                    <IconSparkles size={16} color="var(--accent-primary)" /> AI Инсайт
                  </div>
                  <div className={knotStyles.aiInsightText}>
                    <strong>Billiard-Group</strong> (26/40) — абсолютный лидер рынка. 15K SKU, 8–10 салонов. <strong>Ф-ка Старт</strong> — лучший конфигуратор. <strong>Luza.ru</strong> — медиа-доминирование (37.9K YouTube). Weekend (12/40) — в нижней трети.
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className={knotStyles.infoPanelHeader}>
                  <div className={knotStyles.infoPanelType}>
                    <span style={{ color: selectedNode.color, marginRight: 6 }}>●</span>
                    {getBadgeType(selectedNode.type)}
                  </div>
                  <div className={knotStyles.infoPanelTitle}>{selectedNode.name}</div>
                  <div className={knotStyles.infoPanelDate}>Мониторинг с: Янв 2026</div>
                </div>
                
                {selectedNode.type !== 'platform' && selectedNode.type !== 'audience' && (
                  <button className={knotStyles.infoPanelBtn}>
                    📊 Полный профиль →
                  </button>
                )}

                {selectedNode.auditScore != null && (
                  <div className={knotStyles.sentimentBlock}>
                    <div className={knotStyles.sentimentTitle}>Аудит-балл</div>
                    <div className={knotStyles.sentimentBar}>
                      <div className={knotStyles.sentimentFill} style={{ width: `${(selectedNode.auditScore / 40) * 100}%` }} />
                    </div>
                    <div className={knotStyles.sentimentStats}>
                      <span>{selectedNode.auditScore} / 40</span>
                    </div>
                  </div>
                )}

                {selectedNode.auditScore != null && (
                  <div className={knotStyles.kpiGrid}>
                    <div className={knotStyles.kpiCard}>
                      <div className={knotStyles.kpiLabel}>Группа</div>
                      <div className={knotStyles.kpiValue}>{selectedNode.group ?? '—'}</div>
                    </div>
                    <div className={knotStyles.kpiCard}>
                      <div className={knotStyles.kpiLabel}>Размер</div>
                      <div className={knotStyles.kpiValue}>{selectedNode.size ?? '—'}</div>
                    </div>
                  </div>
                )}

                {selectedNode.id === 'billiard-group' && (
                  <div className={knotStyles.aiInsight}>
                    <div className={knotStyles.aiInsightTitle}>
                      <IconSparkles size={16} color="var(--accent-primary)" /> AI Инсайт
                    </div>
                    <div className={knotStyles.aiInsightText}>
                      Billiard-Group — лидер рынка (26/40). 15K SKU, 300 брендов. Уязвимость: устаревший дизайн. Weekend может атаковать через современный UX.
                    </div>
                  </div>
                )}

                <div className={knotStyles.aiPrompt}>
                  <input
                    type="text"
                    className={knotStyles.aiPromptInput}
                    placeholder={`💬 Спроси про ${selectedNode.name}...`}
                  />
                  <button className={knotStyles.aiPromptBtn}>
                    <IconSend size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

