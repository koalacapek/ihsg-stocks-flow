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
import { Line } from "react-chartjs-2";
import { loadAndParseTextFileAndFilter } from "../util";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import data1 from "../../public/data/20240131.txt";
import StockSelector from "./StockSelector";
import YearSelector from "./YearSelector";
const Dashboard = () => {
  // Mock data
  const availableStocks = ["BBCA", "BBRI", "BMRI"];
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);

  const availableYears = ["2021", "2022", "2023", "2024", "2025"];
  const [selectedYear, setSelectedYear] = useState<string>("");

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
    </div>
  );
  // const [text, setText] = useState("");
  // const [data, setData] = useState<any>({});

  // useEffect(() => {
  //   // Load the text file from the public folder
  //   loadAndParseTextFileAndFilter(data1, "AALI")
  //     .then((content) => {
  //       setData(content);
  //       console.log(content);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  // const lineChart = {
  //   labels: [
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //     "Sunday",
  //   ],

  //   datasets: [
  //     {
  //       label: "Local",
  //       data: [1000, 8000, 5000, 3000, 10000, 9000, 1000],
  //       borderColor: "green",
  //     },
  //     {
  //       label: "Foreign",
  //       data: [3000, 5000, 10000, 6000, 8000, 7000, 100],
  //       borderColor: "red",
  //     },
  //   ],
  // };
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: "bottom" as const,
  //     },
  //   },
  // };
  // return (
  //   <div className="w-full pl-10 h-fit ">
  //     <div className="py-10 ">
  //       <p className="text-3xl">Welcome!</p>
  //       <p className="text-xl">Choose a stock to start</p>
  //       <input
  //         value={text}
  //         type="text"
  //         maxLength={4}
  //         className="border rounded-md p-2 mt-3 hover:cursor-pointer"
  //         placeholder="Type here..."
  //         onChange={(e) => {
  //           setText(e.target.value.toUpperCase());
  //         }}
  //       />
  //     </div>
  //     <div className="w-full flex">
  //       <div className="w-2/4 bg-white p-5 rounded-md shadow-xl">
  //         <p className="pb-5 font-semibold text-xl">Foreign Flow</p>
  //         <Line options={options} data={lineChart} />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Dashboard;
