import ObservatoryClient from './ObservatoryClient';

export const metadata = {
  title: 'Обсерватория — CompetitorIQ',
  description: 'Мониторинг конкурентов в реальном времени. Лента событий, радар угроз, каналы мониторинга и карта активности.',
};

export default function ObservatoryPage() {
  return <ObservatoryClient />;
}
