/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const Updatekyc = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    accountNumber: "",
    routingNumber: "",
    bankName: "",
    accountType: "",
    ppEmail: "",
    country: "",
    dateOfBirth: "",
    mAddress: "",
  });

  type Errors = {
    fullName?: string;
    accountNumber?: string;
    routingNumber?: string;
    bankName?: string;
    accountType?: string;
    ppEmail?: string;
    country?: string;
    dateOfBirth?: string;
    mAddress?: string;
  };

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (formData.ppEmail && !/\S+@\S+\.\S+/.test(formData.ppEmail)) {
      newErrors.ppEmail = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("KYC Update Data:", formData);
      alert("KYC information updated successfully!");
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="h-screen overflow-y-scroll scrollbar-thin bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Update KYC Information
          </h1>
          <p className="text-blue-100 text-lg">
            Please update your Know Your Customer details
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-white font-semibold text-sm">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-300 text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="block text-white font-semibold text-sm">
                Country *
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                placeholder="Enter your country"
              />
              {errors.country && (
                <p className="text-red-300 text-sm">{errors.country}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="block text-white font-semibold text-sm">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* PayPal Email */}
            <div className="space-y-2">
              <label className="block text-white font-semibold text-sm">
                PayPal Email
              </label>
              <input
                type="email"
                name="ppEmail"
                value={formData.ppEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                placeholder="Enter PayPal email"
              />
              {errors.ppEmail && (
                <p className="text-red-300 text-sm">{errors.ppEmail}</p>
              )}
            </div>
          </div>

          {/* Mailing Address */}
          <div className="space-y-2">
            <label className="block text-white font-semibold text-sm">
              Mailing Address
            </label>
            <textarea
              name="mAddress"
              value={formData.mAddress}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Enter your mailing address"
            />
          </div>

          {/* Banking Information Section */}
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Banking Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bank Name */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm">
                  Bank Name *
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  placeholder="Enter bank name"
                />
                {errors.bankName && (
                  <p className="text-red-300 text-sm">{errors.bankName}</p>
                )}
              </div>

              {/* Account Type */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm">
                  Account Type
                </label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                >
                  <option value="" className="text-gray-800">
                    Select account type
                  </option>
                  <option value="checking" className="text-gray-800">
                    Checking
                  </option>
                  <option value="savings" className="text-gray-800">
                    Savings
                  </option>
                </select>
              </div>

              {/* Account Number */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  placeholder="Enter account number"
                />
              </div>

              {/* Routing Number */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm">
                  Routing Number
                </label>
                <input
                  type="text"
                  name="routingNumber"
                  value={formData.routingNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                  placeholder="Enter routing number"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update KYC Information"
              )}
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-blue-100 text-sm">
            All information is encrypted and securely stored. Fields marked with
            * are required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Updatekyc;
