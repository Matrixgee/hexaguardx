import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userDeposit, updateInvestmentPlan, setPlan } from "../Function/Slice"; // Adjust the path as needed
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";

const Packages: React.FC = () => {
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
          "https://sk-yzt3.onrender.com/api/user/getAllPlans"
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
        `https://sk-smoky.vercel.app/api/user/invest/${userId}`,
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

  if (loading) {
    return (
      <div className="flex h-screen items-center text-blue-400 bg-[#191c24] justify-center">
        <h2 className="flex items-center">
          Loading{" "}
          <span>
            <BiLoaderCircle className="mr-2 animate-spin" size={22} />
          </span>
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full h-full scrollbar overflow-y-scroll">
      <Toaster />
      <div className="w-full h-[28%] flex justify-start items-center">
        <div className="w-[30%] h-[80%] flex justify-center gap-4 flex-col items-start px-4 phone:w-[90%]">
          <p className="font-semibold text-2xl text-slate-100">
            Available Packages
          </p>
        </div>
      </div>
      <div className="w-[100%] h-[75rem] flex justify-around flex-wrap items-center">
        {plans.map((plan: any, index: number) => (
          <div
            key={index}
            className="w-[30%] h-[50%] bg-white shadow-lg rounded-md flex justify-around items-center flex-col mb-5 phone:w-[90%]"
          >
            <div className="w-full h-[15%] flex justify-start px-5 items-center">
              <p className="text-2xl">{plan.planName}</p>
            </div>
            <div className="w-full h-[17%] flex justify-center items-center">
              <p className="text-5xl ">${plan.planPrice}</p>
            </div>
            <div className="w-full h-[43%] flex-col justify-around items-center flex">
              <div className="w-full h-[14%] px-3 flex justify-between items-center">
                <p>Minimum Possible Deposit:</p>
                <p>${plan.planMinimumPrice}</p>
              </div>
              <div className="w-full h-[14%] px-3 flex justify-between items-center">
                <p>Maximum Possible Deposit:</p>
                <p>${plan.planMaximumPrice}</p>
              </div>
              <div className="w-full h-[14%] px-3 flex justify-between items-center">
                <p>Minimum Return:</p>
                <p>${plan.minimumReturn}</p>
              </div>
              <div className="w-full h-[14%] px-3 flex justify-between items-center">
                <p>Maximum Return:</p>
                <p>${plan.maximumReturn}</p>
              </div>
              <div className="w-full h-[14%] px-3 flex justify-between items-center">
                <p>Gift Bonus:</p>
                <p>${plan.giftBonus}</p>
              </div>
              <div className="w-full h-[14%] px-3 flex justify-between items-center">
                <p>Duration:</p>
                <p>{plan.duration}</p>
              </div>
            </div>
            <div className="w-full h-[20%] flex justify-center items-center flex-col">
              <input
                type="number"
                value={amounts[plan._id] || ""}
                onChange={(e) =>
                  handleInputChange(plan._id, parseInt(e.target.value))
                }
                className="w-[80%] p-2 mb-4 border border-gray-300 rounded-md"
                min={plan.planMinimumPrice}
                max={plan.planMaximumPrice}
              />
              <button
                onClick={() => handleJoinPlan(plan)}
                className="w-[80%] p-2 bg-blue-500 text-white rounded-md"
              >
                Join {plan.planName}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
