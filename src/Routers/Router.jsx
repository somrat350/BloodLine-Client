import { createBrowserRouter } from "react-router";
import PublicLayout from "../Layouts/PublicLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
  },
]);
