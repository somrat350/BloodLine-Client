import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import {
  FaHospitalAlt,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaRegCalendarCheck,
  FaRegClock,
  FaTint,
} from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxios from "../../Hooks/useAxios";

const RequestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const instance = useAxios();
  const instanceSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    data: request,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donation-request", id],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instance.get(
        `/singleRequest/${id}?email=${user?.email}`
      );
      return res.data;
    },
  });

  const handleConfirmDonation = () => {
    setLoading(true);
    const updatedInfo = {
      donorEmail: user.email,
      donorName: user.displayName,
      donationStatus: "inprogress",
    };

    instanceSecure
      .put(`/updateRequest/${id}?email=${user.email}`, updatedInfo)
      .then((res) => {
        setLoading(false);
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(
            "Donation confirmed. We appreciate your dedication to helping others."
          );
        }
      });
  };

  if (isLoading || loading) return <Loading />;
  if (!request)
    return (
      <div className="flex justify-center items-center gap-5 flex-col py-10">
        <title>Details Not Found | BloodLine</title>
        <p className="text-center font-bold text-xl">
          Sorry, request not found!
        </p>
        <Link to="/donationRequests" className="btn btn-secondary">
          Back To Donation Requests Page
        </Link>
      </div>
    );

  return (
    <div className="shadow-lg rounded-xl">
      <title>Request Details | BloodLine</title>
      <h1 className="text-3xl font-bold mb-5">Donation Request Details</h1>

      {/* Card */}
      <div className="shadow-lg rounded-xl p-5 border border-gray-200">
        {/* Recipient + Blood */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xl font-semibold">
              Recipient: {request.recipientName}
            </p>
            <p className="text-sm mt-1">Needs blood urgently</p>
          </div>
          <div className="text-4xl font-bold text-secondary flex items-center gap-2">
            <FaTint />
            {request.bloodGroup}
          </div>
        </div>

        {/* Grid Info */}
        <div className="grid sm:grid-cols-2 gap-5 mt-5">
          {/* Location */}
          <div className="p-4 rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <FaMapMarkerAlt className="text-secondary" /> Location Info
            </h2>
            <p>
              <b>Division:</b> {request.recipientDivision}
            </p>
            <p>
              <b>District:</b> {request.recipientDistrict}
            </p>
            <p>
              <b>Upazila:</b> {request.recipientUpazila}
            </p>
            <p>
              <b>Address:</b> {request.fullAddressLine}
            </p>
          </div>

          {/* Hospital */}
          <div className="p-4 rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <FaHospitalAlt className="text-secondary" /> Hospital Info
            </h2>
            <p>
              <b>Hospital:</b> {request.hospitalName}
            </p>
          </div>

          {/* Date & Time */}
          <div className="p-4 rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <FaRegCalendarCheck className="text-secondary" /> Donation
              Schedule
            </h2>
            <p className="flex items-center gap-2">
              <FaRegCalendarCheck />
              <b>Date:</b> {request.donationDate}
            </p>
            <p className="flex items-center gap-2">
              <FaRegClock />
              <b>Time:</b> {request.donationTime}
            </p>
          </div>

          {/* Blood Group */}
          <div className="p-4 rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <FaTint className="text-secondary" /> Blood Details
            </h2>
            <p>
              <b>Blood Group:</b> {request.bloodGroup}
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="mt-5">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-secondary mb-2">
            <FaInfoCircle /> Additional Information
          </h2>
          <p className=" leading-6">{request.requestMessage}</p>
        </div>

        <div className="flex items-center justify-between gap-3 mt-5">
          <button
            className="btn btn-secondary"
            onClick={() => document.getElementById("donateModal").showModal()}
            disabled={request.donationStatus !== "pending"}
          >
            Donate Now
          </button>
          {/* Status */}
          <div className="flex flex-col gap-1">
            <span>Donation Status:</span>
            <span
              className={`font-bold ${
                request.donationStatus === "pending"
                  ? "text-yellow-600"
                  : request.donationStatus === "inprogress"
                  ? "text-blue-600"
                  : request.donationStatus === "done"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {request.donationStatus?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <dialog id="donateModal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold">Confirm Donation</h3>

          <label className="mt-3 block">
            Donor Name
            <input
              className="input w-full"
              disabled
              value={user?.displayName}
            />
          </label>

          <label className="mt-3 block">
            Donor Email
            <input
              className="input input-bordered w-full"
              disabled
              value={user?.email}
            />
          </label>

          <button
            className="btn btn-secondary mt-4 w-full"
            onClick={handleConfirmDonation}
          >
            Confirm Donation
          </button>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default RequestDetails;
