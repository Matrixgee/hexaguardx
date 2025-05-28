import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/theme";

const Review: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleBackToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div
      className={`w-full h-screen flex justify-center items-center transition-all duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`ReviewCard w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-8 rounded-3xl shadow-xl transition-all duration-300 ${
          isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-green-400">
          Your Account is Activated but Under Review
        </h2>
        <p className="mb-4 text-base">Your registration was successful!</p>
        <p className="mb-4 text-base">
          We are excited to welcome you to the HexaGuard Crypto community.
        </p>
        <p className="mb-4 text-base">
          You will be able to access your account soon once you are confirmed,
          then you can start trading and earning.
        </p>
        <p className="mb-4 text-base">
          If you need any help, do not hesitate to reach out to us on the Live
          Chat Support System or email us at{" "}
          <a
            href="mailto:HexaGuard@gmail.com"
            className="text-blue-500 underline hover:text-blue-400"
          >
            HexaGuard@gmail.com
          </a>
        </p>
        <p className="font-semibold mb-4">Kind Regards, HexaGuard</p>
        <button
          onClick={handleBackToLogin}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300"
        >
          Back to Login
        </button>
        <p className="mt-8 text-sm text-gray-400">
          © 2024 HexaGuard. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Review;
