import { createBrowserRouter } from "react-router";
import PublicLayout from "../Layouts/PublicLayout";
import Home from "../Pages/Public/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);
