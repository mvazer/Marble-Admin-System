import { useState } from "react";
import {
  HiArrowsRightLeft,
  HiOutlineBanknotes,
  HiOutlineBuildingOffice,
  HiOutlineChartPie,
  HiOutlineHome,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";

function Sidebar({ collapse }) {
  return (
    <nav
      className={`${
        collapse ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100 w-full h-full"
      } absolute row-span-full border-r border-dashed top-0 bg-slate-50 z-10 border-slate-300/50 p-3 transition-all lg:relative lg:translate-x-0 lg:z-0 lg:opacity-100`}
    >
      <div className="flex items-center justify-center p-6 font-bold">
        E.H.A. Group
      </div>
      <ul className="flex flex-col gap-3 font-medium">
        <li>
          <NavLink
            to="/dashboard"
            className="flex items-center gap-2 rounded-xl p-2 text-lg text-slate-950 transition-all duration-300 hover:bg-slate-200/70 "
          >
            <HiOutlineHome />
            <span>İdarə Paneli</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sales"
            className="flex items-center gap-2 rounded-xl p-2 text-lg text-slate-950 transition-all duration-300 hover:bg-slate-200/70 "
          >
            <HiOutlineBanknotes />
            <span>Satış</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/warehouse"
            className="flex items-center gap-2 rounded-xl p-2 text-lg text-slate-950 transition-all duration-300 hover:bg-slate-200/70 "
          >
            <HiOutlineBuildingOffice />
            <span>Anbar</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/customers"
            className="flex items-center gap-2 rounded-xl p-2 text-lg text-slate-950 transition-all duration-300 hover:bg-slate-200/70 "
          >
            <HiOutlineUserGroup />
            <span>Müştərilər</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/costs"
            className="flex items-center gap-2 rounded-xl p-2 text-lg text-slate-950 transition-all duration-300 hover:bg-slate-200/70 "
          >
            <HiOutlineChartPie />
            <span>Xərclər</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/transactions"
            className="flex items-center gap-2 rounded-xl p-2 text-lg text-slate-950 transition-all duration-300 hover:bg-slate-200/70 "
          >
            <HiArrowsRightLeft />
            <span>Əməliyyatlar</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
