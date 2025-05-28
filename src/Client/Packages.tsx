/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Package, DollarSign, Zap, Star, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPlan, updateInvestmentPlan, userDeposit } from "../Function/Slice";
import toast from "react-hot-toast";

const Packages = () => {
  const userToken = useSelector((state: any) => state.user.token);
  const userId = useSelector((state: any) => state.user.user?._id);
  const plans = useSelector((state: any) => state.user.plans);

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
          duration: plan.duration,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status !== 200) throw new Error("Failed to join plan");

      const result = response.data.data;
      dispatch(userDeposit(result.deposit));
      dispatch(updateInvestmentPlan(plan.totalAmount));

      toast.success("Successfully joined the plan", { id: loadingToast });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error;
      if (errorMessage === "Can't invest below the required minimum deposit") {
        toast.error("You cannot invest below the minimum deposit amount.", {
          id: loadingToast,
        });
      } else if (errorMessage === "Please provide a valid amount") {
        toast.error(
          "The amount provided is not valid. Please enter a correct amount.",
          { id: loadingToast }
        );
      } else if (errorMessage === "Insufficient account balance") {
        toast.error(
          "Insufficient account balance. Please deposit more funds.",
          { id: loadingToast }
        );
      } else {
        toast.error("Error joining plan", { id: loadingToast });
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
    <div className="w-full h-full overflow-x-hidden overflow-y-scroll bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-60 h-60 md:w-72 md:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-52 h-52 md:w-64 md:h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative  px-4 sm:px-6 lg:px-10 pb-20">
        {/* Header */}
        <div className="w-full py-10 flex flex-col md:flex-row items-start md:items-center">
          <div className="flex gap-4 items-center">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">Investment Packages</h1>
              <p className="text-gray-400 text-sm">
                Choose your perfect investment plan
              </p>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {plans.map((plan: any, index: number) => (
            <div
              key={plan._id}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Plan Icon and Name */}
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
                  <DollarSign className="w-6 h-6 text-green-400" />
                  <span className="text-4xl font-bold text-white">
                    {plan.planPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Plan Features */}
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between p-3 bg-white/5 rounded-xl border border-white/10 text-white">
                  <span className="text-gray-300">Minimum Deposit:</span>
                  <span>${plan.planMinimumPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-white/5 rounded-xl border border-white/10 text-white">
                  <span className="text-gray-300">Maximum Deposit:</span>
                  <span>${plan.planMaximumPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-green-500/10 rounded-xl border border-green-500/20 text-green-400">
                  <span>Min Return:</span>
                  <span>${plan.minimumReturn.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-green-500/10 rounded-xl border border-green-500/20 text-green-400">
                  <span>Max Return:</span>
                  <span>${plan.maximumReturn.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
                  <span>Gift Bonus:</span>
                  <span>${plan.giftBonus}</span>
                </div>
                <div className="flex justify-between p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                  <span>Duration:</span>
                  <span>{plan.duration}</span>
                </div>
              </div>

              {/* Input and Join Button */}
              <div className="space-y-4">
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={amounts[plan._id] || ""}
                    onChange={(e) =>
                      handleInputChange(plan._id, parseInt(e.target.value))
                    }
                    className="w-full h-12 pl-12 pr-4 bg-white/10 border border-white/30 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-purple-400/20 focus:border-purple-400 transition-all duration-300"
                    placeholder={`Min: $${plan.planMinimumPrice}`}
                    min={plan.planMinimumPrice}
                    max={plan.planMaximumPrice}
                  />
                </div>

                <button
                  onClick={() => handleJoinPlan(plan)}
                  className={`group w-full h-12 bg-gradient-to-r ${getPlanGradient(
                    index
                  )} hover:shadow-lg hover:shadow-purple-500/25 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}
                >
                  <span>Join {plan.planName}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Most Popular Badge */}
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    🔥 Most Popular
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
