import { compareAsc, differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { HiOutlineEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../../ui/SpinnerMini";
import { formatNumber } from "../../utils/helpers";
import { useSalesTotal } from "../Sales/useSalesTotal";

function OrderStatus() {
  const [active, setActive] = useState("delaying");

  const { salesTotal, isSalesTotalLoading } = useSalesTotal();
  const navigate = useNavigate();
  function clickHandler(e) {
    setActive(e.target.value);
  }

  function endDuration(endDate) {
    return differenceInCalendarDays(new Date(endDate), new Date());
  }

  if (isSalesTotalLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <SpinnerMini />
      </div>
    );
  const delayingOrders = salesTotal.saleTotal
    .filter(
      (sale) => endDuration(sale.endDate) <= 5 && sale.isFinished === false,
    )
    .sort((a, b) => compareAsc(new Date(a.endDate), new Date(b.endDate)));

  const unpaidOrders = salesTotal.saleTotal
    .filter((sale) => sale.totalRevenue > sale.paid)
    .sort((a, b) => compareAsc(new Date(a.endDate), new Date(b.endDate)));

  let activeOrders;

  if (active === "delaying") activeOrders = delayingOrders;
  if (active === "unpaid") activeOrders = unpaidOrders;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className=" text-center text-xl font-bold uppercase">Sifarişlər</h1>
      <div className="flex flex-col">
        <button
          onClick={clickHandler}
          value="delaying"
          className={`${
            active === "delaying"
              ? "bg-slate-800 text-slate-50 hover:bg-slate-900"
              : " bg-transparent"
          } mx-px rounded-md border border-slate-300 px-4 py-2 text-center text-sm font-semibold shadow-md transition-all duration-150 hover:bg-slate-100`}
        >
          Gecikənlər
        </button>
        <button
          onClick={clickHandler}
          value="unpaid"
          className={`${
            active === "unpaid"
              ? "bg-slate-800 text-slate-50 hover:bg-slate-900"
              : " bg-transparent"
          } mx-px rounded-md border border-slate-300 px-4 py-2 text-center text-sm font-semibold shadow-md transition-all duration-150 hover:bg-slate-100`}
        >
          Ödənilməyənlər
        </button>
      </div>

      <ul className="h-52 overflow-auto">
        {activeOrders.map((sale, i) => (
          <li
            className="my-2 flex items-center justify-between gap-3 rounded-lg shadow-sm border border-slate-300 p-2 text-sm"
            key={sale.id}
          >
            <span>Sifariş №{i + 1}</span>
            <div className="flex flex-col text-center">
              {active === "delaying" && (
                <>
                  <span
                    className={`${
                      endDuration(sale.endDate) <= 3
                        ? "bg-red-800"
                        : "bg-green-800/90"
                    } mx-auto w-fit rounded-xl px-3 py-[0.05rem] text-slate-50`}
                  >
                    {endDuration(sale.endDate) === 0 && "Bugün"}{" "}
                    {endDuration(sale.endDate) > 0 &&
                      `${endDuration(sale.endDate)} gün`}
                    {endDuration(sale.endDate) < 0 &&
                      `${Math.abs(endDuration(sale.endDate))} gün gecikib`}
                  </span>
                  <span className="text-sm text-slate-600">{sale.endDate}</span>
                </>
              )}
              {active === "unpaid" && (
                <span className="font-semibold">
                  ₼ {formatNumber(sale.totalRevenue - sale.paid)}
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`../sales/${sale.id}`);
              }}
              className="rounded-full p-2 transition-all hover:bg-green-600/25 disabled:cursor-not-allowed"
            >
              <HiOutlineEye />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderStatus;
