import { compareDesc } from "date-fns";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import TableHead from "../../ui/TableHead";
import HistoryTableRow from "./HistoryTableRow";
import { useHistory } from "./useHistory";

function HistoryTable() {
  const { history, isLoadingHistory } = useHistory();

  const [searcParams] = useSearchParams();


  const isLoading = isLoadingHistory;

  const page = Number(searcParams.get("page")) || 1;

  const NUM_RESULT = 10;

  if (isLoading) return <Spinner />;

  const pagedCash = history.history
    .sort((a, b) => compareDesc(new Date(a.created_at), new Date(b.created_at)))
    .slice(
      page > 0 ? NUM_RESULT * page - NUM_RESULT : 1,
      page <= Math.ceil(history.history.length / NUM_RESULT)
        ? NUM_RESULT * page
        : Math.ceil(history.history.length / NUM_RESULT)
    );

  return (
    <>
      <table className="w-full table-fixed border-collapse overflow-hidden rounded-3xl border-2 border-hidden p-2 text-center text-xs shadow-lg md:w-[90%] md:text-base ">
        <TableHead headers={["İstifadəçi", "Tarix", "Hadisə", "Məlumat",]} />
        <tbody>
          {pagedCash.map((obj) => (
            <HistoryTableRow key={obj.id} item={obj} />
          ))}
        </tbody>
      </table>
      <Pagination object={history.history} pageResult={NUM_RESULT} />
    </>
  );
}

export default HistoryTable;
