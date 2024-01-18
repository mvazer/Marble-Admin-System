import { useState } from "react";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import ConfirmForm from "./ConfirmForm";
import { useLogout } from "../features/Authentication/useLogout";
import { useUser } from "../features/Authentication/useUser";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

function Header() {
  const [toggle, setToggle] = useState("");
  const { logout, isLoggingout } = useLogout();
  const { user, isUserLoading } = useUser();

  return (
    <>
      <header className="flex items-center justify-end">
        <div className="flex items-center justify-end gap-4 md:px-12 px-2">
          <Link
            to={"/account"}
            className="flex flex-col items-end justify-center text-sm hover:text-green-600"
          >
            {isUserLoading || !user.user ? (
              <Skeleton
                variant="rounded"
                sx={{ bgcolor: "grey.100" }}
                animation="wave"
                height={40}
                width={"100%"}
              />
            ) : (
              <>
                <span>
                  {user.user.user_metadata.hasOwnProperty("username") &&
                    user.user.user_metadata.username}
                </span>{" "}
                <span className=" font-light">{user.user.email}</span>
              </>
            )}
          </Link>
          <button
            onClick={() => setToggle("logout")}
            className="rounded-full border p-2 text-lg transition-all hover:bg-slate-600/25"
          >
            <HiOutlineArrowLeftOnRectangle />
          </button>
        </div>
      </header>
      {toggle === "logout" && (
        <ConfirmForm
          setToggle={setToggle}
          submitHandler={() => logout()}
          loading={isLoggingout}
        >
          Hesabdan çıxış etmək istədiyinizə əminsiz?
        </ConfirmForm>
      )}
    </>
  );
}

export default Header;
