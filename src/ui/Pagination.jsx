import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

function Pagination({ object, pageResult }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(object.length / pageResult);
  const pageArr = Array.from({ length: pageCount }, (_, index) => index + 1);
  if (object.length <= pageResult) return;
  return (
    <div className=" flex items-center justify-center gap-1">
      <button
        className="transition-all hover:text-slate-400"
        onClick={() => {
          if (page === 1) return;
          searchParams.set("page", page - 1);
          setSearchParams(searchParams);
        }}
      >
        <HiOutlineChevronLeft />
      </button>
      <button
        onClick={() => {
          if (page === 1) return;
          searchParams.set("page", 1);
          setSearchParams(searchParams);
        }}
        className={`${
          page === 1
            ? "bg-green-800/80 text-slate-50  hover:bg-green-900/90"
            : "bg-slate-600/25 hover:bg-slate-200"
        } h-6 w-6 rounded-full  text-center transition-all `}
      >
        1
      </button>
      {pageCount > 4 && page > 3 ? "..." : ""}
      {pageArr
        .slice(
          pageCount <= 4 ? 1 : page <= 2 ? 1 : page - 2,
          pageCount > 4
            ? page > 2
              ? page <= pageCount - 2
                ? page + 1
                : pageCount - 1
              : 3
            : pageCount - 1,
        )
        .map((cur, i) => (
          <button
            key={i}
            onClick={() => {
              searchParams.set("page", cur);
              setSearchParams(searchParams);
            }}
            className={`${
              page === cur
                ? "bg-green-800/80 text-slate-50  hover:bg-green-900/90"
                : "bg-slate-600/25 hover:bg-slate-200"
            } h-6 w-6 rounded-full  text-center transition-all `}
          >
            {cur}
          </button>
        ))}
      {pageCount > 4 && page < pageCount - 2 ? "..." : ""}

      <button
        onClick={() => {
          if (page === pageCount) return;
          searchParams.set("page", pageCount);
          setSearchParams(searchParams);
        }}
        className={`${
          page === pageCount
            ? "bg-green-800/80 text-slate-50  hover:bg-green-900/90"
            : "bg-slate-600/25 hover:bg-slate-200"
        } h-6 w-6 rounded-full  text-center transition-all `}
      >
        {pageCount}
      </button>
      <button
        className="transition-all hover:text-slate-400"
        onClick={() => {
          if (page >= pageCount) return;
          searchParams.set("page", page + 1);
          setSearchParams(searchParams);
        }}
      >
        <HiOutlineChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
