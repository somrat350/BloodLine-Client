import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CiImageOn, CiMail, CiUser } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash, FaStar } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

const Register = () => {
  const { createUEP, updateUser, setUserLoading } = useAuth();
  const { register, handleSubmit, control } = useForm();
  const instance = useAxios();

  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [passValidateText, setPassValidateText] = useState("");
  const [password, setPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const division = useWatch({ control, name: "division" });
  const district = useWatch({ control, name: "district" });

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

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

  // password validation
  const passwordValidate = (e) => {
    const tempPass = e.target.value;
    setPassword("");

    if (!/[a-z]/.test(tempPass)) {
      setPassValidateText("Password must contain lowercase.");
      return;
    } else if (!/[A-Z]/.test(tempPass)) {
      setPassValidateText("Password must contain Uppercase.");
      return;
    } else if (tempPass.length < 6) {
      setPassValidateText("Password must 6 letters.");
      return;
    } else {
      setPassValidateText("");
      setPassword(tempPass);
      return;
    }
  };

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

  // handle form data on submit
  const onSubmit = async (data) => {
    if (!password) {
      toast.error("Please enter validate password!");
      return;
    }
    if (password !== data.confirmPassword) {
      setConfirmError("Confirm password not matched.");
      return;
    } else {
      setConfirmError("");
    }
    const finalDivision = divisions.find((d) => data.division === d.id);
    const finalDistrict = districts.find((d) => data.district === d.id);

    createUEP(data.email, data.confirmPassword)
      .then(async (res) => {
        // upload image to imgbb
        const photoURL = await uploadImage(data.userImage[0]);

        // store user to mongodb
        const userInfo = {
          name: data.name,
          email: res.user.email,
          photoURL,
          division: finalDivision.name,
          district: finalDistrict.name,
          upazila: data.upazila,
          gender: data.gender,
          bloodGroup: data.bloodGroup,
          role: "donor",
        };
        await instance.post("/newUser", userInfo);

        // upload image
        const updatedUserInfo = {
          photoURL,
          displayName: data.name,
        };
        // update user info
        return updateUser(updatedUserInfo);
      })
      .then(() => {
        navigate(from);
        toast.success("Registration successful.");
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

  return (
    <div className="sm:p-5 mt-10 w-full max-w-5xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-5"
      >
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="flex">
            Name
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type="text"
              required
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

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="flex">
            Email
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type="email"
              required
              {...register("email")}
              id="email"
              placeholder="Email"
              className="input w-full pr-8"
            />
            <span className="absolute right-0 top-1 z-10 p-1">
              <CiMail className="text-2xl" />
            </span>
          </div>
        </div>

        {/* Profile image */}
        <div className="flex flex-col gap-2">
          <label htmlFor="userImage" className="flex">
            Image
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type="file"
              required
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
          <label htmlFor="gender" className="flex">
            Select Gender
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <select
            {...register("gender")}
            id="gender"
            defaultValue={"Select Gender"}
            required
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

        {/* Division */}
        <div className="flex flex-col gap-2">
          <label htmlFor="division" className="flex">
            Select Division
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <select
            {...register("division")}
            id="division"
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

        {/* District */}
        <div className="flex flex-col gap-2">
          <label htmlFor="district" className="flex">
            Select District
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <select
            {...register("district")}
            id="district"
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
            Select Upazila
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <select
            {...register("upazila")}
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

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="flex">
            Password
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type={passwordType ? "password" : "text"}
              required
              name="password"
              onChange={passwordValidate}
              id="password"
              placeholder="Password"
              className="input w-full pr-8"
            />
            <span
              onClick={() => setPasswordType(!passwordType)}
              className="absolute right-0 top-1 z-10 p-1 cursor-pointer"
            >
              {passwordType ? (
                <FaRegEyeSlash className="text-2xl" />
              ) : (
                <FaRegEye className="text-2xl" />
              )}
            </span>
          </div>
          <span className="text-[12px] text-right text-red-500">
            {passValidateText}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="flex">
            Confirm Password
            <sup className="text-[8px] text-red-400">
              <FaStar />
            </sup>
          </label>
          <div className="relative">
            <input
              type={confirmPasswordType ? "password" : "text"}
              required
              {...register("confirmPassword")}
              id="confirmPassword"
              placeholder="Confirm Password"
              className="input w-full pr-8"
            />
            <span
              onClick={() => setConfirmPasswordType(!confirmPasswordType)}
              className="absolute right-0 top-1 z-10 p-1 cursor-pointer"
            >
              {confirmPasswordType ? (
                <FaRegEyeSlash className="text-2xl" />
              ) : (
                <FaRegEye className="text-2xl" />
              )}
            </span>
          </div>
          <span className="text-[12px] text-right text-red-500">
            {confirmError}
          </span>
        </div>

        {/* Register */}
        <button className="col-span-full btn btn-secondary text-lg">
          Register
        </button>

        {/* Already */}
        <div className="col-span-full flex flex-col gap-2 text-right">
          <p>
            Already have an account?{" "}
            <Link to="/auth/login" className="text-secondary font-bold">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
