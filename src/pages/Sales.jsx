import NewSalesForm from "../features/Sales/NewSalesForm";
import SalesTable from "../features/Sales/SalesTable";
import Filter from "../ui/Filter";
import Modal from "../ui/Modal";
import SortBy from "../ui/SortBy";

function Sales() {
  return (
    <>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <h1 className="pt-6 text-xl font-bold md:px-24">Satışlar</h1>
        <Modal>
          <Modal.Button>+ Yeni satış</Modal.Button>
          <Modal.Form>
            <NewSalesForm />
          </Modal.Form>
        </Modal>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 pt-4 md:flex-row md:px-24">
        <Filter
          filterBy={[
            { value: "all", name: "Hamısı" },
            { value: "paid", name: "Ödənilənlər" },
            { value: "unpaid", name: "Ödənilmiyənlər" },
            { value: "deleted", name: "Silinənlər" },
          ]}
        />

        <SortBy
          sortBy={[
            {
              value: "createDateDesc",
              name: "Yaranma tarixinə görə sırala(Son satışlar birinci)",
            },
            {
              value: "createDateAsc",
              name: "Yaranma tarixinə görə sırala(İlk satışlar birinci)",
            },
            {
              value: "endDateAsc",
              name: "Son tarixə görə sırala(İlk bitirilməlilər birinci)",
            },
            {
              value: "endDateDesc",
              name: "Son tarixə görə sırala(Son bitirilməlilər birinci)",
            },
            {
              value: "revenueAsc",
              name: "Gəlirə görə sırala(Yuxarı gəlirlər birinci)",
            },
            {
              value: "revenueDesc",
              name: "Gəlirə görə sırala(Aşağı gəlirlər birinci)",
            },
          ]}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <SalesTable />
      </div>
    </>
  );
}

export default Sales;
