import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading";

const PaymentSuccessful = () => {
  const { user, userLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const instance = useAxios();
  const [payDetails, setPayDetails] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId && !userLoading) {
      instance
        .post(
          `/paymentSuccess?sessionId=${sessionId}&name=${user?.displayName}`
        )
        .then((res) => {
          setPayDetails(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [sessionId, instance, user, userLoading]);

  return (
    <div className="flex justify-center items-center">
      <title>Payment Successful | BloodLine</title>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-3xl mx-auto border-2 border-secondary rounded-2xl p-5 mt-5 flex flex-col gap-2">
          <h2 className="text-center text-3xl font-bold text-secondary mb-5">
            Payment Successful!
          </h2>
          <div className="flex gap-2 text-2xl">
            <strong>Name:</strong>
            <h2>{payDetails.name}</h2>
          </div>
          <div className="flex gap-2">
            <strong>Email:</strong>
            <span className="break-all">{payDetails.email}</span>
          </div>
          <div className="flex gap-2">
            <strong>Date:</strong>
            <span>{payDetails.date}</span>
          </div>
          <div className="flex gap-2">
            <strong>Amount:</strong>
            <span className="text-secondary">{payDetails.amount} BDT</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-5">
            <Link to="/" className="btn btn-secondary btn-outline">
              Go To Home
            </Link>
            <Link to="/funding" className="btn btn-secondary btn-outline">
              Back To Funding Page
            </Link>
            <a
              href={`${import.meta.env.VITE_SERVER_LINK}/generateReceipt?id=${
                payDetails._id
              }`}
              target="_blank"
              className="btn btn-secondary btn-outline"
            >
              Download Receipt (PDF)
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessful;
