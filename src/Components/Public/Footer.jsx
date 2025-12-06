import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import logoImg from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#101214] text-white">
      <div className="max-w-[1440px] mx-auto p-5">
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center gap-1">
            <img src={logoImg} alt="RentWheels" className="w-10" />
            <h1>
              <Link to="/" className="text-2xl font-bold">
                BloodLine
              </Link>
            </h1>
          </div>
          {/* LINKS */}
          <div className="flex items-center gap-5">
            <Link to="/" className="hover:text-[#642ee3] duration-200">
              Home
            </Link>
            <Link
              to="/donationRequests"
              className="hover:text-[#642ee3] duration-200"
            >
              Donation Requests
            </Link>
            <Link to="/about" className="hover:text-[#642ee3] duration-200">
              About
            </Link>
            <Link to="/contact" className="hover:text-[#642ee3] duration-200">
              Contact
            </Link>
          </div>
          {/* SOCIAL */}
          <div className="flex items-center gap-3">
            <div className="rounded-full p-1 border border-white hover:scale-110 duration-200">
              <Link
                to="https://www.facebook.com/profile.php?id=61564941795910"
                target="_blank"
              >
                <FaFacebook />
              </Link>
            </div>
            <div className="rounded-full p-1 border border-white hover:scale-110 duration-200">
              <Link to="" target="_blank">
                <FaXTwitter />
              </Link>
            </div>
            <div className="rounded-full p-1 border border-white hover:scale-110 duration-200">
              <Link to="" target="_blank">
                <FaInstagram />
              </Link>
            </div>
            <div className="rounded-full p-1 border border-white hover:scale-110 duration-200">
              <Link to="" target="_blank">
                <FaLinkedin />
              </Link>
            </div>
            <div className="rounded-full p-1 border border-white hover:scale-110 duration-200">
              <Link to="https://github.com/somrat350" target="_blank">
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto mt-5">
          <p className="text-center text-gray-400">
            Blood Line connects donors and patients, making life-saving blood
            donations faster, easier, and more reliable.Blood Line is a trusted
            platform that links real heroes with those in urgent need of blood.
            Save lives with every drop.
          </p>
        </div>
        <h2 className="text-center text-white font-medium text-lg border-t border-gray-600 mt-5 pt-5">
          Copyright © 2025 - All right reserved
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
