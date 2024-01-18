import { useState } from "react";
import {
  HiChevronDown,
  HiOutlineDocumentDuplicate,
  HiOutlineTrash,
} from "react-icons/hi2";

function Row({
  children,
  header,
  removeRowHandler,
  duplicateFormHandler,
  id,
  justify = "between",
}) {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="space-y-4 border-t border-dashed border-slate-300/70 px-4 pb-8">
      <div className="relative">
        <button
          onClick={(e) => {
            e.preventDefault();
            setCollapse((c) => !c);
          }}
          className={` ${
            collapse && "-rotate-90"
          } absolute left-3 top-7 text-xl transition-all hover:text-green-800`}
        >
          <HiChevronDown />
        </button>
        <h1 className="px-24 pt-6 text-center text-xl font-semibold uppercase">
          {header}
        </h1>
        {duplicateFormHandler && (
          <button
            onClick={(e) => duplicateFormHandler(e, id)}
            className="absolute right-10 top-7 text-xl hover:text-green-800 "
          >
            <HiOutlineDocumentDuplicate />
          </button>
        )}
        <button
          onClick={(e) => removeRowHandler(e, id)}
          className="absolute right-3 top-7 text-xl hover:text-green-800 "
        >
          <HiOutlineTrash />
        </button>
      </div>

      <div
        className={`${
          collapse && "hidden"
        } flex flex-wrap justify-${justify} gap-4 transition-all`}
      >
        {children}
      </div>
    </div>
  );
}

export default Row;
