import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Filter({ filterBy }) {
  const [active, setActive] = useState(filterBy[0].value);
  const [searchParams, setSearchParams] = useSearchParams();

  function clickHandler(e) {
    setActive(e.target.value);
    searchParams.set("filterBy", e.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  return (
    <div className="rounded-xl p-1 shadow-md ">
      {filterBy.map((filter) => (
        <button
          onClick={clickHandler}
          key={filter.value}
          value={filter.value}
          className={`${
            active === filter.value ? "bg-slate-100/60" : ""
          } mx-px rounded-lg px-4 py-2 text-sm font-semibold transition-all  duration-150 hover:bg-slate-100`}
        >
          {filter.name}
          <div
            className={`${
              active === filter.value
                ? "w-[70%] bg-black"
                : "w-0 bg-transparent"
            } mx-auto mt-1 h-1 rounded-3xl transition-all`}
          />
        </button>
      ))}
    </div>
  );
}

export default Filter;
