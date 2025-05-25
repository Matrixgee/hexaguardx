import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { userToken } from "../Function/Slice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const url = `https://hexg.onrender.com/api/user/Reset/${userToken}`;
    const data = { password, confirmPassword };

    const toastloading = toast.loading("Please wait....");

    try {
      const response = await axios.put(url, data);
      toast.dismiss(toastloading);
      toast.success(response.data.message || "Password reset successfully");
      navigate("/login");
    } catch (error: any) {
      toast.dismiss(toastloading);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="w-full h-[100vh] bg-[#F8F9F9] flex justify-center items-center">
      <div className="w-[30%] h-[70%] bg-white rounded-md flex justify-around items-center flex-col phone:w-[90%] phone:h-[50%]">
        <div className="w-[100%] h-[10%] flex justify-center items-center">
          <p className="font-bold text-3xl text-blue-600">Reset Password</p>
        </div>
        <div className="w-[100%] h-[50%]  flex justify-around items-center">
          <form
            className="w-[100%] h-[100%] gap-4  flex justify-around flex-col items-center"
            onSubmit={handleResetPassword}
          >
            <div className="w-[90%] h-[40%]   px-1 flex justify-center items-start flex-col">
              <label className="font-bold text-blue-500">
                New Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="py-2 outline-none border-2 px-16 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-[90%] h-[40%]  px-1 flex justify-center items-start flex-col">
              <label className="font-bold text-blue-500">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="py-2 outline-none border-2 px-16 rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-[90%] h-[20%]  flex justify-center items-center">
              <button
                type="submit"
                className="py-2 transition-all duration-300 hover:bg-blue-500 text-white font-semibold px-6 rounded-md bg-blue-700"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
        <div className="w-full h-[25%] flex flex-col items-center justify-around px-6">
          <p>
            Remember your password?{" "}
            <span
              className="text-slate-600 font-bold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
          <p className="text-slate-400 phone:text-sm text-center">
            © Copyright 2024 HexaGuard All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
