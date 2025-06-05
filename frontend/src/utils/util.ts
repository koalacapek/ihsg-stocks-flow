import { ChartData } from "@/types";

export const formatRupiah = (value: number): string => {
  if (value >= 1_000_000_000_000) {
    return `Rp ${(value / 1_000_000_000_000).toFixed(2)}T`; // Triliun
  } else if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toFixed(2)}M`; // Miliar
  } else if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toFixed(2)}Jt`; // Juta (optional)
  } else {
    return `Rp ${value.toLocaleString("id-ID")}`; // Raw format
  }
};

// Function to aggregate data for chart display
export const aggregateDataForChart = (data: ChartData[], stocks: string[]): any[] => {
  // Group data by date
  const groupedByDate: Record<string, any> = {}

  data.forEach((item) => {
    if (!groupedByDate[item.month]) {
      groupedByDate[item.month] = { date: item.month }
    }

    // Add net flow for this stock on this date
    if (item.stock && item.totalForeign !== undefined) {
      groupedByDate[item.month][item.stock] = item.totalForeign
    }
  })

  // Convert to array and sort by date
  return Object.values(groupedByDate).sort((a, b) => a.date.localeCompare(b.date))
}

export const convertMonthAbbrToNumber = (monthAbbr: string): string => {
  const months: Record<string, string> = {
    JAN: "01",
    FEB: "02",
    MAR: "03",
    APR: "04",
    MAY: "05",
    JUN: "06",
    JUL: "07",
    AUG: "08",
    SEP: "09",
    OCT: "10",
    NOV: "11",
    DEC: "12",
  };

  return months[monthAbbr.toUpperCase()] || "";
}