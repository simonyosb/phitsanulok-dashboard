import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phitsanulok Dashboard | Business Intelligence",
  description:
    "Social listening and business intelligence dashboard for Phitsanulok province",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="font-[Inter,sans-serif]">
        <Sidebar />
        <main className="ml-64 min-h-screen bg-[var(--background)]">
          <div className="p-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
