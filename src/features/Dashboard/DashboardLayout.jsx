import {
  compareAsc,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isSameYear,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
} from "date-fns";
import Filter from "../../ui/Filter";
import Spinner from "../../ui/Spinner";
import { useCash } from "../Cash/useCash";
import { useCosts } from "../Costs/useCosts";
import { useCustomer } from "../Customers/useCustomer";
import { useSales } from "../Sales/useSales";
import { useSalesTotal } from "../Sales/useSalesTotal";
import { useProducts } from "../Warehouse/useProducts";
import AssetsInfo from "./AssetsInfo";
import DashboardSaleActivity from "./DashboardSaleActivity";
import DashboardSaleInfo from "./DashboardSaleInfo";
import OrderStatus from "./OrderStatus";
import ProductDataChart from "./ProductDataChart";
import SaleDataChart from "./SaleDataChart";
import TopCustomers from "./TopCustomers";

function DashboardLayout() {
  const { salesTotal, isSalesTotalLoading } = useSalesTotal();
  const { products, isLoading: isProductsLoading } = useProducts();
  const { customers, isLoadingCustomers } = useCustomer();
  const { costs, isLoadingCosts } = useCosts();
  const { sales, isSalesLoading } = useSales();
  const { cash, isLoadingCash } = useCash();
  const isLoading =
    isSalesTotalLoading ||
    isProductsLoading ||
    isLoadingCosts ||
    isSalesLoading ||
    isLoadingCustomers ||
    isLoadingCash;

  if (isLoading) return <Spinner />;

  function timeFilter(arr, time = "all") {
    return arr.filter((cur) => {
      if (time === "day")
        return isSameDay(new Date(cur.created_at), new Date());
      if (time === "prevDay")
        return isSameDay(new Date(cur.created_at), subDays(new Date(), 1));
      if (time === "week")
        return isSameWeek(new Date(cur.created_at), new Date());
      if (time === "month")
        return isSameMonth(new Date(cur.created_at), new Date());
      if (time === "prevMonth")
        return isSameMonth(new Date(cur.created_at), subMonths(new Date(), 1));
      if (time === "year")
        return isSameYear(new Date(cur.created_at), new Date());
      else return cur;
    });
  }

  //salesTotal
  function sumSales(time) {
    return timeFilter(salesTotal.saleTotal, time).reduce(
      (acc, cur) => acc + cur.totalRevenue,
      0,
    );
  }

  function sumPaid(time) {
    return timeFilter(salesTotal.saleTotal, time).reduce(
      (acc, cur) => acc + cur.paid,
      0,
    );
  }

  function sumSalesProfit(time) {
    return timeFilter(salesTotal.saleTotal, time).reduce(
      (acc, cur) => acc + cur.totalProfit,
      0,
    );
  }

  function sumSalesCosts(time) {
    return timeFilter(salesTotal.saleTotal, time).reduce(
      (acc, cur) => acc + cur.extraCosts,
      0,
    );
  }

  function salesDaily(months = 0) {
    if (salesTotal.saleTotal.length <= 0) return;
    const firstSale = salesTotal.saleTotal.sort((a, b) =>
      compareAsc(new Date(a.endDate), new Date(b.endDate)),
    )[0].created_at;
    const result = eachDayOfInterval({
      start:
        months === -1
          ? new Date(firstSale)
          : months === 12
            ? startOfYear(new Date())
            : startOfMonth(subMonths(new Date(), months)),
      end:
        months === 0 || months === -1 || months === 12
          ? new Date()
          : endOfMonth(subMonths(new Date(), months)),
    }).map((cur) => {
      return { label: cur, totalProfit: 0, totalRevenue: 0 };
    });

    return result
      .reduce(
        (acc, cur) => {
          salesTotal.saleTotal.forEach((saleTotal) => {
            if (
              isSameDay(new Date(saleTotal.created_at), new Date(cur.label))
            ) {
              cur.totalRevenue = cur.totalRevenue + saleTotal.totalRevenue;
              cur.totalProfit = cur.totalProfit + saleTotal.totalProfit;
            }
          });
          return acc;
        },
        [result],
      )[0]
      .map((cur) => {
        return { ...cur, label: format(new Date(cur.label), "MMM dd") };
      });
  }

  //costs
  function sumCosts(time) {
    return timeFilter(costs.costs, time).reduce(
      (acc, cur) => acc + cur.quantity * cur.value,
      0,
    );
  }

  //products
  function sumProductsValue(time) {
    return timeFilter(products.product, time).reduce(
      (acc, cur) => acc + cur.quantity * cur.cost,
      0,
    );
  }

  function findProduct(id, key) {
    return products.product.find((value) => value.id === id)[key];
  }

  function findCustomer(id, key) {
    return customers.customer.find((value) => value.id === id)[key];
  }

  //sales
  function mostSoldProductsWithDimensions(time) {
    return timeFilter(sales.sale, time).reduce((acc, cur) => {
      if (acc.some((value) => value.product_id === cur.product_id))
        acc.forEach(
          (v) =>
            (v.quantity =
              v.product_id === cur.product_id
                ? v.quantity + cur.quantity
                : v.quantity),
        );
      else if (
        acc.some((value) => {
          return (
            findProduct(cur.product_id, "name") === value.name &&
            +value.dimensions.split("x")[0] ===
              +findProduct(cur.product_id, "thickness") &&
            +value.dimensions.split("x")[1] ===
              +findProduct(cur.product_id, "width") &&
            +value.dimensions.split("x")[2] ===
              +findProduct(cur.product_id, "length")
          );
        })
      ) {
        acc.forEach((v) => {
          if (
            findProduct(cur.product_id, "name") === v.name &&
            +v.dimensions.split("x")[0] ===
              +findProduct(cur.product_id, "thickness") &&
            +v.dimensions.split("x")[1] ===
              +findProduct(cur.product_id, "width") &&
            +v.dimensions.split("x")[2] ===
              +findProduct(cur.product_id, "length")
          )
            v.quantity = v.quantity + cur.quantity;
        });
      } else
        acc.push({
          product_id: cur.product_id,
          name: findProduct(cur.product_id, "name"),
          dimensions:
            (findProduct(cur.product_id, "width") ===
              findProduct(cur.product_id, "length")) ===
            "Sərbəst boy"
              ? `${findProduct(cur.product_id, "thickness")}xPlaka`
              : `${findProduct(cur.product_id, "thickness")}x${findProduct(
                  cur.product_id,
                  "width",
                )}x${findProduct(cur.product_id, "length")}`,
          quantity: cur.quantity,
        });
      return acc;
    }, []);
  }

  function mostSoldProducts(time) {
    return timeFilter(mostSoldProductsWithDimensions(time)).reduce(
      (acc, cur) => {
        acc.some((value) => value.name === cur.name)
          ? acc.forEach(
              (v) =>
                (v.quantity =
                  v.name === cur.name ? v.quantity + cur.quantity : v.quantity),
            )
          : acc.push({ name: cur.name, quantity: cur.quantity });

        return acc;
      },
      [],
    );
  }

  //cash
  function sumCash(time) {
    return timeFilter(cash.cash, time).reduce((acc, cur) => acc + cur.value, 0);
  }

  function sumCashInvestments(time) {
    return timeFilter(cash.cash, time).reduce(
      (acc, cur) => (cur.value > 0 ? acc + cur.value : acc),
      0,
    );
  }

  //customers
  function topCustomers(time) {
    return timeFilter(salesTotal.saleTotal, time)
      .reduce((acc, cur) => {
        if (acc.some((value) => value.customer_id === cur.customer_id))
          acc.forEach((v) => {
            if (v.customer_id === cur.customer_id) {
              v.totalValue = cur.totalRevenue + v.totalValue;
            }
          });
        else
          acc.push({
            customer_id: cur.customer_id,
            customer: findCustomer(cur.customer_id, "name"),
            totalValue: cur.totalRevenue,
          });
        return acc;
      }, [])
      .sort((a, b) => b.totalValue - a.totalValue);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 py-4 pb-6 pl-0 md:flex-row md:gap-0 md:pl-8">
        <h1 className=" text-xl font-bold">İdarə paneli</h1>
        <Filter
          filterBy={[
            { value: "month", name: "Bu ay" },
            { value: "prevMonth", name: "Keçən ay" },
            { value: "year", name: "Bu il" },
            { value: "all", name: "Hamısı" },
          ]}
        />
      </div>
      <div className="mb-10 flex flex-col gap-8 md:grid md:grid-cols-2 md:grid-rows-[minmax(250px,_1fr)] md:gap-3 lg:grid-cols-4">
        <div className="row-span-2 rounded-lg border border-slate-300/30 shadow-md ">
          <AssetsInfo
            sumProductsValue={sumProductsValue}
            sumSales={sumSales}
            sumPaid={sumPaid}
            sumCosts={sumCosts}
            sumSalesCosts={sumSalesCosts}
            sumCash={sumCash}
            sumCashInvestments={sumCashInvestments}
          />
        </div>

        <div className="row-span-2 rounded-lg border border-slate-300/30 shadow-md ">
          <DashboardSaleActivity
            sumSales={sumSales}
            sumPaid={sumPaid}
            sumSalesProfit={sumSalesProfit}
            sumSalesCosts={sumSalesCosts}
            sumCosts={sumCosts}
          />
        </div>
        <div className="row-span-2 rounded-lg border border-slate-300/30 shadow-md ">
          <OrderStatus />
        </div>
        <div className="row-span-2 rounded-lg border border-slate-300/30 shadow-md ">
          <TopCustomers topCustomers={topCustomers} />
        </div>
        <div className="row-span-2 rounded-lg border border-slate-300/30 shadow-md ">
          <DashboardSaleInfo sumSales={sumSales} />
        </div>
        <div className="row-span-2 hidden rounded-lg border border-slate-300/30 shadow-md  md:col-span-2 md:block  lg:col-span-3">
          <SaleDataChart salesDaily={salesDaily} />
        </div>
        <div className="col-span-2 row-span-2 hidden rounded-lg border  border-slate-300/30  shadow-md md:block">
          <ProductDataChart data={mostSoldProducts}>
            Ən çox satılan məhsullar
          </ProductDataChart>
        </div>
        <div className="col-span-2 row-span-2 hidden rounded-lg border border-slate-300/30 shadow-md  md:block ">
          <ProductDataChart data={mostSoldProductsWithDimensions}>
            Ən çox satılan məhsullar ölçülərinə görə
          </ProductDataChart>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
