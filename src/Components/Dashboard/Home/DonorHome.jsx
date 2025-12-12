import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from "sweetalert2";
import { useState } from "react";
import Loading from "../../Loading";

const DonorHome = () => {
  const { user, userLoading } = useAuth();
  const instanceSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  // Fetch recent 3 donation requests created by this donor
  const {
    data: recentRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["recent-donation-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(
        `/recentDonationRequests?email=${user?.email}`
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
    const updatedInfo = { donationStatus };
    if (donationStatus === "canceled") {
      updatedInfo.donorEmail = null;
      updatedInfo.donorName = null;
    }
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
          .put(`/updateRequest/${id}?email=${user?.email}`, updatedInfo)
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

  if (userLoading || isLoading || loading) return <Loading />;

  return (
    <div>
      {/* Recent 3 Donation Requests */}
      {recentRequests.length === 0 ? (
        <div className="mt-5 flex flex-col items-center gap-3">
          <p className="text-center">You don't have any donation request!</p>
          <Link
            to="/dashboard/newDonationRequest"
            className="btn btn-secondary"
          >
            Create New Donation Request
          </Link>
        </div>
      ) : (
        <div className="shadow-md p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            Your Recent Donation Requests
          </h3>

          <div className="overflow-x-auto">
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
                {recentRequests.map((req, i) => (
                  <tr key={req._id}>
                    <td>{i + 1}</td>
                    <td>{req.recipientName}</td>
                    <td>
                      {req.recipientDistrict}, <br /> {req.recipientUpazila}
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
                      {req.donationStatus === "inprogress" ||
                      req.donationStatus === "done" ? (
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
                              to={`/dashboard/viewDonationRequest/${req._id}`}
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
                              className="btn btn-sm btn-secondary text-white"
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
                                className="btn btn-sm btn-neutral text-white"
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
          </div>

          {/* View All Button */}
          <div className="text-center mt-6">
            <Link
              to="/dashboard/myDonationRequests"
              className="btn btn-outline btn-secondary"
            >
              View My All Requests
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorHome;
