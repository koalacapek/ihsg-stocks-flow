export interface ITrendProps {
  selectedStocks: string[]
  selectedYear: string
  chartData: ChartData[]
}

export interface IStockChartProps extends ITrendProps {
  filteredData: any[]
}

export interface ITopPerformingStocks {
  stock: string
  netFlow: number
}

export interface IPerformanceCardProps {
  selectedYear: string
  topPerformingStocks: ITopPerformingStocks[]
}

export interface IOwnerShipCardProps {
  selectedStocks: string[]
  filteredData: {
    totalForeign: number
    totalLocal: number
    year: string
    code: string
  }[]
}

export interface ChartData {
  stock: string,
  month: string,
  totalLocal: string,
  totalForeign: string
}
