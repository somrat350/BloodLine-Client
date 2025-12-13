import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import { CiHospital1, CiLocationOn, CiMail, CiUser } from "react-icons/ci";
import axios from "axios";
import Loading from "../../Components/Loading";

const EditDonationRequest = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const instanceSecure = useAxiosSecure();
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, reset } = useForm({});
  const division = useWatch({ control, name: "recipientDivision" });
  const district = useWatch({ control, name: "recipientDistrict" });

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
  }, []);

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

  // Fetch the existing request
  const {
    data: request = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["single-request", id],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(
        `/singleRequest/${id}?email=${user?.email}`
      );
      return res.data;
    },
  });

  const defaultDivision = divisions.find(
    (d) => request.recipientDivision === d.name
  );
  const defaultDistrict = districts.find(
    (d) => request.recipientDistrict === d.name
  );

  // Populate form when fetched
  useEffect(() => {
    if (!isLoading && request) {
      reset({
        ...request,
        recipientDivision: defaultDivision?.id,
        recipientDistrict: defaultDistrict?.id,
      });
    }
  }, [isLoading, request, reset, defaultDivision, defaultDistrict]);

  // Update request
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await instanceSecure.put(
        `/updateRequest/${id}?email=${user?.email}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const finalDivision = divisions.find(
      (d) => data.recipientDivision === d.id
    );
    const finalDistrict = districts.find(
      (d) => data.recipientDistrict === d.id
    );
    data.recipientDivision = finalDivision.name;
    data.recipientDistrict = finalDistrict.name;
    delete data._id;
    const res = await updateMutation.mutateAsync(data);
    if (res.modifiedCount > 0) {
      toast.success("Request updated successfully!");
    }
    setLoading(false);
  };

  if (isLoading || loading) return <Loading />;

  return (
    <div>
      <title>Edit Donation Request | BloodLine</title>
      <h2 className="text-3xl font-bold mb-5">Edit Donation Request</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-5 p-5"
      >
        {/* Requester Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="requesterName">Requester Name</label>
          <div className="relative">
            <input
              type="text"
              value={user?.displayName}
              {...register("requesterName")}
              id="requesterName"
              disabled
              className="input w-full pr-8"
            />
            <span className="absolute right-0 top-1 z-10 p-1">
              <CiUser className="text-2xl" />
            </span>
          </div>
        </div>

        {/* Requester Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="requesterEmail">Requester Email</label>
          <div className="relative">
            <input
              type="email"
              value={user?.email}
              disabled
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
          <label htmlFor="recipientName">Recipient Name</label>
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
          <label htmlFor="bloodGroup">Select Blood Group</label>
          <select
            {...register("bloodGroup")}
            id="bloodGroup"
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
          <label htmlFor="recipientDivision">Recipient Division</label>
          <select
            {...register("recipientDivision")}
            id="recipientDivision"
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
          <label htmlFor="recipientDistrict">Recipient District</label>
          <select
            {...register("recipientDistrict")}
            id="recipientDistrict"
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
          <label htmlFor="upazila">Recipient Upazila</label>
          <select
            {...register("recipientUpazila")}
            id="upazila"
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
          <label htmlFor="hospitalName">Hospital Name</label>
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
          <label htmlFor="donationDate">Donation Date</label>
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
          <label htmlFor="donationTime">Donation Time</label>
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
          <label htmlFor="fullAddressLine">Full Address Line</label>
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
          <label htmlFor="requestMessage">Request Message</label>
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

        {/* Submit */}
        <button className="col-span-full btn btn-secondary text-lg">
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequest;
