import { compareAsc, compareDesc } from "date-fns";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import TableHead from "../../ui/TableHead";
import { useCustomer } from "../Customers/useCustomer";
import { useProducts } from "../Warehouse/useProducts";
import SaleTotalTableRow from "./SaleTotalTableRow";
import { useSales } from "./useSales";
import { useSalesTotal, useSalesTotalDeleted } from "./useSalesTotal";

function SalesTable() {
  const { sales, isSalesLoading } = useSales();
  const { customers, isLoadingCustomers } = useCustomer();
  const { salesTotal, isSalesTotalLoading } = useSalesTotal();
  const { deletedSalesTotal, isDeletedSalesTotalLoading } =
    useSalesTotalDeleted();
  const { products, isLoading: isProductsLoading } = useProducts();
  const [searcParams] = useSearchParams();

  const isLoading =
    isSalesLoading ||
    isSalesTotalLoading ||
    isLoadingCustomers ||
    isDeletedSalesTotalLoading ||
    isProductsLoading;

  const sortBy = searcParams.get("sortBy") || "createDateDesc";
  if (isLoading) return <Spinner />;

  const filterBy = searcParams.get("filterBy") || "all";

  const page = Number(searcParams.get("page")) || 1;

  const NUM_RESULT = 10;

  const filteredProducts =
    filterBy === "deleted"
      ? deletedSalesTotal.saleTotal
      : salesTotal.saleTotal.filter(
          (saleTotal) =>
            filterBy === "all" ||
            (filterBy === "paid" &&
              saleTotal.paid === saleTotal.totalRevenue) ||
            (filterBy === "unpaid" && saleTotal.paid !== saleTotal.totalRevenue)
        );

  //created_at, endDate, totalRevenue

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === "createDateDesc")
      return compareDesc(new Date(a.created_at), new Date(b.created_at));
    if (sortBy === "createDateAsc")
      return compareAsc(new Date(a.created_at), new Date(b.created_at));
    if (sortBy === "endDateAsc") {
      if (a.isFinished) return 1;
      if (b.isFinished) return -1;
      else if (b.endDate === "Son tarix yoxdu") return -1;
      return compareAsc(new Date(a.endDate), new Date(b.endDate));
    }
    if (sortBy === "endDateDesc") {
      if (a.isFinished) return 1;
      if (b.isFinished) return -1;
      if (a.endDate === "Son tarix yoxdu") return -1;
      return compareDesc(new Date(a.endDate), new Date(b.endDate));
    }
    if (sortBy === "revenueAsc") return b.totalRevenue - a.totalRevenue;
    if (sortBy === "revenueDesc") return a.totalRevenue - b.totalRevenue;
  });

  const pagedProducts = sortedProducts.slice(
    page > 0 ? NUM_RESULT * page - NUM_RESULT : 1,
    page <= Math.ceil(sortedProducts.length / NUM_RESULT)
      ? NUM_RESULT * page
      : Math.ceil(sortedProducts.length / NUM_RESULT)
  );

  return (
    <>
      <table className="w-full table-fixed border-collapse overflow-hidden rounded-3xl border-2 border-hidden p-2 text-xs shadow-lg md:w-[90%] md:text-base ">
        <TableHead
          headers={[
            "№, hidden md:table-cell",
            "Müştəri",
            "Son tarix, w-[17%] hidden md:table-cell",
            "Qalıq borc",
            "Mənfəət, hidden md:table-cell",
            "Gəlir,",
          ]}
        />
        <>
          {pagedProducts
            .sort((a, b) => b - a)
            .map((total, i) => (
              <SaleTotalTableRow
                key={total.id}
                numSale={page * NUM_RESULT - NUM_RESULT + i + 1}
                total={total}
                customers={customers.customer}
                sales={sales.sale}
                products={products.product}
              />
            ))}
        </>
      </table>
      <Pagination object={sortedProducts} pageResult={NUM_RESULT} />
    </>
  );
}

export default SalesTable;
