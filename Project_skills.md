# CompetitorIQ — Implementation Plan v2 (Skills-Mapped)

> **Проект:** Intelligent Competitor Dashboard  
> **Компания:** Weekend Billiard (производство + продажа бильярдного оборудования, с 1996 г.)  
> **Подход:** UI-First → функционал → данные → интеграции  
> **Версия плана:** 2.0 — с маппингом скиллов на задачи

---

## Карта скиллов проекта

15 скиллов из `skills/` распределены по ролям. Каждый скилл активируется строго на своей фазе.

### 🎨 UI/UX и визуализация (Фазы 1–3)

| Скилл | Роль в проекте | Фазы |
|---|---|---|
| **`frontend-design`** | Фундаментальный скилл фронтенд-дизайнера-инженера. Отвечает за семантичную верстку интерфейсов премиум-класса. | Ф1, Ф2, Ф3 |
| **`high-end-visual-design`** | Задает агенту вкус для создания дорогих интерфейсов «агентского уровня» (премиальные шрифты, правильный пространственный ритм, мягкая глубина). | Ф1, Ф2, Ф3 |
| **`magic-ui-generator`** | Генерация и интеграция потрясающих production-ready UI компонентов (в стиле Magic UI / 21st.dev). | Ф1, Ф2, Ф3 |
| **`design-spells`** | Микро-интеракции, hover-магия, premium-feel для всех компонентов. **ОБЯЗАТЕЛЕН** — каждый компонент проходит через "spell check". | Ф1, Ф2, Ф3 |
| **`industrial-brutalist-ui`** | ❌ **НЕ ИСПОЛЬЗУЕМ** — стиль не подходит. Портал использует тёмный premium UI, а не brutalist. Решение: dark mode + glassmorphism из спецификации `dashboard_01_main.md` | — |
| **`kpi-dashboard-design`** | Паттерны KPI-карточек, layout-структуры дашбордов, иерархия метрик (Strategic → Tactical → Operational). Основа для Overview и всех аналитических панелей | Ф1, Ф2, Ф3 |
| **`claude-d3js-skill`** | **Главный скилл для визуализации.** D3.js v7 для всех 2D-графиков: RadarChart, ScatterPlot, AreaChart, HeatmapCalendar, BubbleChart, Force-Directed 2D граф связей | Ф2, Ф3 |

### 📊 Бизнес-анализ и стратегия (Фазы 0–1, 4–5)

| Скилл | Роль в проекте | Фазы |
|---|---|---|
| **`business-analyst`** | Фреймворк KPI, методология 5 видов анализа, формулы расчёта метрик, структура данных для конкурентного анализа. Консультативная роль при формировании моковых данных | Ф1, Ф5 |
| **`competitive-landscape`** | Фреймворки конкурентного анализа: позиционирование, дифференциация, market mapping. Применяется при проектировании логики 3D-графа и алгоритмов расстояний | Ф1, Ф2 |

### 🔧 Планирование и архитектура (Фаза 0)

| Скилл | Роль в проекте | Фазы |
|---|---|---|
| **`blueprint`** | Декомпозиция крупных фаз на self-contained шаги для multi-session работы. Используется при планировании Фаз 2+ если потребуется разбивка на sub-tasks | Ф0, по запросу |

### 🕷️ Сбор данных (Фаза 4)

| Скилл | Роль в проекте | Фазы |
|---|---|---|
| **`web-scraper`** | Парсинг сайтов конкурентов: каталоги, цены, новинки. Multi-strategy: WebFetch → Browser fallback. Для парсинга static-страниц бильярдных магазинов | Ф4 |
| **`apify-competitor-intelligence`** | Сбор данных из соцсетей конкурентов: VK, YouTube, Instagram, TikTok. Google Maps для рейтингов и отзывов. Обзор рекламных кампаний через Facebook Ads Scraper | Ф4 |
| **`apify-ecommerce`** | Мониторинг цен на маркетплейсах: Amazon, Ozon (через custom Actor), WB. Извлечение product data, prices, reviews | Ф4 |
| **`apify-ultimate-scraper`** | Универсальный оркестратор для 55+ Actors. Используется когда `apify-competitor-intelligence` и `apify-ecommerce` не покрывают конкретный источник | Ф4 |
| **`ozon-stealth-parser`** | (Внутренний Python/CDP скрипт). Брутфорс-парсер Ozon через Chrome DevTools Protocol. Обходит защиту через `document.body.innerHTML` RegExp и валидацию Pillow | Ф4 |
| **`go-rod-master`** | Скрытный низкоуровневый парсинг на базе библиотеки Go Rod (безголовый браузер) для обхода жестких антибот-систем маркетплейсов и сайтов. | Ф4 |

### 🔄 Data Pipeline (Фаза 4)

| Скилл | Роль в проекте | Фазы |
|---|---|---|
| **`data-engineer`** | Проектирование ETL-пайплайнов: скрапинг → очистка → Google Sheets / JSON. Data quality, валидация, дедупликация. Оркестрация через Next.js API Routes | Ф4 |

