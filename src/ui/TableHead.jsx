function TableHead({ headers }) {
  return (
    <thead className=" bg-slate-300/70">
      <tr>
        {headers.map((header, i) => (
          <th
            key={header}
            className={`${i === 0 ? "md:pl-16" : ""}${
              header.split(",").length !== 1 ? header.split(",")[1] : ""
            } p-2 md:p-4 md:px-6 text-center text-slate-900`}
          >
            {`${
              header.split(",").length !== 1 ? header.split(",")[0] : header
            }`}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
