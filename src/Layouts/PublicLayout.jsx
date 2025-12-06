import { ToastContainer } from "react-toastify";
import Header from "../Components/Public/Header";
import { Outlet } from "react-router";
import Footer from "../Components/Public/Footer";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <Header />
      <div className="grow w-full max-w-[1440px] mx-auto my-5 px-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
