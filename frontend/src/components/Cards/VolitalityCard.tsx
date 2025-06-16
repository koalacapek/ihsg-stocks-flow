import { IVolitalityCardProps } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const VolitalityCard = ({ data, selectedStocks }: IVolitalityCardProps) => {
  // Precompute volatilities once for all stocks
  const volatilities = selectedStocks.map((stock) => {
    const stockData = data.filter((item) => item.stock === stock);
    const flows = stockData.map((item) => item.totalForeign ?? 0);
    const mean = flows.reduce((sum, flow) => sum + flow, 0) / flows.length;
    const variance =
      flows.reduce((sum, flow) => sum + Math.pow(flow - mean, 2), 0) /
      flows.length;
    return {
      stock,
      volatility: Math.sqrt(variance),
    };
  });

  const maxVolatility = Math.max(...volatilities.map((v) => v.volatility));

  // Color palette
  const colors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-purple-400",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flow Volatility Analysis</CardTitle>
        <CardDescription>Standard deviation of daily flows</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <div className="space-y-4">
            {volatilities.map(({ stock, volatility }, index) => {
              const percentage =
                maxVolatility > 0 ? (volatility / maxVolatility) * 100 : 0;

              return (
                <div key={stock} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{stock}</span>
                    <span className="text-sm">
                      σ {(volatility / 1_000_000_000).toFixed(2)}B
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

export default VolitalityCard;
