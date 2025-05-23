import { useTheme } from "../Context/theme";
import { motion } from "framer-motion";

const ContactUs = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      value: "support@hexaguardx.com",
      description: "Get in touch for general inquiries",
    },
    {
      icon: "📞",
      title: "Call Us",
      value: "+1903 330 0707",
      description: "Speak with our investment advisors",
    },
    {
      icon: "📍",
      title: "Visit Us",
      value: "123 Financial District, NY 10004",
      description: "Our headquarters in New York",
    },
    {
      icon: "💬",
      title: "Live Chat",
      value: "Available 24/7",
      description: "Instant support when you need it",
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
            Get In <span className="text-primary">Touch</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Ready to start your investment journey? Our team of experts is here
            to help you make informed decisions and achieve your financial
            goals.
          </motion.p>
        </motion.div>

        {/* Contact Info Grid */}
        <motion.div
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                className={`text-center p-6 rounded-xl ${
                  isDark
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                    : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
                } border shadow-lg`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isDark ? "bg-blue-900/40" : "bg-blue-100"
                  }`}
                >
                  <span className="text-3xl">{info.icon}</span>
                </div>
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isDark ? "text-blue-300" : "text-primary"
                  }`}
                >
                  {info.title}
                </h3>
                <p
                  className={`font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {info.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
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
              className={`text-3xl font-bold text-center mb-8 ${
                isDark ? "text-blue-300" : "text-primary"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              Send us a Message
            </motion.h2>

            <motion.form
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                >
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark
                        ? "bg-gray-800 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="Enter your first name"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.4, duration: 0.6 }}
                >
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark
                        ? "bg-gray-800 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="Enter your last name"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.6 }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDark
                      ? "bg-gray-800 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Enter your email address"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.6 }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Subject
                </label>
                <select
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDark
                      ? "bg-gray-800 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-primary focus:border-transparent`}
                >
                  <option>General Inquiry</option>
                  <option>Investment Advice</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.6 }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message
                </label>
                <textarea
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDark
                      ? "bg-gray-800 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.2, duration: 0.6 }}
              >
                <button
                  type="submit"
                  className={`px-8 py-4 rounded-lg font-medium text-lg transition-all ${
                    isDark
                      ? "bg-blue-400 text-white hover:bg-primary/80"
                      : "bg-blue-300 text-white hover:bg-primary/90"
                  } shadow-lg hover:shadow-xl transform hover:scale-105`}
                >
                  Send Message
                </button>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="hidden md:block absolute top-40 right-10 w-64 h-64 bg-primary opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="hidden md:block absolute bottom-20 left-10 w-48 h-48 bg-blue-500 opacity-5 rounded-full blur-2xl -z-10"></div>
    </section>
  );
};

export default ContactUs;
