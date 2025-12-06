import { Link } from "react-router";
import logoImg from "../../assets/logo.png";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img src={logoImg} alt="" className="w-10" />
      <h1 className={`text-3xl font-extrabold`}>BloodLine</h1>
    </Link>
  );
};

export default Logo;
