import { createBrowserRouter } from "react-router";
import PublicLayout from "../Layouts/PublicLayout";
import Home from "../Pages/Public/Home";
import Search from "../Pages/Public/Search";

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
]);
