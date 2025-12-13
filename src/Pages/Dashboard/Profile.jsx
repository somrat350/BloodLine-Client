import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { CiImageOn, CiMail, CiUser } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";

const Profile = () => {
  const instanceSecure = useAxiosSecure();
  const { user, updateUser, userLoading } = useAuth();
  const [editable, setEditable] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [loading, setLoading] = useState(false);

  // Fetch user profile data
  const {
    data: profile = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(`/currentUser?email=${user?.email}`);
      return res.data;
    },
  });

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

  const { register, handleSubmit, reset, control } = useForm({
    // defaultValues: profile,
  });

  const defaultDivision = divisions.find((d) => profile.division === d.name);
  const defaultDistrict = districts.find((d) => profile.district === d.name);

  const division = useWatch({ control, name: "division" });
  const district = useWatch({ control, name: "district" });

  // Populate form when fetched
  useEffect(() => {
    if (!isLoading && profile) {
      reset({
        ...profile,
        division: defaultDivision?.id,
        district: defaultDistrict?.id,
      });
    }
  }, [isLoading, profile, reset, editable, defaultDivision, defaultDistrict]);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await instanceSecure.put(
        `/updateProfile?email=${user?.email}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      refetch();
      setEditable(false);
    },
  });

  // upload image on imgBB website
  const uploadImage = async (userImage) => {
    const formData = new FormData();
    formData.append("image", userImage);
    const imgApiUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMG_BB_API
    }`;
    const res = await axios.post(imgApiUrl, formData);
    return res.data.data.url;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const finalDivision = divisions.find((d) => data.division === d.id);
    const finalDistrict = districts.find((d) => data.district === d.id);
    data.division = finalDivision.name;
    data.district = finalDistrict.name;

    if (data.userImage.length > 0) {
      const photoURL = await uploadImage(data.userImage[0]);
      data.photoURL = photoURL;
    }
    delete data.userImage;
    delete data.email;

    const fbUpdated = {
      displayName: data.name,
      photoURL: data.photoURL,
    };
    if (user.displayName !== data.name || user.photoURL !== data.photoURL) {
      await updateUser(fbUpdated);
    }

    const res = await updateMutation.mutateAsync(data);
    if (res.modifiedCount > 0) {
      toast.success("Profile updated successfully!");
    }
    setLoading(false);
  };

  if (isLoading || loading || userLoading) return <Loading />;

  return (
    <div>
      <title>Profile | BloodLine</title>
      <h2 className="text-3xl font-bold">Profile</h2>
      {/* Header with Edit Button */}
      <div className="flex justify-end mb-5 sm:pr-5">
        {!editable ? (
          <button
            onClick={() => setEditable(true)}
            className="btn btn-secondary flex items-center gap-2"
          >
            <FaRegEdit /> Edit
          </button>
        ) : (
          <>
            <button
              onClick={() => setEditable(false)}
              type="button"
              className="btn btn-secondary mr-3"
            >
              Cancel
            </button>
            <button
              form="profileForm"
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>
          </>
        )}
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <img
          src={profile.photoURL}
          className="w-24 h-24 rounded-full border"
          alt="Profile"
        />
      </div>

      {/* Profile Form */}
      <form
        id="profileForm"
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-5"
      >
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <div className="relative">
            <input
              type="text"
              required
              disabled={!editable}
              {...register("name")}
              id="name"
              placeholder="Name"
              className="input w-full pr-8"
            />
            <span className="absolute right-0 top-1 z-10 p-1">
              <CiUser className="text-2xl" />
            </span>
          </div>
        </div>

        {/* Email -- Never Editable */}
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <div className="relative">
            <input
              type="email"
              disabled={true}
              {...register("email")}
              className="input w-full pr-8"
            />
            <span className="absolute right-0 top-1 z-10 p-1">
              <CiMail className="text-2xl" />
            </span>
          </div>
        </div>

        {/* Profile image */}
        <div className="flex flex-col gap-2">
          <label htmlFor="userImage">Image</label>
          <div className="relative">
            <input
              type="file"
              disabled={!editable}
              {...register("userImage")}
              id="userImage"
              className="file-input file-input-secondary w-full pr-8"
            />
            <span className="absolute right-0 top-1 z-10 p-1">
              <CiImageOn className="text-2xl" />
            </span>
          </div>
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-2">
          <label htmlFor="gender">Select Gender</label>
          <select
            {...register("gender")}
            id="gender"
            disabled={!editable}
            className="select w-full"
          >
            <option disabled value={"Select Gender"}>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Blood Group */}
        <div className="flex flex-col gap-2">
          <label htmlFor="bloodGroup">Select Blood Group</label>
          <select
            {...register("bloodGroup")}
            disabled={!editable}
            id="bloodGroup"
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

        {/* Division */}
        <div className="flex flex-col gap-2">
          <label htmlFor="division">Select Division</label>
          <select
            {...register("division")}
            id="division"
            disabled={!editable}
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

        {/* District */}
        <div className="flex flex-col gap-2">
          <label htmlFor="district">Select District</label>
          <select
            {...register("district")}
            id="district"
            disabled={!editable}
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
          <label htmlFor="upazila">Select Upazila</label>
          <select
            {...register("upazila")}
            id="upazila"
            disabled={!editable}
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
      </form>
    </div>
  );
};

export default Profile;
