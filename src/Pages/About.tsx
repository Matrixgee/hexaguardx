// AboutUs.jsx
import { useTheme } from "../Context/theme";
import { motion } from "framer-motion";

const AboutUs = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      experience: "15+ years",
      expertise: "Investment Strategy",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      experience: "12+ years",
      expertise: "Financial Technology",
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Research",
      experience: "10+ years",
      expertise: "Market Analysis",
    },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Precision",
      description:
        "Every investment decision backed by comprehensive data analysis",
    },
    {
      icon: "🔒",
      title: "Security",
      description: "Bank-level security protocols to protect your investments",
    },
    {
      icon: "🚀",
      title: "Innovation",
      description: "Cutting-edge technology for smarter investment strategies",
    },
    {
      icon: "🤝",
      title: "Trust",
      description: "Transparent processes and honest communication always",
    },
  ];

  return (
    <section
      className={`relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-black via-gray-900 to-blue-900"
          : "bg-gradient-to-br from-white via-blue-50 to-blue-100"
      } pt-24 pb-16 min-h-screen`}
    >
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl -z-10"></div>

          <motion.h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              isDark ? "text-blue-300" : "text-gray-900"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            About <span className="text-primary">Our Mission</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We're revolutionizing personal finance by making sophisticated
            investment strategies accessible to everyone. Our mission is to
            democratize wealth building through technology and expertise.
          </motion.p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          className="max-w-5xl mx-auto mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div
            className={`${
              isDark
                ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
                : "bg-gradient-to-r from-gray-50 via-white to-gray-50"
            } rounded-xl p-8 md:p-12 border ${
              isDark ? "border-gray-700" : "border-gray-200"
            } shadow-lg`}
          >
            <motion.h2
              className={`text-3xl font-bold mb-6 ${
                isDark ? "text-blue-300" : "text-primary"
              }`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Our Story
            </motion.h2>
            <motion.p
              className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Founded in 2019 by a team of financial experts and technologists,
              we recognized the gap between traditional investment advisory
              services and the needs of modern investors. Our platform was born
              from the belief that everyone deserves access to
              professional-grade investment tools.
            </motion.p>
            <motion.p
              className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Today, we manage over $2.5 billion in assets and serve thousands
              of investors worldwide, combining artificial intelligence with
              human expertise to deliver personalized investment strategies.
            </motion.p>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          className="max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
        >
          <motion.h2
            className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              isDark ? "text-blue-300" : "text-gray-900"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            Our Core Values
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                className={`text-center p-6 rounded-xl ${
                  isDark
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                    : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
                } border shadow-lg`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + i * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isDark ? "bg-blue-900/40" : "bg-blue-100"
                  }`}
                >
                  <span className="text-3xl">{value.icon}</span>
                </div>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    isDark ? "text-blue-300" : "text-primary"
                  }`}
                >
                  {value.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.7 }}
        >
          <motion.h2
            className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              isDark ? "text-blue-300" : "text-gray-900"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.6 }}
          >
            Leadership Team
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                className={`text-center p-8 rounded-xl ${
                  isDark
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                    : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
                } border shadow-lg`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3 + i * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div
                  className={`w-20 h-20 rounded-full mx-auto mb-4 ${
                    isDark ? "bg-blue-900/40" : "bg-blue-100"
                  } flex items-center justify-center`}
                >
                  <span className="text-primary text-2xl font-bold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isDark ? "text-blue-300" : "text-primary"
                  }`}
                >
                  {member.name}
                </h3>
                <p
                  className={`font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  {member.experience}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.expertise}
                </p>
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

export default AboutUs;
