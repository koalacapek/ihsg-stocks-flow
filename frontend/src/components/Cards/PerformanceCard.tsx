import { IPerformanceCardProps } from "@/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

const PerformanceCard = ({
  selectedYear,
  topPerformingStocks,
}: IPerformanceCardProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl">Top Performing Stocks</CardTitle>
        <CardDescription>
          Based on net foreign flow in {selectedYear}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPerformingStocks.map((item, index) => {
            // Colors for the bars
            const colors = [
              "bg-blue-500",
              "bg-green-500",
              "bg-yellow-500",
              "bg-purple-500",
              "bg-gray-500",
            ]

            // Calculate percentage for bar width (relative to highest value)
            const maxNetFlow = topPerformingStocks[0].netFlow
            const percentage = (item.netFlow / maxNetFlow) * 100

            return (
              <div key={item.stock} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.stock}</span>
                  <span
                    className={
                      item.netFlow >= 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {item.netFlow >= 0 ? "+" : ""}
                    {item.netFlow.toFixed(1)}B
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`${
                      colors[index % colors.length]
                    } h-2 rounded-full`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default PerformanceCard
