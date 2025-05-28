import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTheme } from "../Context/theme";

import { userToken } from "../Function/Slice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const url = `https://hexg.onrender.com/api/user/Reset/${userToken}`;
    const data = { password, confirmPassword };
    const toastloading = toast.loading("Please wait...");

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
    <div
      className={`w-full h-[100vh] flex justify-center items-center transition-all duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-[#F8F9F9] text-gray-800"
      }`}
    >
      <div
        className={`w-[30%] max-md:w-[90%] h-[70%] max-md:h-[90%] rounded-md shadow-lg flex flex-col justify-around items-center transition-all duration-300 ${
          isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        <div className="w-full h-[10%] flex justify-center items-center">
          <p className="font-bold text-3xl text-blue-600">Reset Password</p>
        </div>

        <div className="w-full h-[50%] flex justify-around items-center">
          <form
            className="w-full h-full gap-4 flex flex-col justify-around items-center"
            onSubmit={handleResetPassword}
          >
            <div className="w-[90%] h-[40%] px-1 flex flex-col justify-center items-start">
              <label className="font-bold text-blue-500">
                New Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className={`py-2 outline-none border-2 w-full px-4 rounded-md ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="w-[90%] h-[40%] px-1 flex flex-col justify-center items-start">
              <label className="font-bold text-blue-500">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className={`py-2 outline-none border-2 w-full px-4 rounded-md ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="w-[90%] h-[20%] flex justify-center items-center">
              <button
                type="submit"
                className="py-2 px-6 bg-blue-700 hover:bg-blue-500 text-white font-semibold rounded-md transition duration-300"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>

        <div className="w-full h-[25%] flex flex-col items-center justify-around px-6 text-center">
          <p>
            Remember your password?{" "}
            <span
              className="text-slate-600 dark:text-slate-300 font-bold cursor-pointer"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </span>
          </p>
          <p className="text-slate-400 max-md:text-sm">
            © Copyright 2024 HexaGuard All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
