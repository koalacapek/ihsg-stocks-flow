import { LineChart } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex w-screen bg-[rgb(249, 250, 251)] p-7 shadow-lg">
      <div className="flex items-center gap-3">
        <LineChart className="h-6 w-6" />
        <h1 className="text-xl font-semibold">IDX Foreign Flow Dashboard</h1>
      </div>
    </div>
  );
};

export default Navbar;
