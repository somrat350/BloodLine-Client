import axios from "axios";
import { useEffect, useState } from "react";

const Search = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

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

  const donors = [
    {
      name: "John Doe",
      bloodGroup: "A+",
      upazila: "Debidwar",
      phone: "+880123456789",
      photoURL:
        "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?t=st=1765012268~exp=1765015868~hmac=2bed3928bb82dc00a4382fa55c2e3f7325251a1629c310787205bc93661e7799&w=1480",
    },
  ];

  return (
    <div className="py-5 bg-red-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-secondary mb-4">
        Search Blood Donors
      </h2>

      {/* Search Form */}
      <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-7xl mx-auto mb-10">
        {/* Blood Group */}
        <select name="bloodGroup" className="select w-full" required>
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg, i) => (
            <option key={i} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* Division */}
        <select name="division" className="select w-full" required>
          <option value="">Select Division</option>
          {divisions?.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        {/* District */}
        <select name="district" className="select w-full" required>
          <option value="">Select District</option>
          {districts?.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select name="upazila" className="select w-full" required>
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button
          type="submit"
          className="btn btn-error text-white w-full col-span-full"
        >
          Search
        </button>
      </form>

      {/* Donor Results */}
      {donors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {donors.map((donor, i) => (
            <div
              key={i}
              className="bg-secondary/10 p-3 rounded-xl shadow hover:shadow-lg hover:-translate-y-3 transition flex flex-col gap-2"
            >
              <img src={donor.photoURL} className="w-full rounded-xl" alt="" />
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
                  <strong>Phone:</strong> {donor.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">
          No donors found. Please fill the search form and click "Search".
        </p>
      )}
    </div>
  );
};

export default Search;
