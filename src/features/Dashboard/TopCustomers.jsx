import { HiOutlineEye } from "react-icons/hi2";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatCurrencyNumber } from "../../utils/helpers";

function TopCustomers({ topCustomers }) {
  const [searcParams] = useSearchParams();
  const time =
    searcParams.get("filterBy")?.length > 0
      ? searcParams.get("filterBy")
      : "month";
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <h1 className="pb-6 text-center text-xl font-bold uppercase">
        Ən çox alış edən müştərilər
      </h1>

      <ul className="h-52 overflow-auto">
        {topCustomers(time).map((customer) => (
          <li
            className="my-2 flex items-center justify-between  gap-3 rounded-lg border border-slate-300 shadow-sm p-2 text-sm"
            key={customer.customer_id}
          >
            <div>{customer.customer}</div>
            <div className="ml-auto mr-10">
              {formatCurrencyNumber(customer.totalValue)}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`../customers/${customer.customer_id}`);
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

export default TopCustomers;
