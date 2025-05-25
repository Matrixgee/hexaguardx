import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/theme";
import { FaChevronDown, FaQuestionCircle, FaPhone } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Your business phone number for direct calls
  const businessPhoneNumber = "+1-903-330-0707";
  const faqs: FAQItem[] = [
    {
      question: "What investment options do you offer?",
      answer:
        "We offer a comprehensive range of investment options including stocks, bonds, ETFs, mutual funds, real estate investment trusts (REITs), and alternative investments. Our team will help you build a diversified portfolio based on your financial goals and risk tolerance.",
    },
    {
      question: "What is the minimum investment amount?",
      answer:
        "Our standard accounts start with a minimum investment of $5,000. However, we also offer beginner portfolios with a lower minimum of $1,000 to help new investors get started. For premium managed accounts, the minimum investment is $25,000.",
    },
    {
      question: "How do your fees work?",
      answer:
        "We operate on a transparent fee structure with an annual management fee of 0.75% to 1.25%, depending on your portfolio size and the services you choose. There are no hidden fees or commissions. As your investment grows beyond certain thresholds, your fee percentage may decrease.",
    },
    {
      question: "Can I withdraw my money at any time?",
      answer:
        "Yes, you can withdraw your funds at any time without any penalties from our side. However, please note that certain investments may have their own restrictions or tax implications for early withdrawal. Our advisors will always explain any potential implications before you invest.",
    },
    {
      question: "How do you manage investment risk?",
      answer:
        "Risk management is central to our investment philosophy. We use a multi-layered approach including portfolio diversification, regular rebalancing, stress testing, and continuous monitoring of market conditions. We also match investment strategies to your individual risk tolerance level.",
    },
    {
      question: "Do you offer tax-advantaged investment options?",
      answer:
        "Yes, we provide various tax-efficient investment strategies and can help you set up retirement accounts like IRAs, Roth IRAs, and 401(k) rollovers. Our advisors also implement tax-loss harvesting and other strategies to minimize your tax burden while maximizing growth.",
    },
    {
      question: "How secure is my investment data?",
      answer:
        "We employ bank-level security measures including 256-bit SSL encryption, multi-factor authentication, and regular security audits. Your personal and financial data is stored in secure, encrypted databases and we never share your information with third parties without your explicit consent.",
    },
    {
      question: "What support do you provide to new investors?",
      answer:
        "New investors receive comprehensive onboarding including educational resources, one-on-one consultations with our advisors, access to our learning center, and ongoing support through our 24/7 customer service team. We also provide regular portfolio reviews and market updates.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Navigate to contact page
  const handleContactSupport = () => {
    navigate("/contact"); // Adjust this route to match your contact page route
  };

  // Handle phone call
  const handleScheduleCall = () => {
    const phoneUrl = `tel:${businessPhoneNumber}`;
    window.location.href = phoneUrl;
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
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
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
              isDark ? "bg-blue-900/50" : "bg-blue-100"
            }`}
          >
            <FaQuestionCircle
              className={`w-8 h-8 ${isDark ? "text-blue-400" : "text-primary"}`}
            />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className={isDark ? "text-white" : "text-gray-800"}>
              Frequently Asked
            </span>
            <br />
            <span className={isDark ? "text-blue-400" : "text-primary"}>
              Questions
            </span>
          </h2>

          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Find answers to common questions about our investment services and
            processes. Can't find what you're looking for? Contact our support
            team.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`rounded-xl border transition-all duration-300 ${
                isDark
                  ? "bg-gray-800/50 border-gray-700 hover:border-blue-500/50"
                  : "bg-white border-gray-200 hover:border-blue-300"
              } shadow-lg hover:shadow-xl`}
            >
              <button
                className="flex justify-between items-center w-full text-left p-6 focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <h3
                  className={`text-lg md:text-xl font-semibold pr-4 ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {faq.question}
                </h3>

                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isDark ? "bg-blue-900/50" : "bg-blue-100"
                  }`}
                >
                  <FaChevronDown
                    className={`w-4 h-4 ${
                      isDark ? "text-blue-400" : "text-primary"
                    }`}
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div
                        className={`w-full h-px mb-4 ${
                          isDark ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      ></div>
                      <p
                        className={`text-base leading-relaxed ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-16 text-center p-8 rounded-2xl ${
            isDark
              ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-gray-700"
              : "bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Still have questions?
          </h3>
          <p
            className={`text-lg mb-6 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Our expert team is here to help you with any questions about your
            investment journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactSupport}
              className={`px-8 py-4 rounded-lg font-medium text-lg transition-all ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-300 hover:bg-blue-600 text-white"
              } shadow-lg hover:shadow-xl`}
            >
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScheduleCall}
              className={`inline-flex items-center px-8 py-4 rounded-lg font-medium text-lg transition-all border-2 ${
                isDark
                  ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                  : "border-primary text-primary hover:bg-primary hover:text-white"
              } shadow-lg hover:shadow-xl`}
            >
              <FaPhone className="w-4 h-4 mr-2" />
              Schedule a Call
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQSection;
