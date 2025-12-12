import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loading";

const AllUsers = () => {
  const { user, userLoading } = useAuth();
  const instanceSecure = useAxiosSecure();
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 5;
  const skip = currentPage * limit;

  // Fetch all users
  const {
    data: allUsersData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users", user?.email, filterBy, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(
        `/allUsers?email=${user?.email}&status=${filterBy}&limit=${limit}&skip=${skip}`
      );
      return res.data;
    },
  });

  const allUsers = allUsersData.result || [];
  const totalPages = Math.ceil(allUsersData.total / limit);

  const handleUpdateUser = async (email, status, role) => {
    if (email === user.email) {
      toast.error(`You don't have permission to update your self !`);
      return;
    }
    const updatedData = {};
    if (status !== null) {
      updatedData.status = status;
    }
    if (role !== null) {
      updatedData.role = role;
    }
    const res = await instanceSecure.put(
      `/updateProfile?email=${email}`,
      updatedData
    );
    if (res.data.modifiedCount > 0) {
      refetch();
      toast.success("User updated successfully!");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold">All Users</h2>
      <div className="p-2 sm:p-5">
        <div className="mt-2 flex justify-end">
          <select
            onChange={(e) => setFilterBy(e.target.value)}
            defaultValue="all"
            className="select"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
        <span className="text-sm sm:text-base flex mt-3">
          Showing 5 records
        </span>
        <div className="overflow-x-auto mt-10">
          {userLoading || isLoading ? (
            <Loading />
          ) : (
            <table className="table w-full">
              <thead>
                <tr className="font-semibold">
                  <th>#</th>
                  <th>Image</th>
                  <th>Name & Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {allUsers.map((u, i) => (
                  <tr key={u._id}>
                    <td>{skip + i + 1}</td>
                    <td>
                      <img
                        src={u.photoURL}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td>
                      {u.name}
                      <br /> {u.email}
                    </td>
                    <td>{u.role}</td>

                    {/* Status */}
                    <td
                      className={`font-bold ${
                        u.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {u.status}
                    </td>

                    {/* Action Buttons */}
                    <td className="flex flex-col gap-2">
                      <div className="dropdown dropdown-left dropdown-center">
                        <div tabIndex={0} role="button" className="btn m-1">
                          <BsThreeDotsVertical className="text-xl" />
                        </div>
                        <ul
                          tabIndex="-1"
                          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm gap-1"
                        >
                          {u.status === "active" ? (
                            <button
                              onClick={() =>
                                handleUpdateUser(u.email, "blocked", null)
                              }
                              className="btn btn-sm btn-secondary text-white"
                            >
                              Blocked
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleUpdateUser(u.email, "active", null)
                              }
                              className="btn btn-sm btn-success text-white"
                            >
                              Unblocked
                            </button>
                          )}
                          {user.role !== "donor" && (
                            <button
                              onClick={() =>
                                handleUpdateUser(u.email, null, "donor")
                              }
                              className="btn btn-sm btn-info text-white"
                            >
                              Make Donor
                            </button>
                          )}
                          {user.role !== "volunteer" && (
                            <button
                              onClick={() =>
                                handleUpdateUser(u.email, null, "volunteer")
                              }
                              className="btn btn-sm btn-info text-white"
                            >
                              Make Volunteer
                            </button>
                          )}
                          {user.role !== "admin" && (
                            <button
                              onClick={() =>
                                handleUpdateUser(u.email, null, "admin")
                              }
                              className="btn btn-sm btn-info text-white"
                            >
                              Make Admin
                            </button>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 mt-5">
          {totalPages > 0 ? (
            <span className="text-secondary font-bold">
              Page {currentPage + 1} of {totalPages}
            </span>
          ) : (
            <span className="text-secondary font-bold">Page 0 of 0</span>
          )}
          <div className="flex items-center gap-3">
            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="btn btn-secondary btn-sm"
              >
                Prev
              </button>
            )}
            {currentPage + 1 < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="btn btn-secondary btn-sm"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
