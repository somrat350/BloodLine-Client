import { createBrowserRouter } from "react-router";
import PublicLayout from "../Layouts/PublicLayout";
import Home from "../Pages/Public/Home";
import Search from "../Pages/Public/Search";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivetRouter from "./PrivateRouter";
import Profile from "../Pages/Dashboard/Profile";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import NewDonationRequest from "../Pages/Dashboard/NewDonationRequest";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import EditDonationRequest from "../Pages/Dashboard/EditDonationRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/search",
        Component: Search,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRouter>
        <DashboardLayout />
      </PrivetRouter>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "newDonationRequest",
        Component: NewDonationRequest,
      },
      {
        path: "myDonationRequests",
        Component: MyDonationRequests,
      },
      {
        path: "editDonationRequest/:id",
        Component: EditDonationRequest,
      },
      {
        path: "allUsers",
        Component: AllUsers,
      },
    ],
  },
]);
