import { FormEvent, useState } from "react";
import { useTheme } from "../Context/theme";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { motion } from "framer-motion";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "../config/axiosconig";

import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

const SignUp = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    const toastLoading = toast.loading("Please wait");

    if (
      !formData.firstName ||
      !formData.userName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      // !formData.country ||
      !formData.password ||
      !formData.confirmPassword ||
      !termsAccepted
    ) {
      toast.error(
        "Please input all fields and accept the terms and conditions"
      );
    } else if (formData.confirmPassword !== formData.password) {
      toast.error("Passwords do not match");
    } else {
      setLoading(false);
      try {
        const response = await axios.post("/user/signup", formData);
        toast.success(response.data.message);
        setFormData({
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        });
        setTermsAccepted(false);
        navigate("/login");
      } catch (error: any) {
        if (isAxiosError(error)) {
          const errorMsg = error.response?.data?.message || "An error occurred";
          toast.error(errorMsg);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        setLoading(false);
        toast.dismiss(toastLoading);
      }
    }
  };

  const inputClasses = `w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
    isDark
      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
  }`;

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-gray-50 to-blue-50"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-lg w-full rounded-2xl shadow-xl overflow-hidden transition-colors duration-500 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Progress Bar */}
        <div className={`h-1 ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
          <motion.div
            className={`h-full ${isDark ? "bg-purple-500" : "bg-blue-500"}`}
            initial={{ width: currentStep === 1 ? "50%" : "100%" }}
            animate={{ width: currentStep === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="p-8 sm:p-10">
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`h-24 w-24 rounded-full flex items-center justify-center mb-4 shadow-lg ${
                isDark
                  ? "bg-gradient-to-br from-purple-600 to-blue-600"
                  : "bg-gradient-to-br from-blue-500 to-purple-500"
              }`}
            >
              <span className="text-white text-3xl font-bold">DS</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`text-center text-3xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Create Account
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-center ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {currentStep === 1 ? "Basic Information" : "Account Security"}
            </motion.p>
          </div>

          <form className="space-y-6" onSubmit={handleSignup}>
            {currentStep === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="firstName"
                      className={`block text-sm font-medium mb-1 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className={inputClasses}
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className={`block text-sm font-medium mb-1 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className={inputClasses}
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="userName"
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Username
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="johndoe123"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputClasses}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    className={inputClasses}
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="relative">
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className={`${inputClasses} pr-10`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className={`absolute right-3 top-[2.1rem] ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <BsEyeSlash size={18} />
                    ) : (
                      <BsEye size={18} />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <label
                    htmlFor="confirmPassword"
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className={`${inputClasses} pr-10`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className={`absolute right-3 top-[2.1rem] ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <BsEyeSlash size={18} />
                    ) : (
                      <BsEye size={18} />
                    )}
                  </button>
                </div>

                <div className="flex items-start mt-4">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className={`h-4 w-4 rounded focus:ring-2 ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500"
                          : "border-gray-300 text-blue-600 focus:ring-blue-500"
                      }`}
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                  </div>
                  <label
                    htmlFor="terms"
                    className={`ml-3 block text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    I agree with the{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Terms & Conditions
                    </a>
                  </label>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between">
              {currentStep === 2 && (
                <motion.button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isDark
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className={`ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white ${
                  isDark
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDark ? "focus:ring-purple-500" : "focus:ring-blue-500"
                } transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  "Processing..."
                ) : currentStep === 1 ? (
                  <>
                    Continue <FiArrowRight className="ml-2" />
                  </>
                ) : (
                  <>
                    Create Account <FiCheck className="ml-2" />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Already have an account?{" "}
              <a
                href="/auth/login"
                className={`font-medium ${
                  isDark ? "text-purple-400" : "text-blue-500"
                } hover:underline`}
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
