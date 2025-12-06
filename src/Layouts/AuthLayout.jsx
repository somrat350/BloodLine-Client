import { Link, Outlet, useLocation } from "react-router";
import authImg from "../assets/authImg.png";
import Logo from "../Components/Public/Logo";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  const location = useLocation();
  let bannerTitle;
  if (
    location.pathname === "/auth" ||
    location.pathname === "/auth/" ||
    location.pathname === "/auth/login"
  ) {
    bannerTitle = "Welcome Back";
  } else {
    bannerTitle = "Join As A Donor";
  }
  return (
    <div className="flex flex-col min-h-screen p-5 max-w-[1440px] mx-auto">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <Link to="/auth/login" className="btn btn-outline btn-secondary">
            Login
          </Link>
          <Link to="/auth/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      </div>
      <div
        className="h-40 sm:h-64 bg-cover bg-center rounded-lg mt-5 flex justify-center items-center p-2"
        style={{
          backgroundImage: `url(${authImg})`,
        }}
      >
        <h2 className="text-white text-3xl sm:text-6xl font-bold text-center">
          {bannerTitle}
        </h2>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
