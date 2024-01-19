import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import TableHead from "../../ui/TableHead";
import { useSalesTotal } from "../Sales/useSalesTotal";
import CustomerTableRow from "./CustomerTableRow";
import { useCustomer } from "./useCustomer";

function CustomerTable() {
  const { customers, isLoadingCustomers } = useCustomer();
  const { salesTotal, isSalesTotalLoading } = useSalesTotal();
  const [searcParams] = useSearchParams();

  const page = Number(searcParams.get("page")) || 1;

  const NUM_RESULT = 10;

  if (isLoadingCustomers || isSalesTotalLoading) return <Spinner />;

  const pagedCustomer = customers.customer.slice(
    page > 0 ? NUM_RESULT * page - NUM_RESULT : 1,
    page <= Math.ceil(customers.customer.length / NUM_RESULT)
      ? NUM_RESULT * page
      : Math.ceil(customers.customer.length / NUM_RESULT),
  );
  return (
    <>
      <table className="w-full table-fixed border-collapse overflow-hidden rounded-3xl border-2 border-hidden p-2 text-xs shadow-lg md:w-[90%] md:text-base">
        <TableHead
          headers={[
            "Ad",
            "Əlaqə,md:table-cell hidden w-[35%] w-fit",
            "Qeyd, hidden lg:table-cell",
            "Gəlir",
            "Qalıq borc",
            ",hidden md:table-cell",
          ]}
        />
        <tbody>
          {pagedCustomer.map((obj) => (
            <CustomerTableRow
              key={obj.id}
              salesTotal={salesTotal.saleTotal}
              customer={obj}
            />
          ))}
        </tbody>
      </table>
      <Pagination object={customers.customer} pageResult={NUM_RESULT} />
    </>
  );
}

export default CustomerTable;
