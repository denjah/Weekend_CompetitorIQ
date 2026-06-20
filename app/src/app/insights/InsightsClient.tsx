'use client';

import React from 'react';
import styles from '@/styles/layout.module.css';
import ins from '@/styles/insights.module.css';
import StyleSwitcher from '@/components/ui/StyleSwitcher';
import DatabaseTelemetry from '@/components/ui/DatabaseTelemetry';
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
  IconShoppingBag,
} from '@/components/icons';

/* ============================================================
   NAV & GROUPS (реальные данные)
   ============================================================ */

const navItems = [
  { id: 'overview', label: 'Overview', icon: <IconChartBar size={20} />, active: false },
  { id: 'graph', label: 'Граф связей', icon: <IconNetwork size={20} />, active: false },
  { id: 'observatory', label: 'Обсерватория', icon: <IconTelescope size={20} />, active: false },
  { id: 'insights', label: 'Инсайты', icon: <IconSparkles size={20} />, active: true },
  { id: 'ozon', label: 'Ozon Анализ', icon: <IconShoppingBag size={20} />, active: false },
];

const groups = [
  { label: 'Прямые конкуренты', count: 8, color: '#A855F7' },
  { label: 'Косвенные', count: 6, color: '#06B6D4' },
  { label: 'Нишевые', count: 7, color: '#F97316' },
];

/* ============================================================
   REAL DATA — AI Chat Messages
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
    text: 'Кто главный конкурент Weekend по ассортименту и охвату?',
    time: '14:32',
  },
  {
    id: 'msg-2',
    role: 'ai',
    text: 'На основе анализа <strong>69 параметров по 22 компаниям</strong> выделяю <strong>Billiard-Group</strong> как главного конкурента:\n\n<strong>1. Масштаб (лидер рынка)</strong>\n15 000 SKU vs ~2 000 у Weekend. 8–10 салонов в 7 городах + СНГ vs 2 у Weekend.\n\n<strong>2. Аудит-балл: 26/40 (лучший)</strong>\nWeekend набрал 12/40 — отставание в 2+ раза.\n\n<strong>3. Уязвимости Billiard-Group:</strong>\n• Устаревший дизайн (7/10)\n• Перегруженный каталог\n• Слабый видеоконтент',
    time: '14:33',
    recommendations: [
      'Атаковать через современный UX и дизайн — наше потенциальное преимущество',
      'Подключить рассрочку (у B-Group уже есть)',
      'Развивать видеоконтент — Weekend (93 ролика) проигрывает Luza (670+)',
    ],
  },
  {
    id: 'msg-3',
    role: 'user',
    text: 'Какие фичи сайта есть у конкурентов, но нет у Weekend?',
    time: '14:35',
  },
  {
    id: 'msg-4',
    role: 'ai',
    text: '<strong>Фичи, которых нет у Weekend, но есть у конкурентов:</strong>\n\n• <strong>Рассрочка/кредит</strong> — Старт, Б.№1, Б-Проф, B-Group (4 из 22)\n• <strong>Онлайн-чат</strong> — 8 конкурентов (JivoSite, Яндекс)\n• <strong>Видеообзоры в карточках</strong> — Старт, B-Group, 8futов, Б-Проф\n• <strong>3D-конфигуратор</strong> — Старт (лучший), Б-Проф, БС91, TablePlay\n• <strong>«Купить в 1 клик»</strong> — 7 конкурентов\n• <strong>Кросс-селл</strong> — Старт (лучший), 6 других\n• <strong>Лид-магнит / квиз</strong> — Б-Проф, БС91, TablePlay, Start-Line',
    time: '14:36',
    recommendations: [
      'Приоритет внедрения: Рассрочка → Чат → «Купить в 1 клик» → Кросс-селл',
      'Рассрочка — критически важна при чеке 40–500K₽',
    ],
  },
];

/* ============================================================
   REAL DATA — Insight Cards (из CSV)
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
    title: 'Billiard-Group: лидер рынка (26/40)',
    description: '15K SKU, 300 брендов, 8–10 салонов, гарантия до 25 лет. Рассрочка, кешбэк, бот-эксперт. Weekend (12/40) отстаёт в 2 раза.',
    impact: 'high',
    impactLabel: 'Критическое',
    confidence: 95,
    date: 'Сегодня',
  },
  {
    id: 'ins-2',
    type: 'opportunity',
    typeLabel: 'Возможность',
    icon: <IconRocket size={14} />,
    title: 'Рассрочка — конкурентный разрыв',
    description: 'Только 4 из 22 компаний предлагают рассрочку. Weekend не в их числе. При среднем чеке 40–500K₽ — критически важная фича конверсии.',
    impact: 'high',
    impactLabel: 'Высокое',
    confidence: 100,
    date: 'Сегодня',
  },
  {
    id: 'ins-3',
    type: 'threat',
    typeLabel: 'Угроза',
    icon: <IconAlertTriangle size={14} />,
    title: 'SEO-катастрофа: 4 страницы 404',
    description: '/kontakty/, /dostavka/, /oplata/, /garantiya/ — все 404. Нет canonical, нет Schema. robots.txt блокирует пагинацию. Но 10+ конкурентов в похожей ситуации.',
    impact: 'high',
    impactLabel: 'Критическое',
    confidence: 100,
    date: 'Сегодня',
  },
  {
    id: 'ins-4',
    type: 'recommendation',
    typeLabel: 'Рекомендация',
    icon: <IconLightbulb size={14} />,
    title: 'Внедрить онлайн-чат (15 минут)',
    description: '8 конкурентов уже используют чат (Jivo, Яндекс, Bitrix24). Weekend — нет. Стандарт рынка при высоком чеке. JivoSite бесплатен на старте.',
    impact: 'medium',
    impactLabel: 'Среднее',
    confidence: 95,
    date: 'Сегодня',
  },
  {
    id: 'ins-5',
    type: 'trend',
    typeLabel: 'Тренд',
    icon: <IconTrendingUp size={14} />,
    title: '3D-конфигуратор — набирающий тренд',
    description: 'Ф-ка Старт (лучший), Billiard-Prof, БС 1991, TablePlay — у всех есть. Weekend отстаёт от тренда в 4+ компаниях.',
    impact: 'medium',
    impactLabel: 'Среднее',
    confidence: 88,
    date: 'Вчера',
  },
  {
    id: 'ins-6',
    type: 'comparison',
    typeLabel: 'Сравнение',
    icon: <IconScale size={14} />,
    title: 'Weekend vs рынок: UX 4/10, дизайн 4/10',
    description: 'Средний UX рынка: 4.9. Средний дизайн: 5.1. Лидеры UX: B-Group (8), Ф-ка Старт (8), Бильярд.ру (7). Weekend — ниже среднего.',
    impact: 'medium',
    impactLabel: 'Среднее',
    confidence: 92,
    date: '2 дня назад',
  },
  {
    id: 'ins-7',
    type: 'opportunity',
    typeLabel: 'Возможность',
    icon: <IconRocket size={14} />,
    title: 'Luza.ru — медиа-гигант с уязвимостями',
    description: '37.9K YouTube, 670+ видео. Но: фейковый Schema-рейтинг (OutOfStock + поддельная оценка). Weekend может перехватить выдачу, исправив Schema первым.',
    impact: 'medium',
    impactLabel: 'Среднее',
    confidence: 82,
    date: '3 дня назад',
  },
  {
    id: 'ins-8',
    type: 'forecast',
    typeLabel: 'Прогноз',
    icon: <IconCrystalBall size={14} />,
    title: 'Дефицит видео — главная слабость Weekend',
    description: 'Weekend: 93 ролика, 655 подписчиков. Luza: 670+ роликов, 37 900. Ф-ка Старт: 516, 3 590. Видеоконтент — основной драйвер трафика в нише.',
    impact: 'high',
    impactLabel: 'Высокое',
    confidence: 90,
    date: '3 дня назад',
  },
];

/* ============================================================
   REAL DATA — Reports
   ============================================================ */

