/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  Gift,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPlan, updateInvestmentPlan, userDeposit } from "../Function/Slice";
import toast from "react-hot-toast";

const Packages = () => {
  const userToken = useSelector((state: any) => state.user.token);
  const userId = useSelector((state: any) => state.user.user?._id);
  const plans = useSelector((state: any) => state.user.plans);
  console.log(plans);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [amounts, setAmounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const getAllPlans = async () => {
      try {
        const response = await axios.get(
          "https://hexg.onrender.com/api/user/getAllPlans"
        );
        dispatch(setPlan(response.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load plans.");
        setLoading(false);
      }
    };

    getAllPlans();
  }, [dispatch]);

  const handleInputChange = (planId: string, value: number) => {
    setAmounts({
      ...amounts,
      [planId]: value,
    });
  };

  const handleJoinPlan = async (plan: any) => {
    const amount = amounts[plan._id];
    const loadingToast = toast.loading("Joining plan...");
    try {
      const response = await axios.post(
        `https://hexg.onrender.com/api/user/invest/${userId}`,
        {
          planName: plan.planName,
          amount,
          duration: plan.duration, // Send duration to the server
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to join plan");
      }

      const result = response.data.data;
      dispatch(userDeposit(result.deposit)); // Assuming the API returns the new deposit
      dispatch(updateInvestmentPlan(plan.totalAmount)); // Update the investment plan in the state

      toast.success("Successfully joined the plan", {
        id: loadingToast,
      });

      // Redirect to the overview page after success
      // setTimeout(() => {
      //   window.location.href = "/user/overview"; // Adjust the path as needed
      // }, 1500);
    } catch (error: any) {
      console.error("Error joining plan:", error);

      const errorMessage = error.response?.data?.error;

      if (errorMessage === "Can't invest below the required minimum deposit") {
        toast.error("You cannot invest below the minimum deposit amount.", {
          id: loadingToast,
        });
      } else if (errorMessage === "Please provide a valid amount") {
        toast.error(
          "The amount provided is not valid. Please enter a correct amount.",
          {
            id: loadingToast,
          }
        );
      } else if (errorMessage === "Insufficient account balance") {
        toast.error(
          "Insufficient account balance. Please deposit more funds.",
          {
            id: loadingToast,
          }
        );
      } else {
        toast.error("Error joining plan", {
          id: loadingToast,
        });
      }
    }
  };

  const getPlanGradient = (index: number) => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
    ];
    return gradients[index % gradients.length];
  };

  const getPlanIcon = (index: number) => {
    const icons = [Package, Star, Zap];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-8 h-8 text-white" />;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        <div className="flex items-center gap-3 text-white">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span className="text-xl">Loading Investment Plans...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full scrollbar overflow-y-scroll bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="w-full h-[28%] flex justify-start items-center px-10 max-md:px-4">
          <div className="w-[30%] h-[80%] flex justify-center gap-4 flex-col items-start max-md:w-[90%]">
            <div className="flex items-center gap-4 mt-2 py-7">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div className=" w-[23rem] ">
                <h1 className="font-bold text-xl text-white">
                  Investment Packages
                </h1>
                <p className="text-gray-400 text-sm">
                  Choose your perfect investment plan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="px-10 max-md:px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {plans.map(
              (
                plan: {
                  _id: string;
                  planName: string;
                  planPrice: number;
                  planMinimumPrice: number;
                  planMaximumPrice: number;
                  minimumReturn: number;
                  maximumReturn: number;
                  giftBonus: number;
                  duration: string;
                  totalAmount?: number;
                },
                index: number
              ) => (
                <div
                  key={plan._id}
                  className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${getPlanGradient(
                        index
                      )} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {getPlanIcon(index)}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.planName}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      <DollarSign className="w-8 h-8 text-green-400" />
                      <span className="text-5xl font-bold text-white">
                        {plan.planPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Plan Features */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-gray-300">Minimum Deposit:</span>
                      <span className="text-white font-semibold">
                        ${plan.planMinimumPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-gray-300">Maximum Deposit:</span>
                      <span className="text-white font-semibold">
                        ${plan.planMaximumPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Min Return:</span>
                      </div>
                      <span className="text-green-400 font-semibold">
                        ${plan.minimumReturn.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Max Return:</span>
                      </div>
                      <span className="text-green-400 font-semibold">
                        ${plan.maximumReturn.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300">Gift Bonus:</span>
                      </div>
                      <span className="text-purple-400 font-semibold">
                        ${plan.giftBonus}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">Duration:</span>
                      </div>
                      <span className="text-blue-400 font-semibold">
                        {plan.duration}
                      </span>
                    </div>
                  </div>

                  {/* Investment Input */}
                  <div className="space-y-4">
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={amounts[plan._id] || ""}
                        onChange={(e) =>
                          handleInputChange(plan._id, parseInt(e.target.value))
                        }
                        className="w-full h-14 bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-gray-400 outline-none pl-12 pr-4 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                        placeholder={`Min: $${plan.planMinimumPrice}`}
                        min={plan.planMinimumPrice}
                        max={plan.planMaximumPrice}
                      />
                    </div>

                    <button
                      onClick={() => handleJoinPlan(plan)}
                      className={`group w-full h-14 bg-gradient-to-r ${getPlanGradient(
                        index
                      )} hover:shadow-lg hover:shadow-purple-500/25 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}
                    >
                      <span>Join {plan.planName}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>

                  {/* Hover Effect Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${getPlanGradient(
                      index
                    )} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500 pointer-events-none`}
                  ></div>

                  {/* Popular Badge for middle plan */}
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                        🔥 Most Popular
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
