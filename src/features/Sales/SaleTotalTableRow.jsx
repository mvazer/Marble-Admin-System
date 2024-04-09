import { differenceInCalendarDays, differenceInDays } from "date-fns";
import { useRef, useState } from "react";
import {
  HiChevronDown,
  HiOutlineDocument,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import SaleEditForm from "./SaleEditForm";
import SaleTableRow from "./SaleTableRow";
import SaleDeleteForm from "./SaleDeleteForm";
import { useNavigate } from "react-router-dom";

function SaleTotalTableRow({ total, customers, sales, products, numSale }) {
  const [collapse, setCollapse] = useState(false);
  const [hover, setHover] = useState(false);
  const [toggle, setToggle] = useState("");
  const navigate = useNavigate();
  const buttonRef = useRef();

  const {
    endDate,
    customer_id,
    id,
    totalRevenue,
    totalProfit,
    paid,
    isFinished,
    isDeleted,
  } = total;
  const filteredSales = sales.filter((obj) => obj.sale_id === id);
  const customer = customers.find((obj) => obj.id === customer_id);
  const endDuration = differenceInCalendarDays(new Date(endDate), new Date());

  return (
    <>
      <tbody className={`${!collapse ? "" : "rounded-lg shadow-md"}`}>
        <tr
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={(e) =>
            !buttonRef.current.contains(e.target) && setCollapse((v) => !v)
          }
          className={`${
            hover ? "cursor-pointer  md:shadow-md  shadow-none" : ""
          } border-b border-slate-300  text-center transition-all`}
        >
          <td className="p-4 px-6 hidden md:block">
            <div className="flex  items-center justify-center gap-3">
              <div className={`${!collapse && "-rotate-90"} transition-all `}>
                <HiChevronDown />
              </div>
              <span className="p-4 px-6">{numSale}</span>
            </div>
          </td>
          <td className="p-4 px-6">{customer.name}</td>
          <td className="p-4 px-6 hidden md:block ">
            <div className="flex flex-col gap-2 text-center ">
              {!isFinished ? (
                <>
                  <span
                    className={`${
                      endDuration <= 3
                        ? "bg-red-800"
                        : "bg-slate-300/70 text-slate-950"
                    } mx-auto w-fit rounded-xl px-3 py-[0.05rem] text-slate-50`}
                  >
                    {endDate === "Son tarix yoxdu" && "Müddətsiz"}
                    {endDuration === 0 && "Bugün"}{" "}
                    {endDuration > 0 && `${endDuration} gün`}
                    {endDuration < 0 && `${Math.abs(endDuration)} gün gecikib`}
                  </span>
                  {endDate !== "Son tarix yoxdu" && (
                    <span className="text-sm text-slate-600">{endDate}</span>
                  )}
                </>
              ) : (
                <span className="mx-auto w-fit rounded-xl bg-green-800/90 px-3 py-[0.05rem] text-slate-50">
                  Tamamlanıb
                </span>
              )}
            </div>
          </td>
          <td className=" p-4 px-6">
            <span
              className={`${
                totalRevenue === paid
                  ? "mx-auto w-fit rounded-xl bg-green-800/90  px-3 py-[0.05rem] text-slate-50"
                  : ""
              } `}
            >
              {totalRevenue === paid
                ? "Ödənilib"
                : formatCurrency(totalRevenue - paid)}
            </span>
          </td>
          <td className=" p-4 px-6 hidden md:block">
            {formatCurrency(totalProfit)}
          </td>
          <td className="p-4 px-6">
            <div className=" flex items-center justify-center">
              <span
                className={`${
                  isDeleted
                    ? ""
                    : !hover
                      ? "md:visible opacity-100 "
                      : "md:invisible visible opacity-100"
                } font-semibold`}
              >
                {formatCurrency(totalRevenue)}
              </span>
              <div
                ref={buttonRef}
                className={`${
                  hover && !isDeleted
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                } absolute transition-all duration-300 hidden md:flex`}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/sales/${id}`);
                  }}
                  className="rounded-full p-2 transition-all hover:bg-green-600/25 disabled:cursor-not-allowed"
                >
                  <HiOutlineEye />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/sales/invoice/${id}`);
                  }}
                  className="rounded-full p-2 transition-all hover:bg-green-600/25 disabled:cursor-not-allowed"
                >
                  <HiOutlineDocument />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (isFinished && totalRevenue === paid) return;
                    toggle === "edit" ? setToggle("") : setToggle("edit");
                  }}
                  disabled={isFinished && totalRevenue === paid}
                  className="rounded-full p-2 transition-all hover:bg-green-600/25 disabled:cursor-not-allowed"
                >
                  <HiOutlinePencil />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggle === "delete" ? setToggle("") : setToggle("delete");
                  }}
                  className="rounded-full p-2 transition-all hover:bg-green-600/25"
                >
                  <HiOutlineTrash />
                </button>
              </div>
            </div>
          </td>
        </tr>

        {collapse && (
          <>
            <tr className="border-b border-slate-300  text-center hidden md:table-row">
              <td className="p-4 px-6 pl-16 font-semibold">Məhsul</td>
              <td className="p-4 px-6 font-semibold">Palet №</td>
              <td className="p-4 px-6 font-semibold">Ölçü</td>
              <td className="p-4 px-6 font-semibold">Miqdar</td>
              <td className="p-4 px-6 font-semibold">Satış qiyməti</td>
              <td className="p-4 px-6 font-semibold">Ümumi qiymət</td>
            </tr>
            {filteredSales.map((sale) => (
              <SaleTableRow key={sale.id} products={products} sale={sale} />
            ))}
          </>
        )}
      </tbody>
      {toggle === "edit" && (
        <SaleEditForm
          setToggle={setToggle}
          leftPayment={totalRevenue - paid}
          id={id}
          paid={paid}
          isFinishedInitial={isFinished}
        />
      )}
      {toggle === "delete" && (
        <SaleDeleteForm
          setToggle={setToggle}
          id={id}
          filteredSales={filteredSales}
          products={products}
        />
      )}
    </>
  );
}

export default SaleTotalTableRow;
