import Spinner from "../../ui/Spinner";
import TableHead from "../../ui/TableHead";
import { formatCurrency } from "../../utils/helpers";
import SaleTotalTableRow from "../Sales/SaleTotalTableRow";
import { useSales } from "../Sales/useSales";
import { useSalesTotalCustomer } from "../Sales/useSalesTotal";
import { useProducts } from "../Warehouse/useProducts";
import { useCustomerById } from "./useCustomer";

function CustomerSalesData() {
  const { customer, isLoadingCustomer } = useCustomerById();
  const { salesTotalCustomer, isSalesTotalCustomerLoading } =
    useSalesTotalCustomer();
  const { products, isLoading: isProductsLoading } = useProducts();
  const { sales, isSalesLoading } = useSales();

  const isLoading =
    isLoadingCustomer ||
    isSalesTotalCustomerLoading ||
    isProductsLoading ||
    isSalesLoading;

  if (isLoading) return <Spinner />;

  const sumRevenue = salesTotalCustomer.saleTotal.reduce(
    (acc, cur) => acc + cur.totalRevenue,
    0,
  );

  const sumLeftPayment = salesTotalCustomer.saleTotal.reduce(
    (acc, cur) => acc + cur.totalRevenue - cur.paid,
    0,
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="px-24 pt-6 text-xl font-bold">
          Müştəri: {customer.customer[0]?.name}
        </h1>
        <div className="flex gap-4 pr-24">
          <h1 className=" text pt-6">
            Qalıq borc:{" "}
            {sumLeftPayment === 0 ? (
              <span className="mx-auto w-fit rounded-xl bg-green-800/90  px-3 py-[0.05rem] font-semibold text-slate-50">
                Ödənilib
              </span>
            ) : (
              <span className="font-semibold">
                {formatCurrency(sumLeftPayment)}
              </span>
            )}
          </h1>
          <h1 className=" text pt-6">
            Ümumi satış:{" "}
            <span className="font-semibold">{formatCurrency(sumRevenue)}</span>
          </h1>
        </div>
      </div>
      <div className="flex justify-center p-6">
        {salesTotalCustomer.saleTotal.length > 0 ? (
          <table className="w-[90%] table-fixed border-collapse overflow-hidden rounded-3xl border-2 border-hidden  p-2  shadow-lg ">
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
            {salesTotalCustomer.saleTotal.map((total, i) => (
              <SaleTotalTableRow
                numSale={i + 1}
                key={total.id}
                total={total}
                customers={customer.customer}
                sales={sales.sale}
                products={products.product}
              />
            ))}
          </table>
        ) : (
          <div>Müştərinin heç bir alışı yoxdur.</div>
        )}
      </div>
    </>
  );
}

export default CustomerSalesData;
