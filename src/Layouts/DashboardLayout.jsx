import { Link, Outlet } from "react-router";
import Header from "../Components/Dashboard/Header";
import useRole from "../Hooks/useRole";
import logoImg from "../assets/logo.png";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();
  if (isLoading) return;
  const menuItems = <></>;
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
          <nav className="navbar w-full bg-white sticky top-0 z-10">
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
            <div className="bg-white rounded-2xl p-3">
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
