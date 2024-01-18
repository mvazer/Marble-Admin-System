import { LineChart } from "@mui/x-charts";
import { useSearchParams } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  // LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrencyNumber } from "../../utils/helpers";

function SaleDataChart({ salesDaily }) {
  const [searcParams] = useSearchParams();
  const time = searcParams.get("filterBy") || "month";

  let months;
  if (time === "months") months = 0;
  if (time === "prevMonth") months = 1;
  if (time === "year") months = 12;
  if (time === "all") months = -1;

  const data = salesDaily(months);
  const colors = false
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  if (!data)
    return (
      <h1 className="pt-6 text-center text-xl font-bold uppercase">
        Satış qrafiki
      </h1>
    );
  const label = data.map((cur) => cur.label);
  const totalRevenue = data.map((cur) => cur.totalRevenue);
  const totalProfit = data.map((cur) => cur.totalProfit);
  return (
    <div>
      <h1 className="pt-6 text-center text-xl font-bold uppercase">
        Satış qrafiki
      </h1>
      <div className="flex items-center justify-center p-8">
        {/* <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis
              dataKey="label"
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <YAxis
              unit="₼"
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <CartesianGrid strokeDasharray="4" />
            <Tooltip contentStyle={{ backgroundColor: colors.background }} />
            <Area
              type="monotone"
              dataKey="totalRevenue"
              fill={colors.totalSales.fill}
              stroke={colors.totalSales.stroke}
              name="Ümumi satış"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="totalProfit"
              fill={colors.extrasSales.fill}
              stroke={colors.extrasSales.stroke}
              name="Ümumi mənfəət"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer> */}
        <LineChart
          series={[
            {
              data: totalRevenue,
              label: "Ümumi gəlir",
              valueFormatter: (value) => `${formatCurrencyNumber(value)}`,
            },
            {
              data: totalProfit,
              label: "Ümumi mənfəət",
              valueFormatter: (value) => `${formatCurrencyNumber(value)}`,
            },
          ]}
          xAxis={[{ scaleType: "point", data: label }]}
          height={300}
        />
      </div>
    </div>
  );
}

export default SaleDataChart;
