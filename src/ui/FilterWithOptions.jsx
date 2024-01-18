import { useSearchParams } from "react-router-dom";
import { useOptions } from "../features/Warehouse/useOptions";

function FilterWithOptions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { options, isOptionsLoading } = useOptions();

  if (isOptionsLoading) return;

  const filterBy = options?.options
    .map((option) =>
      option.option.split(":")[0] === "productName"
        ? option.option.split(":")[1]
        : null,
    )
    .filter((val) => val !== null);

  function optionHandler(e) {
    searchParams.set("filterBy", e.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <select
        onChange={optionHandler}
        defaultValue={filterBy.length > 0 && filterBy[0].value}
        className="w-36 items-center rounded-xl  border-2 border-slate-600 bg-transparent  py-2 text-center text-xs font-semibold  md:text-sm"
      >
        <option value="all">Hamısı</option>
        {!isOptionsLoading &&
          filterBy.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
      </select>
    </div>
  );
}

export default FilterWithOptions;
