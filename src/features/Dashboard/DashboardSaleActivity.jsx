import { useState } from "react";
import { formatNumber } from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";

function DashboardSaleActivity({
  sumSales,
  sumPaid,
  sumSalesProfit,
  sumSalesCosts,
  sumCosts,
}) {
  const [searcParams] = useSearchParams();
  const time = searcParams.get("filterBy")|| "month";


  return (
    <div className="flex-col p-4">
      <h1 className="pb-6 text-center text-xl font-bold uppercase">
        Fəaliyyətlər
      </h1>
      <div className="flex">
        <h1 className="self-end pt-6 text-2xl font-bold">₼</h1>
        <h1 className="px-3 pt-6 text-5xl font-bold">
          {formatNumber(sumPaid(time))}
        </h1>
      </div>
      <p>ödnənilən</p>
      <p>
        <span className="text-red-800">
          ₼ {formatNumber(sumSales(time) - sumPaid(time))}{" "}
        </span>
        qalıq borc
      </p>
      <div
        className={`${
          sumSalesProfit(time) < sumCosts(time) ? "text-red-800 " : ""
        } flex`}
      >
        <h1 className="self-end pt-6 text-2xl font-bold">₼</h1>
        <h1 className="px-3 pt-6 text-5xl font-bold">
          {formatNumber(sumSalesProfit(time) - sumCosts(time))}
        </h1>
      </div>
      <p>{sumSalesProfit(time) < sumCosts(time) ? "ziyan" : "mənfəət"}</p>
      <div className="flex">
        <h1 className="self-end pt-6 text-2xl font-bold">₼</h1>
        <h1 className="px-3 pt-6 text-5xl font-bold">
          {formatNumber(sumCosts(time) + sumSalesCosts(time))}
        </h1>
      </div>
      <p>xərc</p>
    </div>
  );
}

export default DashboardSaleActivity;
