import AdminHome from "../../Components/Dashboard/Home/AdminHome";
import DonorHome from "../../Components/Dashboard/Home/DonorHome";
import Loading from "../../Components/Loading";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";

const DashboardHome = () => {
  const { role, isLoading } = useRole();
  const { user, userLoading } = useAuth();
  if (isLoading || userLoading) return <Loading />;
  return (
    <div>
      <title>Dashboard | BloodLine</title>
      <h1 className="text-3xl font-bold flex items-center gap-2">Dashboard</h1>

      <div className="shadow-md p-5 rounded-xl">
        <h2 className="text-2xl font-semibold">
          Welcome, <span className="text-secondary">{user?.displayName}</span>{" "}
          👋
        </h2>

        <p className="mt-2">Thank you for being a valuable blood donor.</p>
      </div>
      {role === "donor" && <DonorHome />}
      {role === "admin" && <AdminHome />}
      {role === "volunteer" && <AdminHome />}
    </div>
  );
};

export default DashboardHome;
