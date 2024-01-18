import { useSearchParams } from "react-router-dom";
import { formatNumber } from "../../utils/helpers";

function DashboardSaleInfo({ sumSales }) {
  const [searcParams] = useSearchParams();
  const time = searcParams.get("filterBy")|| "month";

  return (
    <div className="flex-col p-4">
      <h1 className="pb-6 text-center text-xl font-bold uppercase">Satış</h1>
      <div className="flex">
        <h1 className="self-end pt-6 text-2xl font-bold">₼</h1>
        <h1 className="px-3 pt-6 text-5xl font-bold">
          {formatNumber(sumSales(time))}
        </h1>
      </div>
      <p>
        {time === "month" && "bu ay"}
        {time === "prevMonth" && "keçən ay"}
        {time === "year" && "bu il"}
        {time === "all" && "ümumi"}
      </p>
      <p
        className={`${
          time === "month" ? "visible opacity-100" : "invisible opacity-0"
        } transition-all`}
      >
        <span
          className={`${
            sumSales(time) - sumSales("prevMonth") >= 0
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          {sumSales(time) - sumSales("prevMonth") >= 0 ? "+" : "-"} ₼{" "}
          {Math.abs(sumSales(time) - sumSales("prevMonth"))}{" "}
        </span>
        keçən aya nisbətən
      </p>
      <div className="flex">
        <h1 className="self-end pt-6 text-2xl font-bold">₼</h1>
        <h1 className="px-3 pt-6 text-5xl font-bold">
          {formatNumber(sumSales("day"))}
        </h1>
      </div>
      <p>bu gün</p>
      <div className="flex">
        <h1 className="self-end pt-6 text-2xl font-bold">₼</h1>
        <h1 className="px-3 pt-6 text-5xl font-bold">
          {formatNumber(sumSales("prevDay"))}
        </h1>
      </div>
      <p>dünən</p>
    </div>
  );
}

export default DashboardSaleInfo;
