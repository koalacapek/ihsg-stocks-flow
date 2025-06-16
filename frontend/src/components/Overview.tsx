import { ChartData, IStockChartProps, ITopPerformingStocks } from "@/types";
import TrendCard from "./Cards/TrendCard";
import PerformanceCard from "./Cards/PerformanceCard";
import OwnershipCard from "./Cards/OwnershipCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { convertMonthAbbrToNumber } from "@/utils/util";
import VolitalityCard from "./Cards/VolitalityCard";

const Overview = ({
  selectedStocks,
  selectedYear,
  chartData,
  filteredData,
}: IStockChartProps) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [topFive, setTopFive] = useState<ITopPerformingStocks[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedYear === "") return;

      if (selectedStocks.length === 0) {
        setData([]);
        return;
      }

      try {
        const results = await Promise.all(
          selectedStocks.map((stock) =>
            api.get(`/yearly/${selectedYear}/${stock}`).then((res) => ({
              stock,
              data: res.data, // assuming an array of entries per stock
            }))
          )
        );

        const parsed = results.flatMap(({ stock, data }) =>
          data.map((entry: any) => {
            const split = entry.Date.split("-");
            const day = split[0];
            const month = split[1];
            const year = split[2];
            return {
              stock,
              month: `${year}-${convertMonthAbbrToNumber(month)}-${day}`,
              totalLocal: parseFloat(entry.TotalLocal),
              totalForeign: parseFloat(entry.TotalForeign),
            };
          })
        );

        const combined = results.map(({ stock, data }) => {
          const total = data.reduce(
            (acc: any, item: any) => {
              acc.totalForeign += Number(item.TotalForeign);
              return acc;
            },
            { totalForeign: 0 }
          );

          return {
            stock,
            netFlow: total.totalForeign,
          };
        });

        const topFiveStocks = combined
          .sort((a, b) => b.netFlow - a.netFlow)
          .slice(0, 5);

        setData(parsed);
        setTopFive(topFiveStocks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedStocks, selectedYear]);

  return (
    <div>
      <div className="grid gap-4 pt-4 md:grid-cols-7">
        <TrendCard
          selectedStocks={selectedStocks}
          selectedYear={selectedYear}
          chartData={data}
        />
        <PerformanceCard
          selectedYear={selectedYear}
          topPerformingStocks={topFive}
        />

        {/* <h2 className="text-2xl font-bold">Overview</h2>
      <p className="text-gray-600">
        This section provides a summary of the data and insights.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Key Metrics</h3>
          <p>Placeholder for key metrics data.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Trends</h3>
          <p>Placeholder for trends analysis.</p>
        </div>
      </div> */}
      </div>
      <div className="grid gap-4 md:grid-cols-2 pt-4">
        <OwnershipCard
          selectedStocks={selectedStocks}
          filteredData={filteredData}
        />

        <VolitalityCard
          filteredData={filteredData}
          selectedStocks={selectedStocks}
        />

        {/* <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Buy vs Sell Volume</CardTitle>
            <CardDescription>Foreign investment activity</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredData.length > 0 ? (
              <div className="space-y-4">
                {selectedStocks.map((stock) => {
                  // Calculate total buy and sell volumes for this stock
                  const stockData = filteredData.filter(
                    (item) => item.stock_code === stock
                  );
                  const totalBuy = stockData.reduce(
                    (sum, item) => sum + (item.buy_volume || 0),
                    0
                  );
                  const totalSell = stockData.reduce(
                    (sum, item) => sum + (item.sell_volume || 0),
                    0
                  );

                  // Calculate max value for percentage
                  const maxValue = Math.max(totalBuy, totalSell);
                  const buyPercentage = (totalBuy / maxValue) * 100;
                  const sellPercentage = (totalSell / maxValue) * 100;

                  return (
                    <div key={stock} className="space-y-2">
                      <div className="font-medium">{stock}</div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Buy</span>
                          <span>Rp {totalBuy.toFixed(1)}B</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${buyPercentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Sell</span>
                          <span>Rp {totalSell.toFixed(1)}B</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${sellPercentage}%` }}
                          />
                        </div>
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
        </Card> */}
      </div>
    </div>
  );
};

export default Overview;
