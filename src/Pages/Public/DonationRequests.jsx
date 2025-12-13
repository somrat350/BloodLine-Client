import { useQuery } from "@tanstack/react-query";
import {
  CiCalendarDate,
  CiHospital1,
  CiLocationOn,
  CiTimer,
} from "react-icons/ci";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useState } from "react";
import Loading from "../../Components/Loading";

const DonationRequests = () => {
  const instance = useAxios();
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 8;
  const skip = currentPage * limit;

  // Fetch all requests
  const { data: donationRequestsData = {}, isLoading } = useQuery({
    queryKey: ["donation-requests", currentPage],
    queryFn: async () => {
      const res = await instance.get(
        `/allRequests?donationStatus=pending&limit=${limit}&skip=${skip}`
      );
      return res.data;
    },
  });
  const donationRequests = donationRequestsData.result || [];
  const totalPages = Math.ceil(donationRequestsData.total / limit);
  return (
    <div>
      <title>All Donation Requests | BloodLine</title>
      <h2 className="text-3xl font-bold text-center text-secondary mb-10">
        Donation Requests
      </h2>
      {isLoading ? (
        <Loading />
      ) : donationRequests.length === 0 ? (
        <p className="text-xl font-bold text-center">
          No pending request available!
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {donationRequests.map((request) => (
            <div
              key={request._id}
              className="p-3 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-300 flex flex-col gap-2 border-2 border-secondary"
            >
              <div className="flex justify-end">
                <div className="px-5 py-1 rounded-full bg-secondary text-white font-extrabold text-2xl flex justify-center items-center">
                  {request.bloodGroup}
                </div>
              </div>
              <h2 className="text-xl font-bold">{request.recipientName}</h2>
              <div className="flex items-center gap-1">
                <CiLocationOn className="text-xl font-bold" />
                <p>
                  {request.recipientDivision}, {request.recipientDistrict},{" "}
                  {request.recipientUpazila}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <CiLocationOn className="text-xl font-bold" />
                <p>{request.fullAddressLine}</p>
              </div>
              <div className="flex items-center gap-1">
                <CiCalendarDate className="text-xl font-bold" />
                <p>{request.donationDate}</p>
              </div>
              <div className="flex items-center gap-1">
                <CiTimer className="text-xl font-bold" />
                <p>{request.donationTime}</p>
              </div>
              <div className="flex items-center gap-1">
                <CiHospital1 className="text-xl font-bold" />
                <p>{request.hospitalName}</p>
              </div>
              <Link
                to={`/viewDonationRequest/${request._id}`}
                className="btn btn-secondary"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between gap-3 my-5">
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
  );
};

export default DonationRequests;
