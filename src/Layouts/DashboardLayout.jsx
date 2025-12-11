import { Link, NavLink, Outlet } from "react-router";
import Header from "../Components/Dashboard/Header";
import useRole from "../Hooks/useRole";
import logoImg from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuGitPullRequest } from "react-icons/lu";
import { FaBorderAll, FaUsersViewfinder } from "react-icons/fa6";
import { LiaDonateSolid } from "react-icons/lia";

const DashboardLayout = () => {
  const { role } = useRole();
  const menuItems = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          end
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right navLink"
          data-tip="Dashboard"
        >
          {/* Dashboard icon */}
          <RxDashboard className="font-bold text-xl" />
          <span className="is-drawer-close:hidden">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          end
          to="/dashboard/profile"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right navLink"
          data-tip="Profile"
        >
          {/* Profile icon */}
          <CgProfile className="font-bold text-xl" />
          <span className="is-drawer-close:hidden">Profile</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          end
          to="/funding"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right navLink"
          data-tip="Funding"
        >
          {/* Profile icon */}
          <LiaDonateSolid className="font-bold text-xl" />
          <span className="is-drawer-close:hidden">Funding</span>
        </NavLink>
      </li>
      {role === "admin" && (
        <li>
          <NavLink
            end
            to="/dashboard/allUsers"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right navLink"
            data-tip="All Users"
          >
            {/* Profile icon */}
            <FaUsersViewfinder className="font-bold text-xl" />
            <span className="is-drawer-close:hidden">All Users</span>
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          end
          to="/dashboard/newDonationRequest"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right navLink"
          data-tip="New Donation Request"
        >
          {/* Profile icon */}
          <IoMdAddCircleOutline className="font-bold text-xl" />
          <span className="is-drawer-close:hidden">New Donation Request</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          end
          to="/dashboard/myDonationRequests"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right navLink"
          data-tip="My Donation Requests"
        >
          {/* Profile icon */}
          <LuGitPullRequest className="font-bold text-xl" />
          <span className="is-drawer-close:hidden">My Donation Requests</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          end
          to="/dashboard/allDonationRequests"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right navLink"
          data-tip="All Donation Requests"
        >
          {/* Profile icon */}
          <FaBorderAll className="font-bold text-xl" />
          <span className="is-drawer-close:hidden">All Donation Requests</span>
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-[#dcdedf] min-h-screen">
      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-4"
          type="checkbox"
          defaultChecked
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-white sticky top-0 z-20">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="w-full">
              <Header />
            </div>
          </nav>
          <div className="p-5">
            <div className="bg-white rounded-2xl p-4">
              <Outlet />
            </div>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-64">
            {/* Sidebar logo */}
            <div className="p-4">
              <Link to="/" className="flex items-center">
                <img src={logoImg} alt="BloodLine" className="w-8" />
                <h1
                  className={`text-3xl font-extrabold text-black is-drawer-close:hidden`}
                >
                  BloodLine
                </h1>
              </Link>
            </div>
            {/* Sidebar content here */}
            <ul className="menu w-full grow gap-2">
              {/* List items */}
              {menuItems}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
