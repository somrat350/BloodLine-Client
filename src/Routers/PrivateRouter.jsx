import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";

const PrivetRouter = ({ children }) => {
  const { user, userLoading } = useAuth();
  const location = useLocation();

  if (userLoading) return;
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivetRouter;
