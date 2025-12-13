import { Link } from "react-router";

const PaymentCanceled = () => {
  return (
    <div className="flex items-center justify-center my-5">
      <title>Payment Canceled | BloodLine</title>
      <div className="bg-white shadow-2xl rounded-2xl p-5 sm:p-10 max-w-lg text-center border-t-4 border-secondary">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-secondary/30 text-secondary p-5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-secondary mb-3">
          Payment Canceled
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Your payment was not completed. If this was a mistake, you can try
          again. No money has been deducted.
        </p>

        {/* Buttons */}
        <Link to="/funding" className="btn btn-secondary w-full">
          Try Again
        </Link>

        {/* Footer note */}
        <p className="mt-6 text-xs text-gray-500">
          Need help?{" "}
          <Link to="/contact" className="text-secondary">
            Contact Support
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default PaymentCanceled;
