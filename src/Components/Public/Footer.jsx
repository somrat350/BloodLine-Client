import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeart, FaUsers, FaHandHoldingHeart, FaAmbulance } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { Link } from "react-router";
import logoImg from "../../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Donation Requests", path: "/donationRequests" },
    { name: "Find Donors", path: "/findDonors" },
    { name: "Emergency", path: "/emergency" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const services = [
    { name: "Blood Donation", icon: <FaHeart />, path: "/donate" },
    { name: "Find Blood", icon: <FaUsers />, path: "/find-blood" },
    { name: "Emergency Help", icon: <FaAmbulance />, path: "/emergency" },
    { name: "Volunteer", icon: <FaHandHoldingHeart />, path: "/volunteer" }
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: <FaFacebook />, 
      url: "https://www.facebook.com/profile.php?id=61564941795910",
      color: "hover:bg-blue-600"
    },
    { 
      name: "Twitter", 
      icon: <FaXTwitter />, 
      url: "#",
      color: "hover:bg-gray-800"
    },
    { 
      name: "Instagram", 
      icon: <FaInstagram />, 
      url: "#",
      color: "hover:bg-pink-600"
    },
    { 
      name: "LinkedIn", 
      icon: <FaLinkedin />, 
      url: "#",
      color: "hover:bg-blue-700"
    },
    { 
      name: "GitHub", 
      icon: <FaGithub />, 
      url: "https://github.com/somrat350",
      color: "hover:bg-gray-700"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Lives Saved", icon: <FaHeart /> },
    { number: "25,000+", label: "Registered Donors", icon: <FaUsers /> },
    { number: "500+", label: "Blood Banks", icon: <FaHandHoldingHeart /> },
    { number: "24/7", label: "Emergency Support", icon: <FaAmbulance /> }
  ];

  return (
    <footer className="bg-linear-to-b from-base-300 to-base-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats Section */}
        <div className="py-8 sm:py-12 border-b border-base-content/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-3 bg-linear-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center text-base-100 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-base-content mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-base-content/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img src={logoImg} alt="BloodLine" className="w-12 h-12" />
                <div>
                  <h1 className="text-2xl font-bold text-base-content">
                    BloodLine
                  </h1>
                  <div className="flex items-center text-xs text-secondary">
                    <HiSparkles className="mr-1" />
                    Saving Lives Together
                  </div>
                </div>
              </div>
              <p className="text-base-content/70 mb-6 leading-relaxed">
                BloodLine connects donors and patients, making life-saving blood donations faster, easier, and more reliable. Join our community of heroes saving lives every day.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-base-content/70">
                  <FaPhone className="mr-3 text-secondary" />
                  +880 1746596989
                </div>
                <div className="flex items-center text-sm text-base-content/70">
                  <FaEnvelope className="mr-3 text-secondary" />
                  support@bloodline.com
                </div>
                <div className="flex items-center text-sm text-base-content/70">
                  <FaMapMarkerAlt className="mr-3 text-secondary" />
                  123 Health Street, Dhaka, Bangladesh
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-base-content mb-6 flex items-center">
                <HiLightningBolt className="mr-2 text-secondary" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path} 
                      className="text-base-content/70 hover:text-secondary transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold text-base-content mb-6">
                Our Services
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link 
                      to={service.path} 
                      className="text-base-content/70 hover:text-secondary transition-colors duration-200 flex items-center group"
                    >
                      <span className="mr-3 text-secondary group-hover:scale-110 transition-transform duration-200">
                        {service.icon}
                      </span>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Emergency Banner */}
              <div className="mt-6 p-4 bg-linear-to-r from-error/10 to-error/5 border border-error/20 rounded-xl">
                <div className="flex items-center mb-2">
                  <FaAmbulance className="text-error mr-2" />
                  <span className="font-semibold text-base-content">Emergency?</span>
                </div>
                <p className="text-sm text-base-content/70 mb-3">
                  Need blood urgently? Call our 24/7 helpline
                </p>
                <a 
                  href="tel:+8801746596989"
                  className="btn btn-error btn-sm w-full text-base-100"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h3 className="text-lg font-bold text-base-content mb-6">
                Stay Connected
              </h3>
              
              {/* Newsletter */}
              <div className="mb-6">
                <p className="text-base-content/70 text-sm mb-4">
                  Subscribe to get updates on blood drives and health tips
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email"
                    className="input input-bordered input-sm flex-1 focus:input-secondary"
                  />
                  <button className="btn btn-secondary btn-sm">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-base-content/70 text-sm mb-4">Follow us on social media</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-base-content/70 hover:text-base-100 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-base-content/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-base-content/70 text-sm">
                © {currentYear} BloodLine. All rights reserved.
              </p>
              <p className="text-base-content/50 text-xs mt-1">
                Made with ❤️ for humanity
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-xs">
              <Link to="/privacy" className="text-base-content/70 hover:text-secondary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-base-content/70 hover:text-secondary transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-base-content/70 hover:text-secondary transition-colors duration-200">
                Cookie Policy
              </Link>
              <Link to="/sitemap" className="text-base-content/70 hover:text-secondary transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
