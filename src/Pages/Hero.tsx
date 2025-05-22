import { useTheme } from "../Context/theme";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  return (
    <section
      className={`relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-black via-gray-900 to-blue-900"
          : "bg-gradient-to-br from-white via-blue-50 to-blue-100"
      } pt-24 pb-16 min-h-[85vh]`}
    >
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Hero Content */}
        <motion.div
          className="max-w-5xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl -z-10"></div>

          <motion.h1
            className={`text-4xl md:text-3xl lg:text-6xl font-bold mb-6 ${
              isDark ? "text-blue-300" : "text-gray-900"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Smart Investments,{" "}
            <span className="text-primary">Secured Future</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Our platform combines cutting-edge technology with financial
            expertise to help you build wealth with confidence.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button
              onClick={() => navigate("/auth/register")}
              className={`px-6 py-4 rounded-lg font-medium text-lg transition-all ${
                isDark
                  ? "bg-blue-400 text-white hover:bg-primary/80"
                  : "bg-blue-300 text-white hover:bg-primary/90"
              }`}
            >
              Start Investing
            </button>
            <button
              onClick={() => navigate("/about")}
              className={`px-6 py-4 rounded-lg font-medium text-lg transition-all ${
                isDark
                  ? "bg-indigo-400 text-white hover:bg-indigo-300"
                  : "bg-indigo-600 text-white hover:bg-indigo-500"
              }`}
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="max-w-5xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div
            className={`grid md:grid-cols-3 gap-8 ${
              isDark
                ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
                : "bg-gradient-to-r from-gray-50 via-white to-gray-50"
            } rounded-xl p-8 border ${
              isDark ? "border-gray-700" : "border-gray-200"
            } shadow-lg`}
          >
            {[
              {
                icon: "$",
                value: "$2.5B+",
                label: "Assets Under Management",
              },
              {
                icon: "👥",
                value: "15K+",
                label: "Active Investors",
              },
              {
                icon: "24/7",
                value: "Support",
                label: "Expert Financial Guidance",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.2, duration: 0.6 }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isDark ? "bg-blue-900/40" : "bg-blue-100"
                  }`}
                >
                  <span className="text-primary text-2xl font-bold">
                    {stat.icon}
                  </span>
                </div>
                <h3
                  className={`text-3xl font-bold mb-2 ${
                    isDark ? "text-blue-300" : "text-primary"
                  }`}
                >
                  {stat.value}
                </h3>
                <p className="text-gray-700 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="hidden md:block absolute top-40 right-10 w-64 h-64 bg-primary opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="hidden md:block absolute bottom-20 left-10 w-48 h-48 bg-blue-500 opacity-5 rounded-full blur-2xl -z-10"></div>
    </section>
  );
};

export default Hero;
