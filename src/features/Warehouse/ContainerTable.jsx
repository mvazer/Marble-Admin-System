import { compareDesc } from "date-fns";
import Spinner from "../../ui/Spinner";
import TableHead from "../../ui/TableHead";
import ContainerTableRow from "./ContainerTableRow";
import { useContainers } from "./useContainers";

function ContainerTable() {
  const { containers, isContainersLoading } = useContainers();
  if (isContainersLoading) return <Spinner />;
 
  return (
    <>
      <table className="w-full table-fixed border-collapse overflow-hidden rounded-3xl border-2 border-hidden p-2 text-xs shadow-lg md:w-[90%] md:text-base">
        <TableHead
          headers={[
            "Gəliş tarixi, w-[20%]",
            "Ölkə",
            "Gömrük xərci",
            "Yol xərci",
            "Əlavə xərclər",
            "Ümumi",
          ]}
        />
        <tbody>
          {containers.container
            .sort((a, b) =>
              compareDesc(new Date(a.created_at), new Date(b.created_at))
            )
            .map((cur) => (
              <ContainerTableRow key={cur.id} item={cur} />
            ))}
        </tbody>
      </table>
      {/* <Pagination object={sortedProducts} pageResult={NUM_RESULT} /> */}
    </>
  );
}

export default ContainerTable;
