import { Link, Outlet, useLocation } from "react-router";
import authImg from "../assets/authImg.png";
import Logo from "../Components/Public/Logo";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";

const AuthLayout = () => {
  const { user, userLoading } = useAuth();
  const location = useLocation();

  if (userLoading) return <Loading />;

  let bannerTitle;
  if (user) {
    bannerTitle = "You are already a user";
  } else if (
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
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/" className="btn btn-secondary">
              Go to home
            </Link>
          ) : (
            <>
              <Link to="/auth/login" className="btn btn-outline btn-secondary">
                Login
              </Link>
              <Link to="/auth/register" className="btn btn-secondary">
                Register
              </Link>
            </>
          )}
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
      {user ? (
        <Link to="/" className="btn btn-secondary mt-10 w-fit mx-auto">
          Go to home
        </Link>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default AuthLayout;
