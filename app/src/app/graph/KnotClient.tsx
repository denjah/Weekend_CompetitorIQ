'use client';

import React, { useState } from 'react';
import styles from '@/styles/layout.module.css';
import knotStyles from '@/styles/knot.module.css';
import KnotGraph from '@/components/KnotGraph';
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
} from '@/components/icons';

const navItems = [
  { id: 'overview', label: 'Overview', icon: <IconChartBar size={20} />, active: false },
  { id: 'graph', label: 'Граф связей', icon: <IconNetwork size={20} />, active: true },
  { id: 'observatory', label: 'Обсерватория', icon: <IconTelescope size={20} />, active: false },
  { id: 'insights', label: 'Инсайты', icon: <IconSparkles size={20} />, active: false },
];

const groups = [
  { label: 'Прямые конкуренты', count: 3, color: '#A855F7' },
  { label: 'Косвенные', count: 1, color: '#06B6D4' },
  { label: 'Потенциальные', count: 1, color: '#F97316' },
];

export default function KnotClient({ graphData }: { graphData: any }) {
  const [selectedNode, setSelectedNode] = useState<any | null>(null);

  const getBadgeType = (type: string) => {
    switch (type) {
      case 'direct': return 'Прямой конкурент';
      case 'indirect': return 'Косвенный конкурент';
      case 'potential': return 'Потенциальный конкурент';
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
                    Обнаружена сильная ценовая конкуренция с <strong>Pool Hall Pro</strong>. Рекомендуется обратить внимание на аудиторию студентов, где активность <strong>Lucky Shot</strong> растёт быстрее обычного.
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

                {selectedNode.rating && (
                  <div className={knotStyles.sentimentBlock}>
                    <div className={knotStyles.sentimentTitle}>Sentiment Rate</div>
                    <div className={knotStyles.sentimentBar}>
                      <div className={knotStyles.sentimentFill} style={{ width: `${(selectedNode.rating / 5) * 100}%` }} />
                    </div>
                    <div className={knotStyles.sentimentStats}>
                      <span>{selectedNode.rating} / 5.0</span>
                      <span className={knotStyles.sentimentPositive}>↑ +4%</span>
                    </div>
                  </div>
                )}

                {(selectedNode.rating || selectedNode.price) && (
                  <div className={knotStyles.kpiGrid}>
                    <div className={knotStyles.kpiCard}>
                      <div className={knotStyles.kpiLabel}>Рейтинг</div>
                      <div className={knotStyles.kpiValue}>{selectedNode.rating || '—'} ⭐</div>
                      <div className={knotStyles.kpiDelta + ' ' + knotStyles.positive}>
                        <IconArrowUp size={12} /> +0.2
                      </div>
                    </div>
                    <div className={knotStyles.kpiCard}>
                      <div className={knotStyles.kpiLabel}>Цена/час</div>
                      <div className={knotStyles.kpiValue}>{selectedNode.price ? `${selectedNode.price} ₽` : '—'}</div>
                      <div className={knotStyles.kpiDelta + ' ' + knotStyles.negative}>
                        <IconArrowDown size={12} /> -15%
                      </div>
                    </div>
                  </div>
                )}

                {selectedNode.id === 'pool-hall-pro' && (
                  <div className={knotStyles.aiInsight}>
                    <div className={knotStyles.aiInsightTitle}>
                      <IconSparkles size={16} color="var(--accent-primary)" /> AI Инсайт
                    </div>
                    <div className={knotStyles.aiInsightText}>
                      Pool Hall Pro активно демпингует: -15% за месяц. При сохранении тренда потеря 8-12% клиентов в сегменте «вечерние часы».
                      <br/><br/>
                      Рекомендация: Акцент на premium-сегмент и доп. услуги (bar, events).
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
