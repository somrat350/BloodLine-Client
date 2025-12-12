import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { FaStar } from "react-icons/fa";
import { CiHospital1, CiLocationOn, CiMail, CiUser } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Loading from "../../Components/Loading";

const NewDonationRequest = () => {
  const { user, userLoading } = useAuth();
  const { register, handleSubmit, control, reset } = useForm();
  const instanceSecure = useAxiosSecure();

  const division = useWatch({ control, name: "recipientDivision" });
  const district = useWatch({ control, name: "recipientDistrict" });

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    axios.get("/divisions.json").then((res) => {
      setDivisions(res.data);
    });
    axios.get("/districts.json").then((res) => {
      setDistricts(res.data);
    });
    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data);
    });
    instanceSecure.get(`/currentUser?email=${user?.email}`).then((res) => {
      setStatus(res.data.status);
      setLoading(false);
    });
  }, [user, instanceSecure]);

  const districtsByDivision = (divisionId) => {
    const divisionDistricts = districts.filter(
      (district) => district.division_id === divisionId
    );

    return divisionDistricts.map((d) => d);
  };

  const upazilaByDistrict = (districtId) => {
    const districtUpazilas = upazilas.filter(
      (upazila) => upazila.district_id === districtId
    );

    return districtUpazilas.map((u) => u);
  };

  const onSubmit = async (data) => {
    // check user status
    if (status === "blocked") {
      toast.error(
        "You don't have permission to create new request. Because you are blocked by admin!"
      );
      return;
    }

    setLoading(true);

    const finalDivision = divisions.find(
      (d) => data.recipientDivision === d.id
    );
    const finalDistrict = districts.find(
      (d) => data.recipientDistrict === d.id
    );
    data.recipientDivision = finalDivision.name;
    data.recipientDistrict = finalDistrict.name;

    // add default donation status
    data.donationStatus = "pending";
    data.createdAt = new Date();

    try {
      const res = await instanceSecure.post(
        `/newDonationRequest?email=${user?.email}`,
        data
      );
      if (res.data.insertedId) {
        toast.success("Donation request created successfully!");
        navigate("/dashboard");
        reset();
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading || loading) return <Loading />;

  return (
    <div>
      <h2 className="text-3xl font-bold">New Donation Request</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-5 p-5"
      >
        {/* Requester Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="requesterName" className="flex">
            Requester Name
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type="text"
              value={user?.displayName}
              {...register("requesterName")}
              id="requesterName"
              readOnly
              className="input w-full pr-8"
            />
            <span className="absolute right-0 top-1 z-10 p-1">
              <CiUser className="text-2xl" />
            </span>
          </div>
        </div>

        {/* Requester Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="requesterEmail" className="flex">
            Requester Email
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type="email"
              value={user?.email}
              readOnly
              {...register("requesterEmail")}
              id="requesterEmail"
              className="input w-full pr-8"
            />
            <span className="absolute right-0 top-1 z-10 p-1">
              <CiMail className="text-2xl" />
            </span>
          </div>
        </div>

        {/* Recipient Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="recipientName" className="flex">
            Recipient Name
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              {...register("recipientName")}
              id="recipientName"
              placeholder="Enter recipient name"
              className="input w-full pr-8"
            />
            <span className="absolute right-0 top-1 z-10 p-1">
              <CiUser className="text-2xl" />
            </span>
          </div>
        </div>

        {/* Blood Group */}
        <div className="flex flex-col gap-2">
          <label htmlFor="bloodGroup" className="flex">
            Select Blood Group
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <select
            {...register("bloodGroup")}
            id="bloodGroup"
            defaultValue={"Select Blood Group"}
            required
            className="select w-full"
          >
            <option disabled value={"Select Blood Group"}>
              Select Blood Group
            </option>
            {bloodGroups.map((bg, i) => (
              <option key={i} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* Recipient Division */}
        <div className="flex flex-col gap-2">
          <label htmlFor="recipientDivision" className="flex">
            Recipient Division
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <select
            {...register("recipientDivision")}
            id="recipientDivision"
            defaultValue={"Select Division"}
            required
            className="select w-full"
          >
            <option disabled value={"Select Division"}>
              Select Division
            </option>
            {divisions.map((division) => (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            ))}
          </select>
        </div>

        {/* Recipient District */}
        <div className="flex flex-col gap-2">
          <label htmlFor="recipientDistrict" className="flex">
            Recipient District
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <select
            {...register("recipientDistrict")}
            id="recipientDistrict"
            defaultValue={"Select District"}
            required
            className="select w-full"
          >
            <option disabled value={"Select District"}>
              Select District
            </option>
            {districtsByDivision(division).map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div className="flex flex-col gap-2">
          <label htmlFor="upazila" className="flex">
            Recipient Upazila
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <select
            {...register("recipientUpazila")}
            id="upazila"
            defaultValue={"Select Upazila"}
            required
            className="select w-full"
          >
            <option disabled value={"Select Upazila"}>
              Select Upazila
            </option>
            {upazilaByDistrict(district).map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
          </select>
        </div>

        {/* Hospital Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="hospitalName" className="flex">
            Hospital Name
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              {...register("hospitalName")}
              id="hospitalName"
              placeholder="e.g. Dhaka Medical College Hospital"
              className="input w-full pr-8"
            />
            <span className="absolute right-0 top-1 z-10 p-1">
              <CiHospital1 className="text-2xl" />
            </span>
          </div>
        </div>

        {/* Donation Date */}
        <div className="flex flex-col gap-2">
          <label htmlFor="donationDate" className="flex">
            Donation Date
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type="date"
              required
              {...register("donationDate")}
              id="donationDate"
              className="input w-full pr-8"
            />
          </div>
        </div>

        {/* Donation Time */}
        <div className="flex flex-col gap-2">
          <label htmlFor="donationTime" className="flex">
            Donation Time
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type="time"
              required
              {...register("donationTime")}
              id="donationTime"
              className="input w-full pr-8"
            />
          </div>
        </div>

        {/* Full Address Line */}
        <div className="col-span-full flex flex-col gap-2">
          <label htmlFor="fullAddressLine" className="flex">
            Full Address Line
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              {...register("fullAddressLine")}
              id="fullAddressLine"
              placeholder="e.g. Islam Ali Rd, Dhaka"
              className="input w-full pr-8"
            />
            <span className="absolute right-0 top-1 z-10 p-1">
              <CiLocationOn className="text-2xl" />
            </span>
          </div>
        </div>

        {/* Request Message */}
        <div className="col-span-full flex flex-col gap-2">
          <label htmlFor="requestMessage" className="flex">
            Request Message
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <textarea
              type="text"
              required
              {...register("requestMessage")}
              id="requestMessage"
              placeholder="Write why you need blood..."
              className="textarea w-full"
            ></textarea>
          </div>
        </div>

        {/* Register */}
        <button className="col-span-full btn btn-secondary text-lg">
          Request
        </button>
      </form>
    </div>
  );
};

export default NewDonationRequest;
