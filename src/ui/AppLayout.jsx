import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../features/Authentication/useUser";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import { HiBars3, HiXMark } from "react-icons/hi2";

function AppLayout() {
  const [collapse, setCollapse] = useState(true);

  const navigate = useNavigate();
  const { user, isUserLoading } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isUserLoading) return;
    if (!user.user) {
      queryClient.clear();
      navigate("/login");
    }
  }, [user, navigate, isUserLoading, queryClient]);

  if (isUserLoading) return <Spinner />;

  return (
    <>
      <div
        className={`font-montserrat  lg:grid lg:h-screen lg:grid-cols-[18%_auto] lg:grid-rows-[10%_auto] lg:overflow-clip`}
      >
        <Header />
        <Sidebar collapse={collapse} setCollapse={setCollapse} />

        <main className="relative overflow-auto  md:p-4">{<Outlet />}</main>
      </div>
      <button
        className="absolute left-5 top-5 z-20 text-3xl lg:invisible"
        onClick={() => setCollapse((s) => !s)}
      >
        {!collapse ? <HiXMark /> : <HiBars3 />}
      </button>
    </>
  );
}

export default AppLayout;
