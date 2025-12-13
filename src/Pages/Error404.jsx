import { Link } from "react-router";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-5 mt-5">
      <title>Page Not Found | BloodLine</title>
      <title>Page not found | RentWheels</title>
      <img src="/error404.png" alt="" className="rounded-lg" />
      <h2 className="text-2xl font-bold text-center">
        Opps, this page is not found!
      </h2>
      <Link to="/" className="btn btn-secondary text-lg">
        Back To Home
      </Link>
    </div>
  );
};

export default Error404;
