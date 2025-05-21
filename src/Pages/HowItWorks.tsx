import { AiOutlineUser } from "react-icons/ai";
import { BsBank2 } from "react-icons/bs";
import { RxRocket } from "react-icons/rx";
import { FaSackDollar } from "react-icons/fa6";
import { BsCheck2Circle } from "react-icons/bs";
import { TbChartPie } from "react-icons/tb";
import { LiaDonateSolid } from "react-icons/lia";
import { MdMarkEmailRead } from "react-icons/md";
import { motion } from "framer-motion";
import { useTheme } from "../Context/theme";

const HowItWorks = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  type HowItWorksItem = {
    img: JSX.Element;
    todo: string;
    text: string;
  };

  const theWorks: HowItWorksItem[] = [
    {
      img: (
        <AiOutlineUser className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      ),
      todo: "Register Account",
      text: "By Registering the website you will be able to start your operation",
    },
    {
      img: (
        <MdMarkEmailRead className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      ),
      todo: "Verify Email",
      text: "After creating the account user need to verify the email for account purpose",
    },
    {
      img: (
        <BsCheck2Circle className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      ),
      todo: "Account Verification",
      text: "User's account will be approved after validation",
    },
    {
      img: <BsBank2 className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
      todo: "Deposit Money",
      text: "Users can deposit using any automatic or manual gateways",
    },
    {
      img: <RxRocket className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
      todo: "Invest in a Plan",
      text: "Users can invest to any the plan or schema to enjoy the profit which will add on profit wallet",
    },
    {
      img: <TbChartPie className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
      todo: "Transfer Money",
      text: "Users can transfer the fund to another user instantly",
    },
    {
      img: (
        <LiaDonateSolid className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      ),
      todo: "Refer to Friends",
      text: "For referring to any friends user can generate the bonus",
    },
    {
      img: <FaSackDollar className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />,
      todo: "Withdraw and Enjoy",
      text: "Withdraw can be performed in the main wallet and it will take a few time to complete",
    },
  ];

  // Animation variants for staggered children
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
      className={`w-full py-20 px-4 md:px-10 lg:px-16 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <span
            className={`inline-block py-2 px-6 rounded-full text-sm font-medium tracking-wider mb-5 ${
              isDark ? "bg-blue-600 text-white" : "bg-primary text-white"
            }`}
          >
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
            <span className={isDark ? "text-blue-400" : "text-primary"}>
              What do you need
            </span>{" "}
            <span className={isDark ? "text-white" : "text-gray-800"}>
              to start?
            </span>
          </h2>
          <p
            className={`text-center max-w-2xl text-sm md:text-base lg:text-lg ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Follow these simple steps to begin your investment journey with us
            and secure your financial future.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {theWorks.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative rounded-xl p-6 ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg border border-gray-700"
                  : "bg-white shadow-lg border border-gray-100"
              } hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="mb-6 relative">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex justify-center items-center ${
                    isDark ? "bg-blue-900/70" : "bg-blue-100"
                  }`}
                >
                  <div
                    className={`${isDark ? "text-blue-300" : "text-primary"}`}
                  >
                    {item.img}
                  </div>
                </div>
                <div
                  className={`w-8 h-8 rounded-full absolute -top-2 -right-2 flex items-center justify-center ${
                    isDark ? "bg-blue-600" : "bg-primary"
                  }`}
                >
                  <span className="text-white font-bold text-sm">
                    {index + 1}
                  </span>
                </div>
              </div>

              <h3
                className={`text-xl md:text-2xl font-semibold mb-3 ${
                  isDark ? "text-blue-400" : "text-primary"
                }`}
              >
                {item.todo}
              </h3>

              <p
                className={`text-sm md:text-base ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <button
            className={`px-8 py-4 rounded-lg text-white font-medium text-lg transition-all ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-primary hover:bg-blue-600"
            }`}
          >
            Start Your Journey Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
