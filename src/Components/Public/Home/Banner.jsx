import { Link } from "react-router";
import { FaHeartbeat, FaUsers, FaHandHoldingHeart, FaArrowRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="hero min-h-screen bg-linear-to-br from-base-100 via-base-200 to-base-300 relative overflow-hidden">
      <div className="hero-content text-center max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="badge badge-secondary badge-lg mb-4 sm:mb-6 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">
              <FaHeartbeat className="mr-2" />
              Save Lives Today
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-base-content">Every Drop</span>
              <br />
              <span className="text-secondary">Counts</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-base-content/80 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Connect with blood donors and recipients in your community. 
              Join thousands of heroes who are making a difference, one donation at a time.
            </p>

            {/* Stats - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              <div className="stat bg-base-100/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-base-300 p-3 sm:p-4">
                <div className="stat-figure text-secondary">
                  <FaUsers className="text-xl sm:text-2xl" />
                </div>
                <div className="stat-value text-lg sm:text-2xl text-secondary">10K+</div>
                <div className="stat-desc text-xs sm:text-sm text-base-content/70">Active Donors</div>
              </div>
              <div className="stat bg-base-100/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-base-300 p-3 sm:p-4">
                <div className="stat-figure text-secondary">
                  <FaHandHoldingHeart className="text-xl sm:text-2xl" />
                </div>
                <div className="stat-value text-lg sm:text-2xl text-secondary">50K+</div>
                <div className="stat-desc text-xs sm:text-sm text-base-content/70">Lives Saved</div>
              </div>
              <div className="stat bg-base-100/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-base-300 p-3 sm:p-4">
                <div className="stat-figure text-secondary">
                  <FaHeartbeat className="text-xl sm:text-2xl" />
                </div>
                <div className="stat-value text-lg sm:text-2xl text-secondary">24/7</div>
                <div className="stat-desc text-xs sm:text-sm text-base-content/70">Support</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                to="/auth/register"
                className="btn btn-secondary btn-sm sm:btn-md lg:btn-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <FaHeartbeat className="mr-2" />
                Become a Donor
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                to="/search"
                className="btn btn-outline btn-secondary btn-sm sm:btn-md lg:btn-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Find Blood Donors
              </Link>
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
            {/* Main Circle - Responsive */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
              {/* Background Circles */}
              <div className="absolute inset-0 bg-secondary/10 rounded-full animate-pulse z-10"></div>
              <div className="absolute inset-2 sm:inset-4 bg-secondary/20 rounded-full animate-pulse z-20" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-4 sm:inset-8 bg-secondary/30 rounded-full animate-pulse z-30" style={{ animationDelay: '1s' }}></div>
              
              {/* Center Content */}
              <div className="absolute inset-8 sm:inset-12 bg-secondary rounded-full flex items-center justify-center shadow-2xl z-40">
                <div className="text-center text-white">
                  <FaHeartbeat className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-4 mx-auto animate-bounce" />
                  <div className="text-lg sm:text-xl md:text-2xl font-bold">BloodLine</div>
                  <div className="text-xs sm:text-sm opacity-90">Connecting Lives</div>
                </div>
              </div>

              {/* Floating Elements - Responsive positioning and z-index */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-base-100 p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg border border-base-300 animate-float z-50">
                <div className="text-secondary font-bold text-sm sm:text-lg">A+</div>
                <div className="text-xs text-base-content/70">Available</div>
              </div>
              
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-base-100 p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg border border-base-300 animate-float z-50" style={{ animationDelay: '1s' }}>
                <div className="text-secondary font-bold text-sm sm:text-lg">O-</div>
                <div className="text-xs text-base-content/70">Urgent</div>
              </div>
              
              <div className="absolute top-1/2 -left-4 sm:-left-8 bg-base-100 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg border border-base-300 animate-float z-50" style={{ animationDelay: '2s' }}>
                <div className="text-secondary font-bold text-sm sm:text-base">B+</div>
              </div>
              
              <div className="absolute top-1/4 -right-4 sm:-right-8 bg-base-100 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg border border-base-300 animate-float z-50" style={{ animationDelay: '1.5s' }}>
                <div className="text-secondary font-bold text-sm sm:text-base">AB-</div>
              </div>

              {/* Additional floating elements for larger screens */}
              <div className="hidden md:block absolute top-3/4 right-1/4 bg-base-100 p-2 rounded-lg shadow-lg border border-base-300 animate-float z-50" style={{ animationDelay: '0.5s' }}>
                <div className="text-secondary font-bold text-sm">A-</div>
              </div>
              
              <div className="hidden md:block absolute top-1/4 left-1/4 bg-base-100 p-2 rounded-lg shadow-lg border border-base-300 animate-float z-50" style={{ animationDelay: '2.5s' }}>
                <div className="text-secondary font-bold text-sm">B-</div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-linear-to-r from-secondary/5 to-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;