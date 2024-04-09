import HistoryTable from "../features/History/HistoryTable";

function HistoryPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-between pt-4 md:flex-row md:px-24">
        <h1 className=" text-xl font-bold">Tarixçə</h1>
      </div>
      <div
        className={`flex flex-col items-center justify-center gap-4 p-6 transition-all`}
      >
        <HistoryTable />
      </div>
    </>
  );
}

export default HistoryPage;
