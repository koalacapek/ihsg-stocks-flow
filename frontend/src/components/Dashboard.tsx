import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
// import { Line } from "react-chartjs-2";
// import { loadAndParseTextFileAndFilter } from "../util";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// import data1 from "../../public/data/20240131.txt";
import StockSelector from "./StockSelector";
import YearSelector from "./YearSelector";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PieChart, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Overview from "./Overview";
import { api } from "@/utils/api";
import { formatRupiah } from "@/utils/util";

const Dashboard = () => {
  // Mock data
  const [availableStocks, setAvailableStocks] = useState<string[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [ownership, setOwnership] = useState<number>(0);

  const [totalNet, setTotalNet] = useState<number>(0);
  const [totalForeign, setTotalForeign] = useState<number>(0);

  const availableYears = ["2024", "2025"];

  const [summaryStats, setSummaryStats] = useState({
    netFlow: 0,
    buyVolume: 0,
    sellVolume: 0,
    foreignOwnership: 0,
  });

  const [chartData, setChartData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    setSummaryStats({
      netFlow: 0,
      buyVolume: 0,
      sellVolume: 0,
      foreignOwnership: 0,
    });
  }, []);

  // load all available stocks on mount
  useEffect(() => {
    const fetchCodes = () => {
      api.get("/stocks").then((res) => {
        setAvailableStocks(res.data);
      });
    };

    fetchCodes();
  }, []);

  useEffect(() => {
    console.log(selectedStocks);
  }, [selectedStocks]);

  // Load data of chosen stocks
  useEffect(() => {
    const fetchTotals = async () => {
      if (selectedYear === "") return;
      if (selectedStocks.length === 0) {
        setTotalNet(0);
        setTotalForeign(0);
        setOwnership(0);
        return;
      }

      try {
        const results = await Promise.all(
          selectedStocks.map((stock) =>
            api.get(`/total/${selectedYear}/${stock}`)
          )
        );
        const total = results.reduce(
          (acc, res) =>
            acc + res.data["total_local"] + res.data["total_foreign"],
          0
        );

        const totalForeign = results.reduce(
          (acc, res) => acc + res.data["total_foreign"],
          0
        );

        const totalLocal = results.reduce(
          (acc, res) => acc + res.data["total_local"],
          0
        );
        setTotalNet(total);
        setTotalForeign(totalForeign);

        // Calculate ownership
        setOwnership((totalForeign / (totalForeign + totalLocal)) * 100);
      } catch (err) {
        console.error("Failed to fetch totals", err);
      }
    };

    fetchTotals();
  }, [selectedStocks, selectedYear]);

  // const topPerformingStocks = [...availableStocks]
  //   .map((stock) => {
  //     const stockData = csvData.filter(
  //       (item) =>
  //         item.stock_code === stock &&
  //         (selectedYear ? item.date.startsWith(selectedYear) : true)
  //     )
  //     const netFlow = stockData.reduce(
  //       (sum, item) => sum + (item.net_flow || 0),
  //       0
  //     )
  //     return { stock, netFlow }
  //   })
  //   .sort((a, b) => b.netFlow - a.netFlow)
  //   .slice(0, 5)

  return (
    <div className="p-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Foreign Flow Analysis
        </h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <StockSelector
            availableStocks={availableStocks}
            selectedStocks={selectedStocks}
            setSelectedStocks={setSelectedStocks}
          />
          <YearSelector
            availableYears={availableYears}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-medium">Net Flow</CardTitle>
            <TrendingUp
              className={`h-5 w-5 ${
                totalNet >= 0 ? "text-green-500" : "text-red-500"
              }`}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(totalNet)}</div>
            <p className="text-xs text-muted-foreground">
              Based on selected data
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-medium">Foreign Buy Volume</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatRupiah(totalForeign)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total foreign purchases
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-medium">Foreign Sell Volume</CardTitle>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {(summaryStats.sellVolume / 1000).toFixed(2)}T
            </div>
            <p className="text-xs text-muted-foreground">Total foreign sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-medium">Foreign Ownership</CardTitle>
            <PieChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ownership.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Average across selected stocks
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="pt-6">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="overview" className="hover:cursor-pointer">
            Overview
          </TabsTrigger>
          <TabsTrigger value="comparison" className="hover:cursor-pointer">
            Comparison
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Overview
            selectedStocks={selectedStocks}
            selectedYear={selectedYear}
            chartData={chartData}
            filteredData={filteredData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
