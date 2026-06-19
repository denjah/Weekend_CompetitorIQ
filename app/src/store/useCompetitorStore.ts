import { create } from 'zustand';
import { AnalysisMode, TimePeriod } from '../types/analysis';
import { CompetitorData } from '../types/competitor';

interface CompetitorStore {
  // Текущий режим анализа (глобально для всего дашборда)
  activeAnalysisMode: AnalysisMode;
  setActiveAnalysisMode: (mode: AnalysisMode) => void;

  // Выбранный период времени
  timePeriod: TimePeriod;
  setTimePeriod: (period: TimePeriod) => void;

  // Данные всех загруженных конкурентов
  competitors: CompetitorData[];
  setCompetitors: (competitors: CompetitorData[]) => void;

  // Фокус на конкретном конкуренте (выбор на 3D графе или в списке)
  selectedCompetitorId: string | null;
  setSelectedCompetitorId: (id: string | null) => void;

  // Скрытые конкуренты (выключенные через тумблеры)
  hiddenCompetitorIds: string[];
  toggleCompetitorVisibility: (id: string) => void;
}

export const useCompetitorStore = create<CompetitorStore>((set) => ({
  activeAnalysisMode: AnalysisMode.OVERVIEW,
  setActiveAnalysisMode: (mode) => set({ activeAnalysisMode: mode }),

  timePeriod: '3M',
  setTimePeriod: (period) => set({ timePeriod: period }),

  competitors: [],
  setCompetitors: (competitors) => set({ competitors }),

  selectedCompetitorId: null,
  setSelectedCompetitorId: (id) => set({ selectedCompetitorId: id }),

  hiddenCompetitorIds: [],
  toggleCompetitorVisibility: (id) =>
    set((state) => ({
      hiddenCompetitorIds: state.hiddenCompetitorIds.includes(id)
        ? state.hiddenCompetitorIds.filter((hiddenId) => hiddenId !== id)
        : [...state.hiddenCompetitorIds, id],
    })),
}));
