import React from "react";
import { useNavigate } from "react-router-dom";

const Review: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="ReviewCard bg-white p-5 rounded-lg shadow-lg max-w-[22rem] text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-400">
          Your Account is Activated but Under Review
        </h2>
        <p className="mb-4">Your registration was successful!</p>
        <p className="mb-4">
          We are excited to welcome you to the DefiSkySpace Crypto community.
        </p>
        <p className="mb-4">
          You will be able to access your account soon once you are confirmed,
          then you can start trading and earning.
        </p>
        <p className="mb-4">
          If you need any help, do not hesitate to reach out to us on the Live
          Chat Support System or email us at{" "}
          <a href="mailto:defiskyspace@gmail.com" className="text-blue-500">
            defiskyspace@gmail.com
          </a>
        </p>
        <p className="font-semibold">Kind Regards, DefiSkySpace</p>
        <button
          onClick={handleBackToLogin}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Back to Login
        </button>
        <p className="mt-8 text-sm text-gray-500">
          © Copyright 2024 DefiSkySpace All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Review;
