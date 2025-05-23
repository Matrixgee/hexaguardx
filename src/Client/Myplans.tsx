import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setInvestments, Investment } from "../Function/Slice";
import { toast, Toaster } from "react-hot-toast";

const Myplans: React.FC = () => {
  const [myPlans, setMyPlans] = useState<Investment[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state: { user: any }) => state.user.user?._id);
  const userToken = useSelector((state: { user: any }) => state.user.token);

  useEffect(() => {
    if (userId) {
      getHandle();
    }
  }, [userId]);

  const getHandle = async () => {
    try {
      toast.loading("Fetching your investment plans...");
      const response = await axios.get(
        `https://hexg.onrender.com/api/user/getAllInvestmentPlans/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data && response.data.investments) {
        setMyPlans(response.data.investments);
        dispatch(setInvestments(response.data.investments));
        toast.dismiss();
        toast.success("Investment plans fetched successfully");
      } else {
        setMyPlans([]);
        toast.dismiss();
        toast.error("No investment plans found");
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.dismiss();
      toast.error("Failed to fetch investment plans");
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full h-[100vh] scrollbar-thin overflow-y-scroll">
        <div className="w-full h-max flex flex-col px-10 phone:px-4 py-8 gap-3">
          {myPlans && myPlans.length > 0 ? (
            <>
              <p className="text-[whitesmoke] text-xl font-semibold">
                My Investment ({myPlans.length})
              </p>
              <div className="w-full h-max flex flex-col mt-5 gap-6">
                {myPlans.map((plan) => (
                  <div
                    key={plan._id}
                    className="w-full h-max flex flex-col gap-2 overflow-y-auto"
                  >
                    <p className="text-[rgb(54,74,99)] text-lg font-semibold">
                      Plan # {plan._id?.slice(-3).toUpperCase()}
                    </p>
                    <div className="w-full phone:w-max h-28 border border-gray-500 rounded bg-gray-300 flex flex-col">
                      <div className="w-full h-1/2 border-b border-b-gray-500 flex">
                        <div className="w-1/6 phone:w-24 text-center h-full text-sm flex items-center justify-center font-semibold border-r border-r-gray-500">
                          Plan Name
                        </div>
                        <div className="w-1/6 phone:w-24 text-center h-full text-sm flex items-center justify-center font-semibold border-r border-r-gray-500">
                          Amount Deposited
                        </div>
                        <div className="w-1/6 phone:w-24 text-center h-full text-sm flex items-center justify-center font-semibold border-r border-r-gray-500">
                          Created At
                        </div>
                        <div className="w-1/6 phone:w-24 text-center h-full text-sm flex items-center justify-center font-semibold border-r border-r-gray-500">
                          Duration
                        </div>
                        <div className="w-1/6 phone:w-24 text-center h-full text-sm flex items-center justify-center font-semibold border-r border-r-gray-500">
                          Status
                        </div>
                      </div>
                      <div className="w-full h-1/2 flex">
                        <div className="w-1/6 phone:w-24 text-center text-sm h-full flex items-center justify-center border-r border-r-gray-500">
                          {plan.planName}
                        </div>
                        <div className="w-1/6 phone:w-24 text-center text-sm h-full flex items-center justify-center border-r border-r-gray-500">
                          ${plan.amount}
                        </div>
                        <div className="w-1/6 phone:w-24 text-center text-sm h-full flex items-center justify-center border-r border-r-gray-500">
                          {new Date(plan.createdAt).toLocaleDateString()}
                        </div>
                        <div className="w-1/6 phone:w-24 text-center text-sm h-full flex items-center justify-center border-r border-r-gray-500">
                          {plan.duration}
                        </div>
                        <div className="w-1/6 text-green-500 font-bold phone:w-24 text-center text-sm h-full flex items-center justify-center border-r border-r-gray-500">
                          {plan.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-[whitesmoke] text-xl font-semibold phone:text-lg">
                My Investment (0)
              </p>
              <div className="w-full h-max border border-[#023e8a] bg-[#F2F3F4] rounded">
                <div className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <p className="text-[#0A1128]">You do not have any plans</p>
                  <div onClick={() => navigate("/user/deposit")}>
                    <button className="w-max h-max flex items-center gap-2 bg-[#03045E] rounded text-white px-6 py-2 text-sm font-semibold">
                      <FiPlusCircle />
                      Invest Now
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Myplans;
