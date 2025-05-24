import { motion } from "framer-motion";
import TradingViewOne from "../Components/TradingViewOne";
import TradingViewTwo from "../Components/TradingViewTwo";
import { RiMoneyDollarCircleLine, RiShuffleLine } from "react-icons/ri";
import { PiHandDepositFill } from "react-icons/pi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiMoneyStack, GiPayMoney } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import { GoGift } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { setOneUser } from "../Function/Slice";

const Overview = () => {
  const user = useSelector((state: any) => state.user.oneUser);
  const UserToken = useSelector((state: any) => state.user.token);
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();

  const GetUser = async () => {
    try {
      const response = await axios.get(
        `https://hexg.onrender.com/api/user/userprofile/${id}`,
        {
          headers: { Authorization: `Bearer ${UserToken}` },
        }
      );
      dispatch(setOneUser(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-slate-300">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  const CardContent = [
    {
      id: 1,
      Amount: `$${user.accountBalance?.toLocaleString() || "0"}`,
      Title: "Account Balance",
      bg: "from-green-500 to-green-600",
      icon: <MdAttachMoney />,
      trend: "+12.5%",
    },
    {
      id: 2,
      Amount: `$${user.totalProfit?.toLocaleString() || "0"}`,
      Title: "Total Profit",
      bg: "from-purple-500 to-purple-600",
      icon: <GiMoneyStack />,
      trend: "+8.2%",
    },
    {
      id: 3,
      Amount: `$${user.totalBonus?.toLocaleString() || "0"}`,
      Title: "Total Bonus",
      bg: "from-indigo-400 to-indigo-500",
      icon: <GoGift />,
      trend: "+5.1%",
    },
    {
      id: 4,
      Amount: `$${user.referralBonus?.toLocaleString() || "0"}`,
      Title: "Referral Bonus",
      bg: "from-yellow-500 to-yellow-600",
      icon: <RiShuffleLine />,
      trend: "+15.3%",
    },
    {
      id: 5,
      Amount: `${user.investmentPlan || "0"}`,
      Title: "Investment Plan",
      bg: "from-red-500 to-red-600",
      icon: <GiPayMoney />,
      trend: "Active",
    },
    {
      id: 6,
      Amount: `${user.activePlan || "0"}`,
      Title: "Active Plan",
      bg: "from-pink-500 to-pink-600",
      icon: <RiMoneyDollarCircleLine />,
      trend: "Running",
    },
    {
      id: 7,
      Amount: `$${user.totalDeposit?.toLocaleString() || "0"}`,
      Title: "Total Deposit",
      bg: "from-blue-500 to-blue-600",
      icon: <PiHandDepositFill />,
      trend: "+22.7%",
    },
    {
      id: 8,
      Amount: `$${user.totalWithdrawn?.toLocaleString() || "0"}`,
      Title: "Withdrawals",
      bg: "from-slate-500 to-slate-600",
      icon: <BiMoneyWithdraw />,
      trend: "Complete",
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="w-full h-[100%] scrollbar-thin overflow-y-scroll bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header Section */}
      <motion.div
        className="px-6 py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Welcome back, {user?.firstName} {user?.lastName}!
          </motion.h1>
          <motion.p
            className="text-slate-400 text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Here's an overview of your investment portfolio
          </motion.p>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        className="px-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CardContent.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-xl"
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-5`}
                ></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.bg} text-white text-xl mb-4 shadow-lg`}
                  >
                    {item.icon}
                  </div>

                  {/* Amount */}
                  <div className="mb-2">
                    <p className="text-2xl md:text-3xl font-bold text-white">
                      {item.Amount}
                    </p>
                  </div>

                  {/* Title and Trend */}
                  <div className="flex items-center justify-between">
                    <p className="text-slate-300 text-sm font-medium">
                      {item.Title}
                    </p>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 font-medium">
                      {item.trend}
                    </span>
                  </div>
                </div>

                {/* Animated border */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500/50 to-purple-500/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                  }}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Trading Charts Section */}
      <motion.div
        className="px-6 space-y-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Personal Trading Chart */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10">
              <h2 className="text-xl font-semibold text-slate-200 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                Personal Trading Chart
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Real-time market data and trends
              </p>
            </div>
            <div className="p-6">
              <div
                className="bg-white/5 rounded-xl overflow-hidden"
                style={{ height: "400px" }}
              >
                <TradingViewOne />
              </div>
            </div>
          </div>

          {/* Market Cap Chart */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10">
              <h2 className="text-xl font-semibold text-slate-200 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                Market Cap Overview
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Global market capitalization trends
              </p>
            </div>
            <div className="p-6">
              <div
                className="bg-white/5 rounded-xl overflow-hidden"
                style={{ height: "400px" }}
              >
                <TradingViewTwo />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom spacing */}
      <div className="h-12"></div>
    </div>
  );
};

export default Overview;
