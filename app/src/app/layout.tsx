import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "CompetitorIQ — Competitor Intelligence",
  description: "Портал анализа конкурентов для Weekend Бильярд. Мониторинг цен, рейтингов, активности и AI-аналитика.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
