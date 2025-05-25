import { motion } from "framer-motion";
import { useTheme } from "../Context/theme";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Bob from "../assets/bob.jpg";
import Blake from "../assets/blake.jpg";
import Erica from "../assets/Erica.jpg";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const navigate = useNavigate();

  const testimonials = [
    {
      name: "ROB AALDERS",
      image: Bob,
      role: "Cryptocurrency Investor",
      quote:
        "I began investing in cryptocurrency in 2017, and at that time, I would rate my knowledge level as a 4 out of 10. However, I have since acquired a solid understanding of the fundamentals, and thanks to my investments with HexaGuard, I have already made over 11 million. This sets me apart from several of my friends who chose to invest their money elsewhere.",
      rating: 5,
      amount: "$11M+",
    },
    {
      name: "BLAKE JOHNSON",
      image: Blake,
      role: "Strategic Investor",
      quote:
        "Investing is the key to financial independence. Through careful planning and strategic investments, I have managed to achieve financial stability and a comfortable lifestyle. The journey was not easy, but the rewards have been worth the effort.",
      rating: 4,
      amount: "$2.5M+",
    },
    {
      name: "ERICA WILLIAMS",
      image: Erica,
      role: "Portfolio Manager",
      quote:
        "Understanding the market trends and making informed investment decisions has significantly improved my financial situation. The support and guidance from experienced investors have been invaluable in my investment journey.",
      rating: 5,
      amount: "$5.8M+",
    },
  ];

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex justify-center items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar
            key={index}
            className={`w-4 h-4 ${
              index < rating
                ? "text-yellow-400 fill-current"
                : isDark
                ? "text-gray-600"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-white"
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
                : "bg-gradient-to-r from-blue-300 to-blue-600 text-white"
            }`}
          >
            CLIENT TESTIMONIALS
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className={isDark ? "text-white" : "text-gray-800"}>
              INVESTORS
            </span>{" "}
            <span className={isDark ? "text-blue-400" : "text-primary"}>
              TESTIMONIALS
            </span>
          </h2>

          <p
            className={`text-lg md:text-xl max-w-4xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Here are a few words from our most trusted investors. These words
            are like guides to us, and they help weave our deep legal and
            technical experience into our financial and investment services.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className={`relative rounded-2xl p-8 ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                  : "bg-white border border-gray-200"
              } shadow-xl hover:shadow-2xl transition-all duration-300`}
            >
              {/* Quote Icon */}
              <div
                className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark ? "bg-blue-900/50" : "bg-blue-100"
                }`}
              >
                <FaQuoteLeft
                  className={`w-5 h-5 ${
                    isDark ? "text-blue-400" : "text-primary"
                  }`}
                />
              </div>

              {/* Profile Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div
                    className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isDark
                        ? "bg-blue-600 text-white"
                        : "bg-primary text-white"
                    }`}
                  >
                    ✓
                  </div>
                </div>

                <h3
                  className={`text-xl font-bold mb-1 ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {testimonial.name}
                </h3>

                <p
                  className={`text-sm mb-2 ${
                    isDark ? "text-blue-400" : "text-primary"
                  }`}
                >
                  {testimonial.role}
                </p>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isDark
                      ? "bg-green-900/50 text-green-400"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  Returns: {testimonial.amount}
                </div>
              </div>

              {/* Quote */}
              <div className="mb-6">
                <p
                  className={`text-sm leading-relaxed text-center ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Rating */}
              <div className="flex flex-col items-center">
                <StarRating rating={testimonial.rating} />
                <p
                  className={`text-xs mt-2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {testimonial.rating}/5 Rating
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <h3
            className={`text-2xl md:text-3xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Ready to Join Our Success Stories?
          </h3>
          <p
            className={`text-lg mb-8 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Start your investment journey today and become our next success
            story.
          </p>
          <button
            className={`px-8 py-4 rounded-lg font-medium text-lg transition-all ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-300 hover:bg-blue-600 text-white"
            }`}
            onClick={() => navigate("/auth/register")}
          >
            Start Investing Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