### 📄 Генерация отчётов (Фаза 5)

| Скилл | Роль в проекте | Фазы |
|---|---|---|
| **`pptx`** | Чтение/анализ существующих презентаций, QA визуальной части через thumbnail.py. Главный скилл для работы с PPTX | Ф5 |
| **`python-pptx-generator`** | Генерация Python-скриптов для автоматического создания PPTX отчётов из данных конкурентного анализа | Ф5 |

### 💬 Telegram-уведомления (Фаза 5+)

| Скилл | Роль в проекте | Фазы |
|---|---|---|
| **`telegram-automation`** | ❌ **ОТЛОЖЕН** — Telegram-бот не нужен на первом этапе (решение из ревью). Может быть активирован позже для отправки алертов о действиях конкурентов | — (будущее) |

---

## Матрица «Фаза → Скиллы»

| Фаза | Активные скиллы |
|---|---|
| **Ф0: Фундамент** | `blueprint` |
| **Ф1: Дизайн-система + Скелет** | `frontend-design`, `high-end-visual-design`, `magic-ui-generator`, `design-spells`, `kpi-dashboard-design`, `business-analyst`, `competitive-landscape` |
| **Ф2: Overview MVP** | `frontend-design`, `high-end-visual-design`, `magic-ui-generator`, `design-spells`, `claude-d3js-skill`, `kpi-dashboard-design`, `competitive-landscape` |
| **Ф3: Вторичные экраны** | `frontend-design`, `high-end-visual-design`, `magic-ui-generator`, `design-spells`, `claude-d3js-skill`, `kpi-dashboard-design` |
| **Ф4: Данные и интеграции** | `web-scraper`, `apify-competitor-intelligence`, `apify-ecommerce`, `apify-ultimate-scraper`, `go-rod-master`, `data-engineer` |
| **Ф5: AI-агенты + Отчёты** | `pptx`, `python-pptx-generator`, `business-analyst` |

---

## Правила применения скиллов

### Правило 1: Design Spells — обязательная проверка
Каждый UI-компонент перед мержем проходит "spell check" по `design-spells`:
- Hover-состояние — не generic, а "magnetic" или с эффектом
- Переходы — smooth, 60fps, GPU-accelerated
- Микро-анимации — на каждом интерактивном элементе
- Кнопки, карточки, тултипы — всё должно чувствоваться "expensive"

### Правило 2: D3.js — единственная библиотека для 2D-графиков
Все 2D-визуализации строятся по паттернам из `claude-d3js-skill`:
- Pattern A: Direct DOM manipulation (для Next.js useRef + useEffect)
- Scales, axes, transitions — из reference-кода скилла
- Force-directed 2D граф — из скилла (секция "Force-directed network")
- 3D-граф — отдельно через `3d-force-graph` (не через D3)

### Правило 3: KPI Dashboard Design — структура метрик
Все KPI-карточки и метрики проектируются по фреймворку из `kpi-dashboard-design`:
- 5-7 KPIs на экран максимум
- Контекст: сравнение, тренд, таргет
- Иерархия: Strategic (Overview) → Tactical (Профиль) → Operational (Обсерватория)

### Правило 4: Apify — цепочка скиллов для сбора данных
На Фазе 4 скиллы Apify работают каскадно:
1. `apify-competitor-intelligence` — первый выбор для соцсетей и Google Maps
2. `apify-ecommerce` — для маркетплейсов и e-commerce
3. `apify-ultimate-scraper` — fallback для всего остального
4. `web-scraper` — для статических сайтов конкурентов, где Apify не нужен

### Правило 5: PPTX-генерация — два скилла в связке
На Фазе 5 для отчётов:
1. `python-pptx-generator` — генерация Python-скрипта для создания PPTX
2. `pptx` — QA: визуальная проверка через thumbnail.py, контент через markitdown

### Правило 6: Data Engineer — архитектура пайплайнов
Вся обработка данных на Фазе 4 проектируется по принципам `data-engineer`:
- Ingestion → Transformation → Validation → Storage
- Data quality checks на каждом этапе
- Абстракция хранения (Sheets/JSON сейчас → DB потом)

### Правило 7: go-rod-master — скрытный парсинг для обхода защит
Используется на Фазе 4 для обхода сложной антибот-защиты (Cloudflare, Advanced Captcha) на маркетплейсах или сайтах конкурентов, когда стандартные методы через `web-scraper` или готовые API-решения возвращают ошибки авторизации или блокировки.

---

## Фазы разработки (обновлённые)

### ФАЗА 0: Фундамент ✅ ЗАВЕРШЕНА

### ФАЗА 1: Дизайн-система + Скелет + Моковые данные ← СЛЕДУЮЩИЙ ШАГ

> **Скиллы:** `frontend-design` + `high-end-visual-design` + `magic-ui-generator` + `design-spells` + `kpi-dashboard-design` + `business-analyst` + `competitive-landscape`

