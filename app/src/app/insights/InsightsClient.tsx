'use client';

import React from 'react';
import styles from '@/styles/layout.module.css';
import ins from '@/styles/insights.module.css';
import {
  IconChartBar,
  IconNetwork,
  IconTelescope,
  IconSparkles,
  IconPlus,
  IconSend,
  IconRobot,
  IconAlertTriangle,
  IconRocket,
  IconTrendingUp,
  IconLightbulb,
  IconCrystalBall,
  IconScale,
  IconTarget,
  IconFileText,
  IconDownload,
  IconShare2,
  IconCopy,
  IconBookmark,
  IconCheck,
  IconChevronRight,
  IconArrowUp,
} from '@/components/icons';

/* ============================================================
   NAV & GROUPS (same as other pages)
   ============================================================ */

const navItems = [
  { id: 'overview', label: 'Overview', icon: <IconChartBar size={20} />, active: false },
  { id: 'graph', label: 'Граф связей', icon: <IconNetwork size={20} />, active: false },
  { id: 'observatory', label: 'Обсерватория', icon: <IconTelescope size={20} />, active: false },
  { id: 'insights', label: 'Инсайты', icon: <IconSparkles size={20} />, active: true },
];

const groups = [
  { label: 'Прямые конкуренты', count: 3, color: '#A855F7' },
  { label: 'Косвенные', count: 1, color: '#06B6D4' },
  { label: 'Потенциальные', count: 1, color: '#F97316' },
];

/* ============================================================
   MOCK DATA — AI Chat Messages
   ============================================================ */

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: string;
  recommendations?: string[];
}

const initialMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    text: 'Какие главные угрозы от Pool Hall Pro в следующем квартале?',
    time: '14:32',
  },
  {
    id: 'msg-2',
    role: 'ai',
    text: 'На основе анализа данных за последние 90 дней выделяю <strong>3 ключевые угрозы</strong>:\n\n<strong>1. Ценовой демпинг (-15.8%)</strong>\nPool Hall Pro снизил стоимость вечерних часов до 800₽. Это ниже вашей цены на 12%.\n\n<strong>2. Рекламная экспансия</strong>\nЗапущено 3 новых таргетированных кампании в Instagram с бюджетом ~150K₽/мес.\n\n<strong>3. Рост рейтинга (+0.2 за месяц)</strong>\nОтмечена программа сбора отзывов — +12 отзывов на Google Maps.',
    time: '14:33',
    recommendations: [
      'Акцент на premium-сегмент и уникальные услуги',
      'Запуск программы лояльности для удержания постоянных клиентов',
      'Расширение доп. услуг (bar, events, leagues)',
    ],
  },
  {
    id: 'msg-3',
    role: 'user',
    text: 'Сравни наши цены по всем категориям с топ-3 конкурентами',
    time: '14:35',
  },
  {
    id: 'msg-4',
    role: 'ai',
    text: '<strong>Ценовой анализ: Weekend Бильярд vs Топ-3 конкурента</strong>\n\n<strong>Дневное время (до 17:00):</strong>\n• Weekend: 600₽/час — <strong>среднее по рынку</strong>\n• Pool Hall Pro: 550₽ (-8.3%)\n• Shark Lounge: 650₽ (+8.3%)\n• Бильярд-Сити: 600₽ (=)\n\n<strong>Вечернее время (после 17:00):</strong>\n• Weekend: 900₽/час — <strong>выше среднего на 5%</strong>\n• Pool Hall Pro: 800₽ (-11.1%)\n• Shark Lounge: 950₽ (+5.5%)\n• Бильярд-Сити: 850₽ (-5.5%)\n\n<strong>Выходные:</strong>\n• Weekend: 1000₽/час — <strong>на уровне рынка</strong>\n• Pool Hall Pro: 950₽ (-5%)\n• Shark Lounge: 1100₽ (+10%)\n• Бильярд-Сити: 1000₽ (=)',
    time: '14:36',
    recommendations: [
      'Оптимальная точка вечерней цены: 850₽/час',
      'Увеличить спред между днём и вечером для стимуляции дневного потока',
    ],
  },
];

/* ============================================================
   MOCK DATA — Insight Cards
   ============================================================ */

type InsightType = 'threat' | 'opportunity' | 'trend' | 'recommendation' | 'forecast' | 'comparison';

