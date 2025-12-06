import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiImageOn, CiMail, CiUser } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash, FaStar } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // handle form data on submit
  const onSubmit = async (data) => {
    console.log(data);
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
              // onChange={showImage}
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
            {bloodGroups.map((bg, i) => (
              <option key={i} value={bg}>
                {bg}
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
            {bloodGroups.map((bg, i) => (
              <option key={i} value={bg}>
                {bg}
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
            {bloodGroups.map((bg, i) => (
              <option key={i} value={bg}>
                {bg}
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
              {...register("password")}
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
          <span className="text-[12px] text-right text-red-500"></span>
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
              // {...register("password")}
              // id="password"
              placeholder="Password"
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
          <span className="text-[12px] text-right text-red-500">Confirm</span>
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
