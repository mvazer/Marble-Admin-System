import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Costs from "./pages/Costs";
import Customer from "./pages/Customer";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import Losses from "./pages/Losses";
import Sale from "./pages/Sale";
import SaleInvoice from "./pages/SaleInvoice";
import Sales from "./pages/Sales";
import TransactionsPage from "./pages/Transactions";
import Warehouse from "./pages/Warehouse";
import WarehouseContainer from "./pages/WarehouseContainer";
import AppLayout from "./ui/AppLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        {
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/warehouse" element={<Warehouse />} />
              <Route path="/warehouse/losses" element={<Losses />} />
              <Route path="/warehouse/container" element={<WarehouseContainer />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/sales/:salesTotalId" element={<Sale />} />
              <Route
                path="/sales/invoice/:salesTotalId"
                element={<SaleInvoice />}
              />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/:customerId" element={<Customer />} />
              <Route path="/costs" element={<Costs />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        }
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#18212f",
            color: "#e5e7eb",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