interface InsightCard {
  id: string;
  type: InsightType;
  typeLabel: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  impactLabel: string;
  confidence: number;
  date: string;
}

const insightCards: InsightCard[] = [
  {
    id: 'ins-1',
    type: 'threat',
    typeLabel: 'Угроза',
    icon: <IconAlertTriangle size={14} />,
    title: 'Ценовое давление усиливается',
    description: 'Pool Hall Pro и Бильярд-Сити снизили цены на 10-15%. Ваша позиция под давлением в сегменте «вечерние часы».',
    impact: 'high',
    impactLabel: 'Высокое',
    confidence: 87,
    date: 'Сегодня',
  },
  {
    id: 'ins-2',
    type: 'opportunity',
    typeLabel: 'Возможность',
    icon: <IconRocket size={14} />,
    title: 'Рынок корпоративов не занят',
    description: 'Ни один конкурент не предлагает пакетные корпоративные программы. Потенциал: +200K₽/мес.',
    impact: 'high',
    impactLabel: 'Высокое',
    confidence: 92,
    date: 'Сегодня',
  },
  {
    id: 'ins-3',
    type: 'trend',
    typeLabel: 'Тренд',
    icon: <IconTrendingUp size={14} />,
    title: 'Рост запросов «бильярд + бар»',
    description: 'За последний месяц поисковые запросы по сочетанию «бильярд + бар» выросли на 34% в регионе.',
    impact: 'medium',
    impactLabel: 'Среднее',
    confidence: 78,
    date: 'Вчера',
  },
  {
    id: 'ins-4',
    type: 'recommendation',
    typeLabel: 'Рекомендация',
    icon: <IconLightbulb size={14} />,
    title: 'Запустите программу лояльности',
    description: '68% клиентов конкурентов ищут скидки и бонусы. Программа «каждый 5-й час бесплатно» может увеличить retention на 22%.',
    impact: 'medium',
    impactLabel: 'Среднее',
    confidence: 85,
    date: 'Вчера',
  },
  {
    id: 'ins-5',
    type: 'forecast',
    typeLabel: 'Прогноз',
    icon: <IconCrystalBall size={14} />,
    title: 'Q3 2026: усиление конкуренции',
    description: 'На основе трендов, ожидается открытие 1-2 новых бильярдных клубов. Рекомендуется укрепить позиции до осени.',
    impact: 'high',
    impactLabel: 'Высокое',
    confidence: 71,
    date: '2 дня назад',
  },
  {
    id: 'ins-6',
    type: 'comparison',
    typeLabel: 'Сравнение',
    icon: <IconScale size={14} />,
    title: 'Ваш рейтинг vs конкуренты',
    description: 'Средний рейтинг Weekend: 4.6/5 (Google). Выше Pool Hall Pro (4.3) и Бильярд-Сити (4.2), но ниже Shark Lounge (4.7).',
    impact: 'low',
    impactLabel: 'Низкое',
    confidence: 95,
    date: '3 дня назад',
  },
];

/* ============================================================
   MOCK DATA — Reports
   ============================================================ */

interface Report {
  id: string;
  title: string;
  date: string;
  type: 'chart' | 'swot' | 'trend';
  meta: string;
}

const reports: Report[] = [
  { id: 'rpt-1', title: 'Ежемесячный конкурентный отчёт', date: '15.06.2026', type: 'chart', meta: 'Июнь 2026 · Сгенерирован автоматически' },
  { id: 'rpt-2', title: 'SWOT-анализ: Pool Hall Pro', date: '10.06.2026', type: 'swot', meta: 'Создан вручную' },
  { id: 'rpt-3', title: 'Ценовой анализ рынка Q2 2026', date: '01.06.2026', type: 'trend', meta: 'Автоматический' },
];

/* ============================================================
   Quick Actions
   ============================================================ */

const quickActions = [
  { icon: <IconTarget size={14} />, label: 'SWOT-анализ' },
  { icon: <IconChartBar size={14} />, label: 'Ценовой обзор' },
  { icon: <IconTrendingUp size={14} />, label: 'Прогноз' },
  { icon: <IconScale size={14} />, label: 'Сравнение' },
  { icon: <IconTarget size={14} />, label: 'Целевая аудитория' },
  { icon: <IconLightbulb size={14} />, label: 'Идеи' },
];

/* ============================================================
   SUGGESTED PROMPTS
   ============================================================ */

