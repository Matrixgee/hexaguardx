import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import toast from "react-hot-toast";
import Logo from "../assets/skyBig.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Userdata, userToken } from "../Function/Slice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = "https://sk-smoky.vercel.app/api/user/login";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the corresponding error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = (): { [key: string]: string } => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    const Toastloading = toast.loading("Please wait...");

    try {
      const response = await axios.post(url, formData);
      dispatch(Userdata(response.data.data));
      dispatch(userToken(response.data.token));
      localStorage.setItem("id", response.data.data._id);
      toast.success("Login successful!", { duration: 3000 });
      setTimeout(() => {
        if (response.data.data.isAdmin) {
          navigate("/welcomeadmin");
        } else {
          navigate("/user/overview");
        }
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMsg);
      } else {
        toast.error("Error occurred");
      }
    } finally {
      setLoading(false);
      toast.dismiss(Toastloading);
    }
  };

  return (
    <div className="w-full h-[56rem] bg-[#F8F9F9] flex justify-center gap-5 items-center flex-col phone:h-[60rem]">
      <ToastContainer />
      <div className="w-[45%] h-[10%] flex justify-center items-start phone:w-[90%] phone:flex-col phone:px-4 phone:h-[17%] tab:flex-col">
        <div className="w-[40%] h-[90%] flex justify-center items-center">
          <img
            src={Logo}
            alt="Logo"
            onClick={() => navigate("/")}
            className="w-[70%] h-[70%] object-contain cursor-pointer phone:w-[80%] phone:h-[80%]"
          />
        </div>
        <div className="w-[70%] h-[90%] flex justify-center gap-3 items-center phone:w-[90%] smallPhone:w-[100%]">
          <p className="font-medium">Don't have an account?</p>
          <button
            className="Reg-btn w-[25%] h-[70%] bg-blue-500 font-semibold text-gray-100 phone:text-[14px]"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-[40%] h-[55%] flex justify-around flex-col items-center phone:w-[90%] smallPhone:w-[90%]"
      >
        <div className="w-[80%] h-[10%] flex justify-center items-center phone:h-[15%]">
          <p className="text-4xl font-bold text-gray-800 phone:text-[27px] smallPhone:text-xl">
            Login your account
          </p>
        </div>
        <div className="w-[90%] h-[22%] flex justify-around items-start flex-col">
          <label htmlFor="email" className="text-lg">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="w-[100%] h-[52%] px-2 border-blue-500 border-2 outline-none rounded-md"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="w-[90%] h-[22%] flex justify-around items-start flex-col">
          <label htmlFor="password" className="text-lg">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className="w-[100%] h-[52%] px-2 border-blue-500 border-2 outline-none rounded-md"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div className="w-[90%] h-[27%] flex justify-around flex-col items-center">
          <div className="w-[100%] h-[29%] flex justify-end cursor-pointer items-center">
            <p
              className="text-blue-500 font-semibold"
              onClick={() => navigate("/forget")}
            >
              Forget Password
            </p>
          </div>
          <div className="w-[100%] h-[60%] flex justify-center items-center">
            <button
              className="Log-btn w-[90%] h-[60%] bg-blue-500 text-lg font-semibold text-gray-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </div>
      </form>
      <div className="w-[35%] h-[8%] flex justify-center text-center items-center phone:w-[80%]">
        <p className="text-lg text-slate-400 font-medium phone:text-[16px]">
          Copyright 2023 deficrypto-inv. all rights reserved
        </p>
      </div>
    </div>
  );
};

export default Login;
