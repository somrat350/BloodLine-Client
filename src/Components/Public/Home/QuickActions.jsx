import { Link } from "react-router";
import { FaTint, FaExclamationTriangle, FaHeart, FaSearch, FaPlus, FaUsers } from "react-icons/fa";

const QuickActions = () => {
  const actions = [
    {
      title: "Find Blood",
      description: "Search for available donors in your area",
      icon: <FaTint className="text-2xl sm:text-3xl" />,
      link: "/donationRequests",
      color: "from-secondary to-secondary/80",
      emoji: "🩸"
    },
    {
      title: "Emergency Request",
      description: "Post urgent blood need immediately",
      icon: <FaExclamationTriangle className="text-2xl sm:text-3xl" />,
      link: "/dashboard/newDonationRequest",
      color: "from-error to-error/80",
      emoji: "🚨"
    },
    {
      title: "Join Community",
      description: "Become a life-saving blood donor",
      icon: <FaHeart className="text-2xl sm:text-3xl" />,
      link: "/auth/register",
      color: "from-success to-success/80",
      emoji: "❤️"
    },
    {
      title: "Search Donors",
      description: "Find compatible donors nearby",
      icon: <FaSearch className="text-2xl sm:text-3xl" />,
      link: "/search",
      color: "from-info to-info/80",
      emoji: "🔍"
    },
    {
      title: "Request Blood",
      description: "Create a new blood request",
      icon: <FaPlus className="text-2xl sm:text-3xl" />,
      link: "/dashboard/newDonationRequest",
      color: "from-warning to-warning/80",
      emoji: "➕"
    },
    {
      title: "Donor Network",
      description: "Connect with donor community",
      icon: <FaUsers className="text-2xl sm:text-3xl" />,
      link: "/search",
      color: "from-primary to-primary/80",
      emoji: "👥"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-base-100">
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-4">
            Quick Actions
          </h2>
          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto">
            Get started quickly with these essential actions. Whether you need blood or want to donate, we've got you covered.
          </p>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {actions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group card bg-base-200 hover:bg-base-300 border border-base-300 hover:border-secondary/30 transition-all duration-300 cursor-pointer transform shadow-xl hover:scale-105 hover:shadow-2xl"
            >
              <div className="card-body p-4 sm:p-6 text-center">
                {/* Icon with linear background */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-linear-to-br ${action.color} flex items-center justify-center text-base-100 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  {action.icon}
                </div>

                {/* Emoji for visual appeal */}
                <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {action.emoji}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-base-content mb-2 group-hover:text-secondary transition-colors duration-300">
                  {action.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-base-content/70 group-hover:text-base-content/90 transition-colors duration-300">
                  {action.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-secondary font-semibold text-sm flex items-center justify-center">
                    Click to continue
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-linear-to-r from-secondary/10 to-primary/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-secondary/20 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-4">
              Need Help Getting Started?
            </h3>
            <p className="text-base sm:text-lg text-base-content/70 mb-6">
              Our support team is available 24/7 to help you with blood donation or finding donors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="btn btn-secondary btn-sm sm:btn-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Contact Support
              </Link>
              <Link
                to="/help"
                className="btn btn-outline btn-secondary btn-sm sm:btn-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                View Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;