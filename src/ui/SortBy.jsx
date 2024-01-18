import { useSearchParams } from "react-router-dom";

function SortBy({ sortBy }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function optionHandler(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <div>
      <select
        onChange={optionHandler}
        defaultValue={sortBy[0].value}
        className="w-fit items-center rounded-xl border-2 border-slate-600 bg-transparent px-4 py-2 text-center text-xs font-semibold md:text-sm "
      >
        {sortBy.map((sort) => (
          <option key={sort.name} value={sort.value}>
            {sort.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortBy;
