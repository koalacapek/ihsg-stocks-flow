export interface ITrendProps {
  selectedStocks: string[]
  selectedYear: string
  chartData: any[]
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
