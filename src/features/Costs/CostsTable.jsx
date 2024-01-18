import { compareDesc } from "date-fns";
import Spinner from "../../ui/Spinner";
import TableHead from "../../ui/TableHead";
import CostTableRow from "./CostTableRow";
import NewCostTableRow from "./NewCostTableRow";
import { useCosts } from "./useCosts";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function CostsTable({ newCost, setNewCost }) {
  const { costs, isLoadingCosts } = useCosts();
  const [searcParams] = useSearchParams();

  const page = Number(searcParams.get("page")) || 1;

  const NUM_RESULT = 10;
  if (isLoadingCosts) return <Spinner />;

  const pagedCosts = costs.costs.slice(
    page > 0 ? NUM_RESULT * page - NUM_RESULT : 1,
    page <= Math.ceil(costs.costs.length / NUM_RESULT)
      ? NUM_RESULT * page
      : Math.ceil(costs.costs.length / NUM_RESULT),
  );

  return (
    <>
      <table className="w-full table-fixed border-collapse overflow-hidden rounded-3xl border-2 border-hidden p-2 text-xs shadow-lg md:w-[90%] md:text-base">
        <TableHead
          headers={[
            "Ad, md:w-[25%]",
            "Tarix, w-[25%] md:w-[20%]",
            "Miqdar, md:w-[15%]",
            "Qiymət, md:w-[15%]",
            "Cəm, md:w-[15%]",
            ", w-[10%] md:table-cell hidden",
          ]}
        />
        <tbody className="text-center">
          {newCost && (
            <NewCostTableRow newCost={newCost} setNewCost={setNewCost} />
          )}
          {pagedCosts
            .sort((a, b) =>
              compareDesc(new Date(a.created_at), new Date(b.created_at)),
            )
            .map((cost) => (
              <CostTableRow key={cost.id} cost={cost} />
            ))}
        </tbody>
      </table>
      <Pagination object={costs.costs} pageResult={NUM_RESULT} />
    </>
  );
}

export default CostsTable;