interface Report {
  id: string;
  title: string;
  date: string;
  type: 'chart' | 'swot' | 'trend';
  meta: string;
}

const reports: Report[] = [
  { id: 'rpt-1', title: 'Аудит 22 конкурентов — 69 параметров', date: '19.06.2026', type: 'chart', meta: 'Июнь 2026 · Из CSV' },
  { id: 'rpt-2', title: 'SWOT-анализ: Billiard-Group', date: '18.06.2026', type: 'swot', meta: 'Автоматический' },
  { id: 'rpt-3', title: 'SEO-проблемы рынка бильярда', date: '15.06.2026', type: 'trend', meta: 'Автоматический' },
];

/* ============================================================
   Quick Actions
   ============================================================ */

const quickActions = [
  { icon: <IconTarget size={14} />, label: 'SWOT B-Group' },
  { icon: <IconChartBar size={14} />, label: 'Сравнить SEO' },
  { icon: <IconTrendingUp size={14} />, label: 'Тренды рынка' },
  { icon: <IconScale size={14} />, label: 'UX-бенчмарк' },
  { icon: <IconTarget size={14} />, label: 'Фичи сайтов' },
  { icon: <IconLightbulb size={14} />, label: 'Рекомендации' },
];

/* ============================================================
   SUGGESTED PROMPTS
   ============================================================ */

const suggestedPrompts = [
  'Сравни SEO Weekend vs Billiard-Group',
  'SWOT-анализ Ф-ки Старт',
  'Кто использует рассрочку?',
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
        text: '<strong>Анализирую ваш запрос...</strong>\n\nНа основе собранных данных по 21 конкуренту (69 параметров из CSV-аудита), могу предложить следующие выводы.\n\nWeekend (12/40) находится в нижней трети рейтинга. Ключевые зоны роста: <strong>рассрочка</strong>, <strong>онлайн-чат</strong>, <strong>восстановление 404 страниц</strong> и <strong>видеоконтент</strong>.',
        time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
        recommendations: [
          'Срочно: исправить 4 страницы 404 + добавить canonical',
          'Подключить Тинькофф Рассрочку / Сбер Сплит',
          'Установить JivoSite (бесплатно на старте)',
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
        <div className={ins.page}>

          <StyleSwitcher />

          {/* Header */}
          <div className={ins.header}>
            <div className={ins.headerLeft}>
              <h1 className={ins.pageTitle}>
                <IconSparkles size={28} className={ins.pageTitleIcon} />
                AI Инсайты
              </h1>
              <p className={ins.pageSubtitle}>Стратегический анализ конкурентной среды · 69 параметров × 22 компании · Июнь 2026</p>
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
                  Billiard-Group
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
