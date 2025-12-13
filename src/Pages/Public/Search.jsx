import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading";

const Search = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const instance = useAxios();
  const division = useWatch({ control, name: "division" });
  const district = useWatch({ control, name: "district" });

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

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // handle form data on submit
  const onSubmit = async (data) => {
    setLoading(true);
    const finalDivision = divisions.find((d) => data.division === d.id);
    const finalDistrict = districts.find((d) => data.district === d.id);
    if (finalDivision) {
      data.division = finalDivision.name;
    }
    if (finalDistrict) {
      data.district = finalDistrict.name;
    }

    let bgStatus = "positive";
    if (data.bloodGroup?.includes("-")) {
      bgStatus = "negative";
    }
    const regex = /[+-]/g;
    const resultString = data.bloodGroup?.replace(regex, "");

    const res = await instance.get(
      `/allUsers?division=${data.division}&district=${data.district}&upazila=${data?.upazila}&bloodGroup=${resultString}&bgStatus=${bgStatus}`
    );

    setDonors(res.data.result);
    setLoading(false);
  };

  return (
    <div className="py-5 min-h-screen">
      <title>Search Donor | BloodLine</title>
      <h2 className="text-3xl font-bold text-center text-secondary mb-4">
        Search Blood Donors
      </h2>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-7xl mx-auto mb-10"
      >
        {/* Blood Group */}
        <select {...register("bloodGroup")} className="select w-full" required>
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg, i) => (
            <option key={i} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* Division */}
        <select {...register("division")} className="select w-full" required>
          <option value="">Select Division</option>
          {divisions?.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* District */}
        <select {...register("district")} className="select w-full" required>
          <option value="">Select District</option>
          {districtsByDivision(division).map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select {...register("upazila")} className="select w-full" required>
          <option value="">Select Upazila</option>
          {upazilaByDistrict(district).map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button
          type="submit"
          className="btn btn-secondary w-full col-span-full"
        >
          Search
        </button>
      </form>

      {loading ? (
        <Loading />
      ) : (
        <>
          {donors.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
              {donors.map((donor, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl shadow hover:shadow-lg hover:-translate-y-3 transition duration-300 flex flex-col gap-2"
                >
                  <img
                    src={donor.photoURL}
                    className="w-32 h-32 mx-auto rounded-full"
                  />
                  <div className="p-2">
                    <h3 className="text-xl font-semibold text-secondary mb-2">
                      {donor.name}
                    </h3>
                    <p>
                      <strong>Blood Group:</strong> {donor.bloodGroup}
                    </p>
                    <p>
                      <strong>Upazila:</strong> {donor.upazila}
                    </p>
                    <p>
                      <strong>Email:</strong> {donor.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-10">
              No donors found. Please fill the search form and click "Search".
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
