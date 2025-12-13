import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router";
import useRole from "../../Hooks/useRole";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

const AllDonationRequests = () => {
  const { user, userLoading } = useAuth();
  const { role } = useRole();
  const [filterBy, setFilterBy] = useState("all");
  const [loading, setLoading] = useState(false);
  const instance = useAxios();
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 5;
  const skip = currentPage * limit;

  // Fetch all requests
  const {
    data: donationRequestsData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donation-requests", filterBy, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instance.get(
        `/donationRequests?filterBy=${filterBy}&limit=${limit}&skip=${skip}`
      );
      return res.data;
    },
  });

  const donationRequests = donationRequestsData.result || [];
  const totalPages = Math.ceil(donationRequestsData.total / limit);

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
        instance
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
        instance
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
  return (
    <div>
      <title>All Donation Requests | BloodLine</title>
      <h2 className="text-3xl font-bold">All Donation Requests</h2>
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
        <span className="text-sm sm:text-base flex mt-3">
          Showing 5 records
        </span>
        <div className="overflow-x-auto mt-5">
          {userLoading || isLoading || loading ? (
            <Loading />
          ) : donationRequests.length === 0 ? (
            <p className="text-xl font-bold text-center">
              No donation request available!
            </p>
          ) : (
            <table className="table w-full">
              <thead>
                <tr className="font-semibold">
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
                    <td>{skip + i + 1}</td>
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
                      {req.donationStatus === "inprogress" ||
                      req.donationStatus === "done" ? (
                        <div>
                          <p>{req.donorName}</p>
                          <p className="text-xs">{req.donorEmail}</p>
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

                          {role === "admin" && (
                            <>
                              <li>
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
                            </>
                          )}

                          {role !== "donor" &&
                            req.donationStatus === "inprogress" && (
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
                                  Canceled
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

export default AllDonationRequests;
