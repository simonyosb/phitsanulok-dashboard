import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phitsanulok Dashboard | Business Intelligence",
  description:
    "Social listening and business intelligence dashboard for Phitsanulok province",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <Sidebar />
        <main className="ml-64 min-h-screen bg-[var(--background)]">
          <div className="p-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
