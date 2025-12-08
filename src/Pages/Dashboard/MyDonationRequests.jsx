import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from "sweetalert2";

const MyDonationRequests = () => {
  const { user, userLoading } = useAuth();
  const [filterBy, setFilterBy] = useState("all");
  const [loading, setLoading] = useState(false);
  const instanceSecure = useAxiosSecure();

  // Fetch donation requests created by this user
  const {
    data: donationRequests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donation-requests", user?.email, filterBy],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(
        `/donationRequests?email=${user?.email}&filterBy=${filterBy}`
      );
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        instanceSecure
          .delete(`/deleteRequest/${id}?email=${user?.email}`)
          .then((res) => {
            setLoading(false);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your request has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleStatusUpdate = (id, donationStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${donationStatus} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        instanceSecure
          .put(`/updateRequest/${id}?email=${user?.email}`, { donationStatus })
          .then((res) => {
            setLoading(false);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: donationStatus === "canceled" ? "Canceled!" : "Done!",
                text: `Your request has been ${donationStatus}.`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  if (userLoading || isLoading || loading)
    return <p className="text-center mt-5">Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold">My Donation Requests</h2>
      <div className="p-2 sm:p-5">
        <div className="mt-2 flex justify-end">
          <select
            onChange={(e) => setFilterBy(e.target.value)}
            defaultValue="all"
            className="select"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">Inprogress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <div className="overflow-x-auto mt-10">
          {userLoading || isLoading ? (
            "Loading..."
          ) : (
            <table className="table w-full">
              <thead>
                <tr className="font-semibold text-gray-700">
                  <th>#</th>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {donationRequests.map((req, i) => (
                  <tr key={req._id}>
                    <td>{i + 1}</td>
                    <td>{req.recipientName}</td>
                    <td>
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>

                    {/* Status */}
                    <td
                      className={`font-bold ${
                        req.donationStatus === "pending"
                          ? "text-yellow-600"
                          : req.donationStatus === "inprogress"
                          ? "text-blue-600"
                          : req.donationStatus === "done"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {req.donationStatus}
                    </td>

                    {/* Donor Info */}
                    <td>
                      {req.donationStatus === "inprogress" ? (
                        <div>
                          <p>{req.donorName}</p>
                          <p className="text-xs text-gray-500">
                            {req.donorEmail}
                          </p>
                        </div>
                      ) : (
                        "-"
                      )}
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
                          <li>
                            {/* View */}
                            <Link
                              to={`/dashboard/donation-requests/${req._id}`}
                              className="btn btn-sm btn-info text-white"
                            >
                              View
                            </Link>
                          </li>

                          <li>
                            {/* Edit (Always available) */}
                            <Link
                              to={`/dashboard/editDonationRequest/${req._id}`}
                              className="btn btn-sm btn-warning text-white"
                            >
                              Edit
                            </Link>
                          </li>

                          <li>
                            {/* Delete */}
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() => handleDelete(req._id)}
                            >
                              Delete
                            </button>
                          </li>

                          {/* Done & Cancel only if inprogress */}
                          {req.donationStatus === "inprogress" && (
                            <>
                              <button
                                className="btn btn-sm btn-success text-white"
                                onClick={() =>
                                  handleStatusUpdate(req._id, "done")
                                }
                              >
                                Done
                              </button>

                              <button
                                className="btn btn-sm btn-neutral"
                                onClick={() =>
                                  handleStatusUpdate(req._id, "canceled")
                                }
                              >
                                Cancel
                              </button>
                            </>
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
      </div>
    </div>
  );
};

export default MyDonationRequests;
