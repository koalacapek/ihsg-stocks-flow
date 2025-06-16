import { IPerformanceCardProps } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatRupiah } from "@/utils/util";

const PerformanceCard = ({
  selectedYear,
  topPerformingStocks,
}: IPerformanceCardProps) => {
  return (
    <Card className="col-span-4 md:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl">Top Performing Stocks</CardTitle>
        <CardDescription>
          Based on net foreign flow in {selectedYear}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {topPerformingStocks.length > 0 ? (
          <div className="space-y-4">
            {topPerformingStocks.map((item, index) => {
              // Colors for the bars
              const colors = [
                "bg-blue-500",
                "bg-green-500",
                "bg-yellow-500",
                "bg-purple-500",
                "bg-gray-500",
              ];

              // Calculate percentage for bar width (relative to highest value)
              const maxNetFlow = topPerformingStocks[0].netFlow;
              const percentage = (item.netFlow / maxNetFlow) * 100;

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
                      {formatRupiah(item.netFlow)}
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
              );
            })}
          </div>
        ) : (
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            No data available for the selected criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
