import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/theme";
import {
  FaCheck,
  FaStar,
  FaCrown,
  FaRocket,
  FaDiamond,
  FaFire,
  FaWhatsapp,
} from "react-icons/fa6";

const InvestmentPlan = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  type MenuItem = {
    plan: string;
    daily: string;
    investment: string;
    icon: JSX.Element;
    popular?: boolean;
    gradient: string;
  };

  const investPlan: MenuItem[] = [
    {
      plan: "Starter Plan",
      daily: "10% ROI",
      investment: "$1,000 - $5,000",
      icon: <FaRocket className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      plan: "Basic Plan",
      daily: "20% ROI",
      investment: "$5,000 - $15,000",
      icon: <FaCheck className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      plan: "Silver Plan",
      daily: "30% ROI",
      investment: "$15,000 - $20,000",
      icon: <FaStar className="w-8 h-8" />,
      popular: true,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      plan: "Platinum Plan",
      daily: "40% ROI",
      investment: "$20,000 - $50,000",
      icon: <FaCrown className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-600",
    },
    {
      plan: "Master Plan",
      daily: "50% ROI",
      investment: "$50,000 - $150,000",
      icon: <FaDiamond className="w-8 h-8" />,
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      plan: "Ultimate Plan",
      daily: "60% ROI",
      investment: "$150,000+",
      icon: <FaFire className="w-8 h-8" />,
      gradient: "from-yellow-500 to-orange-600",
    },
  ];

  const handleInvestNow = () => {
    navigate("/auth/login");
  };

  // WhatsApp contact function
  const handleWhatsAppContact = () => {
    const phoneNumber = "19033300707";
    const message = encodeURIComponent(
      "Hi! I'm interested in learning more about your investment plans. Could you help me choose the right plan?"
    );

    // WhatsApp URL format
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Open WhatsApp in new tab/window
    window.open(whatsappUrl, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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
          : "bg-gradient-to-br from-gray-100 via-blue-100 to-white"
      }`}
    >
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className={`inline-block py-3 px-6 rounded-full text-sm font-bold tracking-wider mb-6 ${
              isDark
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "bg-gradient-to-r from-primary to-blue-900 text-black"
            }`}
          >
            OUR INVESTMENT PLANS
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className={isDark ? "text-white" : "text-gray-800"}>
              The plans we offer are
            </span>
            <br />
            <span className={isDark ? "text-blue-400" : "text-primary"}>
              specifically made for you
            </span>
          </h2>

          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Choose from our carefully crafted investment plans designed to
            maximize your returns while minimizing risks. Each plan offers
            competitive ROI with flexible investment options.
          </p>
        </motion.div>

        {/* Investment Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {investPlan.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.2 },
              }}
              className={`relative rounded-2xl p-6 ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                  : "bg-white border border-gray-200"
              } shadow-xl hover:shadow-2xl transition-all duration-300`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-r ${plan.gradient}`}
                >
                  <div className="text-white">{plan.icon}</div>
                </div>

                <h3
                  className={`text-2xl md:text-3xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {plan.plan}
                </h3>

                <div
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}
                >
                  {plan.daily}
                </div>
              </div>

              {/* Plan Details */}
              <div className="space-y-4 mb-8">
                <div
                  className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                    isDark ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Investment Range
                  </span>
                  <span
                    className={`font-bold ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {plan.investment}
                  </span>
                </div>

                <div
                  className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                    isDark ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Capital Back
                  </span>
                  <span className="text-green-500 font-bold flex items-center">
                    <FaCheck className="w-4 h-4 mr-2" />
                    Yes
                  </span>
                </div>

                <div
                  className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                    isDark ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Duration
                  </span>
                  <span
                    className={`font-bold ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    30 Days
                  </span>
                </div>

                <div
                  className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                    isDark ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Return Type
                  </span>
                  <span
                    className={`font-bold ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Daily
                  </span>
                </div>
              </div>

              {/* Invest Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleInvestNow}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg`}
              >
                INVEST NOW
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p
            className={`text-lg mb-6 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Need help choosing the right plan? Our experts are here to guide
            you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppContact}
            className={`inline-flex items-center px-8 py-4 rounded-lg font-medium text-lg transition-all ${
              isDark
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            } shadow-lg hover:shadow-xl`}
          >
            <FaWhatsapp className="w-6 h-6 mr-3" />
            Contact Our Experts
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default InvestmentPlan;
