import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { LuGitPullRequest } from "react-icons/lu";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";

const AdminHome = () => {
  const { user } = useAuth();
  const instanceSecure = useAxiosSecure();
  // Fetch all users
  const { data: allUsers = 0, isLoading: loadingUsers } = useQuery({
    queryKey: ["all-users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(`/allUsers?email=${user?.email}`);
      return res.data.total;
    },
  });

  // Fetch all requests
  const { data: allRequests = 0, isLoading: loadingRequests } = useQuery({
    queryKey: ["all-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(`/allRequests?email=${user?.email}`);
      return res.data.total;
    },
  });

  // Fetch all funding
  const { data: totalAmount, isLoading: loadingFunding } = useQuery({
    queryKey: ["totalAmount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(`/totalAmount`);
      return res.data;
    },
  });

  if ((loadingRequests || loadingUsers, loadingFunding)) return <Loading />;
  return (
    <div className="grid md:grid-cols-3 gap-5">
      <div className="h-40 flex flex-col gap-2 justify-center items-center rounded-2xl bg-linear-to-br from-secondary to-primary text-white font-bold text-3xl">
        <h2>Total Users</h2>
        <div className="flex justify-center gap-1">
          <FaUser />
          <h2>{allUsers}</h2>
        </div>
      </div>
      <div className="h-40 flex flex-col gap-2 justify-center items-center rounded-2xl bg-linear-to-br from-primary to-secondary text-white font-bold text-3xl">
        <h2>Total Funding</h2>
        <div className="flex justify-center gap-1">
          <FaBangladeshiTakaSign />
          <h2>{totalAmount}</h2>
        </div>
      </div>
      <div className="h-40 flex flex-col gap-2 justify-center items-center rounded-2xl bg-linear-to-br from-secondary to-primary text-white font-bold text-3xl">
        <h2>Total Requests</h2>
        <div className="flex justify-center gap-1">
          <LuGitPullRequest />
          <h2>{allRequests}</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
