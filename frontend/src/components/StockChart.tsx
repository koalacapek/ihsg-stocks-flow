import { ChartData } from "@/types";
import { formatRupiah } from "@/utils/util";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

interface StockChartProps {
  data: any[];
  selectedStocks: string[];
}

export function StockChart({ data, selectedStocks }: StockChartProps) {
  const colors = ["#2563eb", "#16a34a", "#dc2626", "#9333ea", "#ea580c"];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            // Format date to show only month and day
            try {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            } catch (e) {
              console.error("Invalid date format:", e);
              return value;
            }
          }}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => formatRupiah(value)}
          domain={["auto", "auto"]} // ← this allows dynamic min/max
        />
        <Tooltip
          formatter={(value: number) => formatRupiah(value)}
          labelFormatter={(label) => {
            // Format the full date for tooltip
            try {
              const date = new Date(label);
              return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
            } catch (e) {
              console.error("Invalid date format:", e);

              return label;
            }
          }}
        />
        <Legend />
        {selectedStocks.map((stock, index) => (
          <Line
            key={stock}
            type="monotone"
            dataKey={stock}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name={stock}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
