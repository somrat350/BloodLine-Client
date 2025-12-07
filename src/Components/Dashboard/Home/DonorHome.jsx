import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRole from "../../../Hooks/useRole";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";

const DonorHome = () => {
  const { user, userLoading } = useAuth();
  const { role, isLoading } = useRole();
  const instanceSecure = useAxiosSecure();

  // Fetch recent 3 donation requests created by this donor
  const { data: recentRequests = [] } = useQuery({
    queryKey: ["recent-donation-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(
        `/recentDonationRequests?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (userLoading || isLoading) return;
  console.log(recentRequests);

  return (
    <div>
      {/* Recent 3 Donation Requests */}
      {recentRequests.length > 0 && (
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
                      {/* View */}
                      <Link
                        to={`/dashboard/donation-requests/${req._id}`}
                        className="btn btn-sm btn-info text-white"
                      >
                        View
                      </Link>

                      {/* Edit (Always available) */}
                      <Link
                        to={`/dashboard/edit-donation-request/${req._id}`}
                        className="btn btn-sm btn-warning text-white"
                      >
                        Edit
                      </Link>

                      {/* Delete */}
                      <button
                        className="btn btn-sm btn-secondary text-white"
                        // onClick={() => handleDelete(req._id)}
                      >
                        Delete
                      </button>

                      {/* Done & Cancel only if inprogress */}
                      {req.donationStatus === "inprogress" && (
                        <>
                          <button
                            className="btn btn-sm btn-success text-white"
                            // onClick={() => handleStatusUpdate(req._id, "done")}
                          >
                            Done
                          </button>

                          <button
                            className="btn btn-sm btn-neutral text-white"
                            // onClick={() =>
                            //   handleStatusUpdate(req._id, "canceled")
                            // }
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View All Button */}
          <div className="text-center mt-6">
            <Link
              to="/dashboard/my-donation-requests"
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