const suggestedPrompts = [
  'Сравни цены с конкурентами',
  'Прогноз на Q3 2026',
  'SWOT-анализ Pool Hall Pro',
];

/* ============================================================
   PAGE COMPONENT
   ============================================================ */

export default function InsightsClient() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'ai',
        text: '<strong>Анализирую ваш запрос...</strong>\n\nНа основе собранных данных по 5 конкурентам за последние 90 дней, могу предложить следующие выводы.\n\nВ ближайшее время рекомендую обратить внимание на ценовую стратегию в вечернем сегменте и усилить активность в социальных сетях.',
        time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
        recommendations: [
          'Подготовить контент-план на следующий месяц',
          'Провести A/B-тест ценовых предложений',
        ],
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
    }, 2500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (text: string) => {
    setInputValue(text);
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
        <div className={ins.page}>

          {/* Header */}
          <div className={ins.header}>
            <div className={ins.headerLeft}>
              <h1 className={ins.pageTitle}>
                <IconSparkles size={28} className={ins.pageTitleIcon} />
                AI Инсайты
              </h1>
              <p className={ins.pageSubtitle}>Стратегический анализ вашей конкурентной среды · Июнь 2026</p>
            </div>
            <div className={ins.headerActions}>
              <button className={ins.actionBtn} id="btn-export">
                <IconShare2 size={14} /> Экспорт
              </button>
            </div>
          </div>

          {/* Main Split Layout */}
          <div className={ins.mainSplit}>

            {/* ========== AI CHAT ========== */}
            <div className={ins.chatSection} id="ai-chat">
              <div className={ins.chatHeader}>
                <div className={ins.chatHeaderTitle}>
                  <IconRobot size={18} />
                  CompetitorIQ AI
                </div>
                <div className={ins.chatOnline}>
                  <span className={ins.chatOnlineDot} />
                  Онлайн
                </div>
              </div>

              {/* Chat Messages */}
              <div className={ins.chatMessages} id="chat-messages">
                {messages.map(msg => (
                  msg.role === 'user' ? (
                    <div key={msg.id} className={ins.msgUser} id={`msg-${msg.id}`}>
                      <div className={ins.msgUserBubble}>{msg.text}</div>
                      <div className={ins.msgUserMeta}>Вы · {msg.time}</div>
                    </div>
                  ) : (
                    <div key={msg.id} className={ins.msgAI} id={`msg-${msg.id}`}>
                      <div className={ins.msgAIAvatar}>
                        <IconSparkles size={16} />
                      </div>
                      <div className={ins.msgAIContent}>
                        <div className={ins.msgAIHeader}>
                          <span className={ins.msgAIName}>CompetitorIQ AI</span>
                          <span className={ins.msgAITime}>{msg.time}</span>
                        </div>
                        <div className={ins.msgAIBubble}>
                          <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />

                          {msg.recommendations && (
                            <div className={ins.msgRecommendations}>
                              <div className={ins.msgRecommendationsTitle}>
                                <IconLightbulb size={14} /> Рекомендации:
                              </div>
                              <ul className={ins.msgRecommendationsList}>
                                {msg.recommendations.map((rec, i) => (
                                  <li key={i}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className={ins.msgActions}>
                          <button className={ins.msgActionBtn}><IconCopy size={12} /> Копировать</button>
                          <button className={ins.msgActionBtn}><IconBookmark size={12} /> Сохранить</button>
                        </div>
                      </div>
                    </div>
                  )
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className={ins.typingIndicator}>
                    <div className={ins.msgAIAvatar}>
                      <IconSparkles size={16} />
                    </div>
                    <div className={ins.typingBubble}>
                      <div className={ins.typingDot} />
                      <div className={ins.typingDot} />
                      <div className={ins.typingDot} />
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Context Chips */}
              <div className={ins.chatContext}>
                <div className={ins.chatContextChip}>
                  Weekend Бильярд
                  <span className={ins.chatContextClose}>×</span>
                </div>
                <div className={ins.chatContextChip}>
                  Pool Hall Pro
                  <span className={ins.chatContextClose}>×</span>
                </div>
                <button className={ins.chatContextAdd}>
                  <IconPlus size={12} /> @
                </button>
              </div>

              {/* Chat Input */}
              <div className={ins.chatInputArea}>
                <div className={ins.chatInputSuggested}>
                  {suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      className={ins.suggestedChip}
                      onClick={() => handleSuggestionClick(prompt)}
                    >
                      <IconChevronRight size={12} /> {prompt}
                    </button>
                  ))}
                </div>
                <div className={ins.chatInputRow}>
                  <input
                    type="text"
                    className={ins.chatInput}
                    placeholder="Спроси AI-аналитика..."
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    id="ai-chat-input"
                  />
                  <button className={ins.chatSendBtn} onClick={handleSend} id="ai-chat-send">
                    <IconSend size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* ========== RIGHT SIDE — INSIGHTS + REPORTS ========== */}
            <div className={ins.insightsSection}>

              {/* Quick Actions */}
              <div className={ins.quickActions} id="quick-actions">
                <div className={ins.quickActionsTitle}>
                  <IconArrowUp size={14} /> Быстрые запросы
                </div>
                <div className={ins.quickActionsGrid}>
                  {quickActions.map((action, i) => (
                    <button key={i} className={ins.quickActionBtn} onClick={() => handleSuggestionClick(action.label)}>
                      {action.icon} {action.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Insights Header */}
              <div className={ins.insightsHeader}>
                <div className={ins.insightsTitle}>
                  <IconSparkles size={18} /> Готовые инсайты
                </div>
                <button className={ins.insightsSortSelect} id="insights-sort">
                  По важности ▾
                </button>
              </div>

              {/* Insights Grid */}
              <div className={ins.insightsGrid} id="insights-grid">
                {insightCards.map(card => (
                  <div key={card.id} className={`${ins.insightCard} ${ins[card.type]}`} id={`insight-${card.id}`}>
                    <div className={ins.insightCardHeader}>
                      <span className={`${ins.insightBadge} ${ins[card.type]}`}>
                        {card.icon} {card.typeLabel}
                      </span>
                      <span className={ins.insightDate}>{card.date}</span>
                    </div>
                    <div className={ins.insightTitle}>{card.title}</div>
                    <div className={ins.insightDescription}>{card.description}</div>
                    <div className={ins.insightImpact}>
                      <span className={ins.insightImpactLabel}>Влияние</span>
                      <span className={`${ins.insightImpactValue} ${ins[card.impact]}`}>
                        {card.impact === 'high' ? '🔴' : card.impact === 'medium' ? '🟡' : '🟢'} {card.impactLabel}
                      </span>
                    </div>
                    <div className={ins.insightConfidence}>
                      <span>AI: {card.confidence}%</span>
                      <div className={ins.confidenceBar}>
                        <div className={ins.confidenceBarFill} style={{ width: `${card.confidence}%` }} />
                      </div>
                    </div>
                    <div className={ins.insightCardActions}>
                      <button className={`${ins.insightActionBtn} ${ins.primary}`}>
                        <IconChartBar size={12} /> Подробнее
                      </button>
                      <button className={ins.insightActionBtn}>
                        <IconRobot size={12} /> Обсудить
                      </button>
                      <button className={ins.insightActionBtn}>
                        <IconCheck size={12} /> Принять
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reports Section */}
              <div className={ins.reportsCard} id="reports-section">
                <div className={ins.reportsHeader}>
                  <div className={ins.reportsTitle}>
                    <IconFileText size={18} /> Отчёты
                  </div>
                  <button className={ins.reportsCreateBtn}>
                    <IconPlus size={14} /> Создать
                  </button>
                </div>
                <div className={ins.reportsList}>
                  {reports.map(report => (
                    <div key={report.id} className={ins.reportItem} id={`report-${report.id}`}>
                      <div className={`${ins.reportItemIcon} ${ins[`${report.type}Icon`]}`}>
                        {report.type === 'chart' && <IconChartBar size={18} />}
                        {report.type === 'swot' && <IconScale size={18} />}
                        {report.type === 'trend' && <IconTrendingUp size={18} />}
                      </div>
                      <div className={ins.reportItemContent}>
                        <div className={ins.reportItemTitle}>{report.title}</div>
                        <div className={ins.reportItemMeta}>{report.meta}</div>
                      </div>
                      <div className={ins.reportItemActions}>
                        <button className={ins.reportDownloadBtn}>
                          <IconDownload size={12} /> PDF
                        </button>
                        <button className={ins.reportDownloadBtn}>
                          <IconDownload size={12} /> PPTX
                        </button>
                        <button className={ins.reportDownloadBtn}>
                          <IconShare2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
