import { Link } from "react-router";
import bannerImg from "../../../assets/banner.jpg";

const Banner = () => {
  return (
    <div className="min-h-96 relative rounded-xl overflow-hidden">
      <img
        src={bannerImg}
        className="absolute top-0 left-0 w-full h-full -z-10"
        alt=""
      />
      {/* Text Content */}
      <div className="flex flex-col justify-center items-center h-96 p-5 gap-5">
        <h1 className="text-3xl md:text-5xl text-center font-bold text-red-600">
          Save a Life. Become a Donor Today.
        </h1>
        <p className="text-center">
          Blood Line helps connect lifesavers with patients in need. Join our
          community and make a difference.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
          {/* Join as Donor Button */}
          <Link to="" className="btn btn-secondary text-white px-6">
            Join as a Donor
          </Link>

          {/* Search Donors Button */}
          <Link to="" className="btn btn-outline btn-secondary text-white px-6">
            Search Donors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
