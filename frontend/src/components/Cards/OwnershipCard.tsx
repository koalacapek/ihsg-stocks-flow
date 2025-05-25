import { IOwnerShipCardProps } from "@/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

const OwnershipCard = ({
  filteredData,
  selectedStocks,
}: IOwnerShipCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Foreign Ownership by Stock</CardTitle>
        <CardDescription>Average ownership percentage</CardDescription>
      </CardHeader>
      <CardContent>
        {filteredData.length > 0 ? (
          <div className="space-y-4">
            {selectedStocks.map((stock, index) => {
              // Calculate average ownership for this stock
              const stockData = filteredData.filter(
                (item) => item.stock_code === stock
              )
              const avgOwnership =
                stockData.length > 0
                  ? stockData.reduce(
                      (sum, item) => sum + (item.foreign_ownership || 0),
                      0
                    ) / stockData.length
                  : 0

              // Colors for the bars
              const colors = [
                "bg-blue-500",
                "bg-green-500",
                "bg-yellow-500",
                "bg-purple-500",
                "bg-gray-500",
              ]

              return (
                <div key={stock} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{stock}</span>
                    <span>{avgOwnership.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`${
                        colors[index % colors.length]
                      } h-2 rounded-full`}
                      style={{ width: `${avgOwnership}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            No data available for the selected criteria
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default OwnershipCard
