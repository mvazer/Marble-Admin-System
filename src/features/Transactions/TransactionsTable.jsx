import { compareDesc } from "date-fns";
import Spinner from "../../ui/Spinner";
import TableHead from "../../ui/TableHead";
import { useCash } from "../Cash/useCash";
import TransactionsTableInputRow from "./TransactionsTableInputRow";
import TransactionsTableRow from "./TransactionsTableRow";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";

function TransactionsTable({ newTransaction, setNewTransaction }) {
  const { cash, isLoadingCash } = useCash();
  const [searcParams] = useSearchParams();
  const isLoading = isLoadingCash;

  const page = Number(searcParams.get("page")) || 1;

  const NUM_RESULT = 10;

  if (isLoading) return <Spinner />;

  const pagedCash = cash.cash.slice(
    page > 0 ? NUM_RESULT * page - NUM_RESULT : 1,
    page <= Math.ceil(cash.cash.length / NUM_RESULT)
      ? NUM_RESULT * page
      : Math.ceil(cash.cash.length / NUM_RESULT),
  );

  return (
    <>
      <table className="w-full table-fixed border-collapse overflow-hidden rounded-3xl border-2 border-hidden p-2 text-center text-xs shadow-lg md:w-[90%] md:text-base ">
        <TableHead headers={["Ad, pl-8", "Tarix", "Qiymət", ", w-[10%]"]} />
        <tbody>
          {newTransaction && (
            <TransactionsTableInputRow setNewTransaction={setNewTransaction} />
          )}
          {pagedCash
            .sort((a, b) =>
              compareDesc(new Date(a.created_at), new Date(b.created_at)),
            )
            .map((obj) => (
              <TransactionsTableRow key={obj.id} cash={obj} />
            ))}
        </tbody>
      </table>
      <Pagination object={cash.cash} pageResult={NUM_RESULT} />
    </>
  );
}

export default TransactionsTable;
