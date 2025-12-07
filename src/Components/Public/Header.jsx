import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { HiMenuAlt1 } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";

const Header = () => {
  const { user, userLoading } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  if (userLoading) return;
  const menuLink = (
    <>
      <NavLink className="navLink" to="/">
        Home
      </NavLink>

      <NavLink className="navLink" to="/donationRequests">
        Donation Requests
      </NavLink>

      {user && (
        <>
          <NavLink className="navLink" to="/funding">
            Funding
          </NavLink>
        </>
      )}
    </>
  );

  const rightLink = (
    <>
      {!user && (
        <>
          <Link className="btn btn-secondary" to="/auth/login">
            Login
          </Link>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-20 backdrop-blur-3xl">
      <div className="max-w-[1440px] mx-auto px-5 py-3 flex items-center justify-between border-b border-secondary/30 relative">
        <div className="flex items-center gap-1">
          <HiMenuAlt1
            onClick={() => setOpenMenu(true)}
            className="md:hidden cursor-pointer text-2xl font-bold"
          />
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1">{menuLink}</div>
          {rightLink}
        </div>
        <div
          className={`absolute left-0 sm:left-5 top-0 shadow-2xl flex md:hidden flex-col gap-5 p-8 rounded-b-3xl bg-base-300 w-full sm:max-w-xl z-10 duration-300 ${
            openMenu ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex justify-end">
            <HiXMark
              onClick={() => setOpenMenu(false)}
              className="cursor-pointer text-3xl font-extrabold"
            />
          </div>
          <div className="flex flex-col gap-5">{menuLink}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
