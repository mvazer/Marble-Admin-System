import { format } from "date-fns";

function HistoryTableRow({ item }) {
  const keys = item.eventDescription ? Object.keys(item.eventDescription) : [];
  const value = item.eventDescription
    ? Object.values(item.eventDescription)
    : [];
  const result = value.map((val, i) => (val ? `${keys[i]}: ${val}\n` : ""));

  return (
    <tr>
      <td className="h-14 p-2 px-6">
        <div className="space-y-2">
          <p className="font-medium">{item.username}</p>
          <p className="font-light text-slate-400">{item.userEmail}</p>
        </div>
      </td>
      <td className="h-14 p-2 px-6">{format(item.created_at, "yyyy.MM.dd")}</td>
      <td className="h-14 p-2 px-6">{item.eventAction}</td>
      <td className="h-14 p-2 px-6">{item.eventDescription ? result : ""}</td>
    </tr>
  );
}

export default HistoryTableRow;
