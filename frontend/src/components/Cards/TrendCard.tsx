import { ChartData, ITrendProps } from "@/types";
import { StockChart } from "../StockChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import { aggregateDataForChart } from "@/utils/util";

const TrendCard = ({
  selectedStocks,
  selectedYear,
  chartData,
}: ITrendProps) => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const finalData = aggregateDataForChart(chartData, selectedStocks);
    console.log(finalData);
    setData(finalData);
  }, [chartData, selectedStocks]);
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl">Foreign Flow Trend</CardTitle>
        <CardDescription>
          Foreign investment flow for {selectedYear}
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        {chartData.length > 0 ? (
          <StockChart data={data} selectedStocks={selectedStocks} />
        ) : (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No data available for the selected criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendCard;
