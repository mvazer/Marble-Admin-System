import { PieChart } from "@mui/x-charts";
import { useSearchParams } from "react-router-dom";
import { formatSquareMeters } from "../../utils/helpers";

function ProductDataChart({ data, children }) {
  const [searcParams] = useSearchParams();
  const time = searcParams.get("filterBy")|| "month";
  const data01 = data(time).map((cur) => ({
    label: `${cur.name} ${
      cur.dimensions ? cur.dimensions : ""
    } (${formatSquareMeters(cur.quantity)})`,
    value: Number(cur.quantity),
  })).sort((a,b)=> b.value-a.value).slice(0,6);

  return (
    <div className="h-96 p-4">
      <h1 className="pt-6 text-center text-xl font-bold uppercase">
        {children}
      </h1>
      <div className="pt-10">
        <PieChart
          series={[
            {
              data: data01,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 35, additionalRadius: -35, color: "gray" },
              innerRadius: 40,
              outerRadius: 80,
              paddingAngle: 2,
              cx: 90,
            },
          ]}
          height={200}
        />
      </div>
    </div>
  );
}

export default ProductDataChart;
