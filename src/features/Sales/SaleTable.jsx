import Spinner from "../../ui/Spinner";
import TableHead from "../../ui/TableHead";
import { useCustomer } from "../Customers/useCustomer";
import { useProducts } from "../Warehouse/useProducts";
import SaleTotalTableRow from "./SaleTotalTableRow";
import { useSales } from "./useSales";
import { useSaleTotalId } from "./useSalesTotal";

function SaleTable() {
  const { products, isLoading: isProductsLoading } = useProducts();
  const { sales, isSalesLoading } = useSales();
  const { customers, isLoadingCustomers } = useCustomer();
  const { saleTotalId, isSalesTotalIdLoading } = useSaleTotalId();

  const isLoading =
    isProductsLoading ||
    isSalesLoading ||
    isLoadingCustomers ||
    isSalesTotalIdLoading;
  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="px-24 pt-6 text-xl font-bold">Satış</h1>
      </div>
      <div className="flex justify-center p-6">
        <table className="w-[90%] table-fixed border-collapse overflow-hidden rounded-3xl border-2 border-hidden border-violet-300 p-2  shadow-lg ">
          <TableHead
            headers={[
              "№",
              "Müştəri",
              "Son tarix, w-[17%]",
              "Qalıq borc",
              "Mənfəət",
              "Gəlir",
            ]}
          />

          <SaleTotalTableRow
            numSale={1}
            total={saleTotalId.saleTotal[0]}
            customers={customers.customer}
            sales={sales.sale}
            products={products.product}
          />
        </table>
      </div>
    </>
  );
}

export default SaleTable;
