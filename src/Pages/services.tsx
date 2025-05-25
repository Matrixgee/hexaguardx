import { motion } from "framer-motion";
import { useTheme } from "../Context/theme";
import {
  FaChartLine,
  FaShieldAlt,
  FaHeadset,
  FaRobot,
  FaGlobe,
  FaBell,
  FaHandshake,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  type ServiceItem = {
    icon: JSX.Element;
    title: string;
    description: string;
    features: string[];
    gradient: string;
  };

  const navigate = useNavigate();

  const mainServices: ServiceItem[] = [
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Portfolio Management",
      description:
        "Professional portfolio management with AI-driven insights and risk assessment.",
      features: [
        "Diversified portfolios",
        "Risk analysis",
        "Performance tracking",
        "Rebalancing",
      ],
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Secure Trading",
      description:
        "Bank-level security with encrypted transactions and multi-factor authentication.",
      features: [
        "256-bit encryption",
        "Multi-factor auth",
        "Cold storage",
        "Insurance coverage",
      ],
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: <FaRobot className="w-8 h-8" />,
      title: "AI Investment Advisory",
      description:
        "Advanced AI algorithms analyze market trends to provide personalized investment advice.",
      features: [
        "Market analysis",
        "Trend prediction",
        "Risk assessment",
        "Automated alerts",
      ],
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: <FaGlobe className="w-8 h-8" />,
      title: "Global Markets Access",
      description:
        "Access to international markets and diverse investment opportunities worldwide.",
      features: [
        "Global stocks",
        "Forex trading",
        "Commodities",
        "Crypto assets",
      ],
      gradient: "from-orange-500 to-red-600",
    },
  ];

  const additionalServices: ServiceItem[] = [
    {
      icon: <FaHeadset className="w-6 h-6" />,
      title: "24/7 Customer Support",
      description: "Round-the-clock support from our expert team",
      features: ["Live chat", "Phone support", "Email assistance"],
      gradient: "from-indigo-500 to-blue-600",
    },

    {
      icon: <FaBell className="w-6 h-6" />,
      title: "Smart Notifications",
      description: "Intelligent alerts for market opportunities",
      features: ["Price alerts", "News updates", "Portfolio alerts"],
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: <FaHandshake className="w-6 h-6" />,
      title: "Dedicated Account Manager",
      description: "Personal relationship manager for premium clients",
      features: ["Personal advisor", "Priority support", "Custom strategies"],
      gradient: "from-violet-500 to-purple-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  return (
    <div
      className={`w-full py-20 px-4 md:px-8 lg:px-16 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-white"
      }`}
    >
      <div className="container mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span
            className={`inline-block py-3 px-6 rounded-full text-sm font-bold tracking-wider mb-6 ${
              isDark
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "bg-gradient-to-r from-primary to-blue-600 text-white"
            }`}
          >
            OUR SERVICES
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className={isDark ? "text-white" : "text-gray-800"}>
              Comprehensive
            </span>
            <br />
            <span className={isDark ? "text-blue-400" : "text-primary"}>
              Financial Solutions
            </span>
          </h1>

          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We provide a complete suite of investment services designed to help
            you achieve your financial goals with confidence and security.
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className={`rounded-2xl p-8 ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                  : "bg-white border border-gray-200"
              } shadow-xl hover:shadow-2xl transition-all duration-300`}
            >
              <div className="flex items-start space-x-6">
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center`}
                >
                  <div className="text-white">{service.icon}</div>
                </div>

                <div className="flex-1">
                  <h3
                    className={`text-2xl font-bold mb-3 ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`text-base mb-4 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3`}
                        ></div>
                        <span
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Additional Services
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Explore our comprehensive range of supporting services designed to
            enhance your investment experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {additionalServices.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className={`rounded-xl p-6 ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                  : "bg-white border border-gray-200"
              } shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${service.gradient} mb-4`}
              >
                <div className="text-white">{service.icon}</div>
              </div>

              <h3
                className={`text-xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                {service.title}
              </h3>

              <p
                className={`text-sm mb-4 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {service.description}
              </p>

              <ul className="space-y-1">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-2`}
                    ></div>
                    <span
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`rounded-2xl p-8 md:p-12 ${
            isDark
              ? "bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900"
              : "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"
          }`}
        >
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose Our Services?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-lg opacity-90">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-90">Expert Support</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">$2.5B+</div>
                <div className="text-lg opacity-90">Assets Managed</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h3
            className={`text-2xl md:text-3xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Ready to Get Started?
          </h3>
          <p
            className={`text-lg mb-8 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Join thousands of satisfied investors who trust our services for
            their financial growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className={`px-8 py-4 rounded-lg font-medium text-lg transition-all ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-primary hover:bg-blue-600 text-white"
              }`}
              onClick={() => navigate("/auth/register")}
            >
              Start Investing Today
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
