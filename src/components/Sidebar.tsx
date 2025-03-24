import { BookOpenIcon } from "@heroicons/react/24/outline";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { BarsArrowUpIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/outline";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-fit h-screen justify-between bg-[rgb(249, 250, 251)]  px-4">
      <div className="flex flex-col items-center gap-10 mt-7">
        {/* <img src={UniElectives} className="logo" alt="Unilectives" /> */}
        <div className="w-12 h-12"></div>
        <BookOpenIcon height={25} width={27} />
        <ShieldCheckIcon height={25} width={27} />
      </div>
      <div className="flex flex-col items-center gap-10 mb-16">
        <BarsArrowUpIcon
          height={25}
          width={27}
          style={{ transform: "rotate(90deg)" }}
        />
        <UserCircleIcon height={25} width={27} />
        <div className="p-2 hover:bg-gray-400/50 transition-all rounded-lg duration-100">
          <MoonIcon height={25} width={27} />
        </div>
        <ArrowRightEndOnRectangleIcon height={25} width={27} />
      </div>
    </div>
  );
};

export default Sidebar;
