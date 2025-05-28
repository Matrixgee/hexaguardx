import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/theme";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const userToken = useSelector((state: any) => state.user.token);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const url = "https://hexg.onrender.com/api/user/forgotPass";
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };

  const forgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastloading = toast.loading("Please wait....");

    try {
      const response = await axios.post(url, { email }, { headers });
      toast.dismiss(toastloading);
      toast.success(
        response.data.message || "Password reset link sent successfully"
      );
      setEmail("");
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
        className={`w-[30%] max-md:w-[90%] h-[60%] max-md:h-[50%] rounded-md flex justify-around items-center flex-col shadow-lg transition-all duration-300 ${
          isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        <div className="w-full h-[20%] flex justify-center items-center">
          <p className="font-bold text-3xl text-blue-600">Password Reset</p>
        </div>
        <div className="w-full h-[50%] flex justify-around items-center">
          <form
            className="w-full h-full flex justify-center flex-col items-center"
            onSubmit={forgetPassword}
          >
            <div className="w-[90%] h-[60%] gap-2 px-1 flex justify-center items-start flex-col">
              <label className="font-bold text-blue-500">
                Your Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`py-3 outline-none border-2 px-4 w-full rounded-md ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="w-full h-[40%] flex justify-center items-center mt-4">
              <button
                type="submit"
                className="py-3 transition-all duration-300 hover:bg-blue-500 text-white font-semibold px-6 rounded-md bg-blue-700"
              >
                Email Password Reset Link
              </button>
            </div>
          </form>
        </div>
        <div className="w-full h-[25%] flex flex-col items-center justify-around px-6 text-center">
          <p>
            Repeat Login?{" "}
            <span
              className="text-slate-600 dark:text-slate-300 font-bold cursor-pointer"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </span>
          </p>
          <p className="text-slate-400 max-md:text-sm">
            © Copyright 2024 HexaGuard. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
