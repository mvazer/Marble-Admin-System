import { format } from "date-fns";
import { formatNumber } from "../../utils/helpers";

function TransactionsTableRow({ cash }) {
  return (
    <tr>
      <td className="h-14 p-2 px-6">{cash.name}</td>
      <td className="h-14 p-2 px-6">{format(cash.created_at, "yyyy.MM.dd")}</td>
      <td className="h-14 p-2 px-6">
        <div
          className={`${
            cash.value < 0
              ? "bg-red-800 text-red-50"
              : "bg-green-800 text-green-50"
          } mx-auto rounded-full py-1 md:w-24 `}
        >
          <span className="md:text-sm">₼ </span>
          <span className="md:text-lg ">
            {formatNumber(Math.abs(cash.value))}
          </span>
        </div>
      </td>
    </tr>
  );
}

export default TransactionsTableRow;
