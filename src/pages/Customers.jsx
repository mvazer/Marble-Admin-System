import CustomerTable from "../features/Customers/CustomerTable";

function Customers() {
  return (
    <>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <h1 className="pt-6 text-xl font-bold md:px-24">Müştərilər</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <CustomerTable />
      </div>
    </>
  );
}

export default Customers;