| # | Задача | Скилл | Файлы |
|---|---|---|---|
| 1.1 | Init Next.js 15 (App Router, TS) | — | `package.json`, `tsconfig.json` |
| 1.2 | CSS Design System — все токены из спецификации + design-spells переменные для анимаций | `design-spells` | `globals.css` |
| 1.3 | **Моковые данные** — 10 конкурентов с метриками по 5 видам анализа (бизнес-логика из `business-analyst`, структура из `competitive-landscape`) | `business-analyst`, `competitive-landscape` | `data/mock/*.json`, Google Sheets |
| 1.4 | Кастомная SVG иконочная система (20+ иконок) | — | `components/icons/*` |
| 1.5 | Layout: Sidebar + Header + Content Area (desktop, 1920+) | `kpi-dashboard-design` (layout patterns) | `layout.tsx`, `Sidebar.tsx`, `Header.tsx` |
| 1.6 | UI-компоненты: Card, Badge, Button, StatusDot — с micro-interactions | `design-spells` | `components/ui/*` |
| 1.7 | Stub-страницы для 7 разделов | — | `app/*/page.tsx` |
| 1.8 | Шрифты (Inter, IBM Plex Mono) | — | `layout.tsx` |

### ФАЗА 2: Главный дашборд (Overview) — MVP

> **Скиллы:** `frontend-design` + `high-end-visual-design` + `magic-ui-generator` + `design-spells` + `claude-d3js-skill` + `kpi-dashboard-design` + `competitive-landscape`

| # | Задача | Скилл |
|---|---|---|
| 2.1 | 3D Force Graph (центральный узел Weekend) | — (`3d-force-graph` lib) |
| 2.2 | KPI-карточки (4 шт.) с анимацией CountUp + design spells | `design-spells`, `kpi-dashboard-design` |
| 2.3 | Кнопки вкл/выкл конкурентов (с "magical" toggle) | `design-spells` |
| 2.4 | Переключатель 5 режимов анализа | `competitive-landscape` |
| 2.5 | Правая панель — RadarChart + мини-KPI (D3.js) | `claude-d3js-skill` |
| 2.6 | Period selector с hover-магией | `design-spells` |
| 2.7 | Таблица конкурентов (сортируемая, с D3 transitions) | `claude-d3js-skill` |

### ФАЗА 3: Вторичные экраны

> **Скиллы:** `frontend-design` + `high-end-visual-design` + `magic-ui-generator` + `design-spells` + `claude-d3js-skill` + `kpi-dashboard-design`

| # | Задача | Скилл |
|---|---|---|
| 3.1 | Граф связей — D3 force-directed 2D | `claude-d3js-skill` (Force-directed network pattern) |
| 3.2 | Обсерватория — лента событий + HeatmapCalendar + AreaChart | `claude-d3js-skill` (Heatmap + Line chart patterns) |
| 3.3 | Профиль конкурента — форма + карточка с spell-animations | `design-spells` |
| 3.4 | ScatterPlot рыночной позиции | `claude-d3js-skill` (Scatter plot pattern) |

### ФАЗА 4: Данные и интеграции

> **Скиллы:** `web-scraper` + `apify-*` (3 скилла) + `data-engineer`

| # | Задача | Скилл |
|---|---|---|
| 4.1 | Google Sheets API — CRUD + синхронизация | `data-engineer` |
| 4.2 | Парсинг цен с сайтов конкурентов | `web-scraper` |
| 4.3 | Маркетплейс мониторинг (Ozon, WB, YM) | `apify-ecommerce` |
| 4.4 | Скрапинг соцсетей (VK, YouTube, Instagram) | `apify-competitor-intelligence` |
| 4.5 | Google Maps — рейтинги и отзывы | `apify-competitor-intelligence` |
| 4.6 | SEO-мониторинг | `web-scraper` + `apify-ultimate-scraper` |
| 4.7 | ETL Pipeline: очистка → валидация → запись | `data-engineer` |

### ФАЗА 5: AI-агенты + Отчёты

> **Скиллы:** `business-analyst` + `pptx` + `python-pptx-generator`

| # | Задача | Скилл |
|---|---|---|
| 5.1-5.5 | 5 AI-агентов по видам анализа | `business-analyst` (методология) |
| 5.6 | AI Chat (Инсайты) — оркестратор | — |
| 5.7 | Генерация PPTX отчётов | `python-pptx-generator` + `pptx` (QA) |
| 5.8 | Генерация PDF отчётов | — |

---

## Verification Plan

### После ФАЗЫ 1
- `npm run dev` запускается без ошибок
- Все 7 страниц доступны через роутинг
- Sidebar навигация работает
- Design-спеллы работают: hover-эффекты, transitions 60fps
- Моковые данные загружаются и отображаются
- SVG-иконки рендерятся
- Корректно на 1920×1080+

### После ФАЗЫ 2
- 3D-граф рендерится с 10 узлами
- Weekend Billiard в центре с glow
- Клик на узел → правая панель с RadarChart (D3.js)
- 5 режимов переключаются
- KPI анимируются (CountUp + design-spells)
- Вкл/выкл скрывают узлы с анимацией

### Общее
- Lighthouse Performance ≥ 80
- Нет console errors
- Визуал соответствует спецификациям
