import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    hotel: "#3b82f6",
    cafe: "#f59e0b",
    restaurant: "#10b981",
    clinic: "#8b5cf6",
    coworking: "#ec4899",
  };
  return colors[category] || "#6b7280";
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    hotel: "Hotels",
    cafe: "Cafes",
    restaurant: "Restaurants",
    clinic: "Clinics",
    coworking: "Co-working",
  };
  return labels[category] || category;
}

export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return "#16a34a";
  if (rating >= 4.0) return "#65a30d";
  if (rating >= 3.5) return "#ca8a04";
  if (rating >= 3.0) return "#ea580c";
  return "#dc2626";
}
