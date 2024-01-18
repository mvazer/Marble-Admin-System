import { formatCurrencyNumber, formatNumber } from "../../utils/helpers";

function AssetsInfo({
  sumProductsValue,
  sumPaid,
  sumSales,
  sumCosts,
  sumSalesCosts,
  sumCash,
  sumCashInvestments,
}) {
  return (
    <div className="flex-col p-4">
      <h1 className="pb-6 text-center text-xl font-bold uppercase">Hesab</h1>
      <div className="flex">
        <h1 className="self-end pt-6 text-2xl font-bold">₼</h1>
        <h1 className="px-3 pt-6 text-5xl font-bold">
          {formatNumber(
            sumPaid("") - sumSalesCosts("") - sumCosts("") + sumCash(""),
          )}
        </h1>
      </div>
      <p>nağd</p>
      <p>
        <span className="font-semibold text-green-800">
          {formatCurrencyNumber(sumCashInvestments(""))}{" "}
        </span>
        Ümumi investisiya
      </p>

      <div className="flex pt-3">
        <h1 className="self-end  text-2xl font-bold">₼</h1>
        <h1 className="px-3  text-5xl font-bold">
          {formatNumber(
            sumSales("") - sumSalesCosts("") - sumCosts("") + sumCash(""),
          )}
        </h1>
      </div>
      <p>borclar ilə birlikdə</p>

      <div className="flex">
        <h1 className="self-end pt-6 text-2xl font-bold">₼</h1>
        <h1 className="px-3 pt-6 text-5xl font-bold">
          {formatNumber(
            sumSales("") -
              sumSalesCosts("") -
              sumCosts("") +
              sumCash("") +
              sumProductsValue(""),
          )}
        </h1>
      </div>
      <p>aktivlər və borclar ilə birlikdə</p>
      <p>
        <span className="font-semibold text-green-800">
          {formatCurrencyNumber(sumProductsValue(""))}{" "}
        </span>
        Qalıq aktivlərin dəyəri
      </p>
    </div>
  );
}

export default AssetsInfo;
