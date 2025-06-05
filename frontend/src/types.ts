export interface ITrendProps {
  selectedStocks: string[]
  selectedYear: string
  chartData: ChartData[]
}

export interface IStockChartProps extends ITrendProps {
  filteredData: any[]
}

export interface IPerformanceCardProps {
  selectedYear: string
  topPerformingStocks: {
    stock: string
    netFlow: number
  }[]
}

export interface IOwnerShipCardProps {
  selectedStocks: string[]
  filteredData: any[]
}

export interface ChartData {
  stock: string,
  month: string,
  totalLocal: string,
  totalForeign: string
}
