import { PDFViewer } from "@react-pdf/renderer";
import { useCustomer } from "../features/Customers/useCustomer";
import SaleInvoicePdf from "../features/Sales/SaleInvoicePdf";
import { useSalesId } from "../features/Sales/useSales";
import { useSaleTotalId } from "../features/Sales/useSalesTotal";
import Spinner from "../ui/Spinner";
import { useProducts } from "../features/Warehouse/useProducts";

function SaleInvoice() {
  const { saleTotalId, isSalesTotalIdLoading } = useSaleTotalId();
  const { customers, isLoadingCustomers } = useCustomer();
  const { sales, isSalesLoading } = useSalesId();
  const { products, isLoading: isProductsLoading } = useProducts();
  const isLoading =
    isSalesTotalIdLoading ||
    isLoadingCustomers ||
    isSalesLoading ||
    isProductsLoading;
  if (isLoading) return <Spinner />;

  const saleProducts = (id) => products.product.find((cur) => cur.id === id);

  const customer = customers.customer.find(
    (cur) => cur.id === saleTotalId.saleTotal[0].customer_id,
  );

  return (
    <PDFViewer  width="100%" height="100%">
      <SaleInvoicePdf
        saleTotal={saleTotalId.saleTotal[0]}
        customer={customer}
        sales={sales.sale}
        saleProducts={saleProducts}
      />
    </PDFViewer>
  );
}
export default SaleInvoice;
