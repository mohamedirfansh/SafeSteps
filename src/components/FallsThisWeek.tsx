import FallsChart from "./FallsChart";
import type { FC } from "react";

const FallsThisWeek: FC = function () {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="shrink-0">
          <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
            18
          </span>
          <h3 className="text-base font-normal text-gray-600 dark:text-gray-400">
            Stumbles detected this week
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-end text-base font-bold text-green-600 dark:text-green-400">
          12.5%
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <FallsChart />
    </div>
  );
};

export default FallsThisWeek;