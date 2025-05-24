import React, { useEffect, useState } from "react";
import { FaBtc, FaEthereum, FaArrowLeft } from "react-icons/fa";
import { TbBrandTether } from "react-icons/tb";
import { MdContentCopy } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userDeposit } from "../Function/Slice";
import toast from "react-hot-toast";

interface Gateway {
  type: string;
  add: string;
  image: File | null;
}

const Deposit = () => {
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
  const [showProofOfPayment, setShowProofOfPayment] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "btc" | "eth" | "usdt" | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gateway, setGateway] = useState<Gateway | null>(null);

  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.user.token);

  const getAddressByName = async (type: string) => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    const apiUrl = `https://hexg.onrender.com/api/user/getPostByName/${type}`;

    try {
      const response = await axios.get(apiUrl, { headers });
      console.log(response.data.data);
      setGateway(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching address:", error);
      toast.error("Failed to fetch gateway details. Please try again later.");
    }
  };

  useEffect(() => {
    if (selectedPaymentMethod) {
      getAddressByName(selectedPaymentMethod);
    }
  }, [selectedPaymentMethod]);

  const handleProceedToPayment = () => {
    const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber) || amountNumber <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (amountNumber < 100) {
      toast.error("The minimum amount to deposit is $100.");
      return;
    }

    if (selectedPaymentMethod && amount) {
      setShowTransactionDetails(true);
    } else {
      toast.error("Please enter the amount and select a payment method.");
    }
  };

  const handleBack = () => {
    setShowTransactionDetails(false);
    setShowProofOfPayment(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProofOfPayment(event.target.files[0]);
    }
  };

  const handlePaymentMade = () => {
    setShowProofOfPayment(true);
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard!");
  };

  const handleSubmit = async () => {
    if (!selectedPaymentMethod || !amount) {
      toast.error("Please select a payment method and enter the amount.");
      return;
    }

    if (!proofOfPayment) {
      toast.error("Please upload proof of payment.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "mode",
      selectedPaymentMethod === "btc"
        ? "btc"
        : selectedPaymentMethod === "eth"
        ? "eth"
        : "usdt"
    );
    formData.append("amount", amount);
    formData.append("image", proofOfPayment);

    setIsLoading(true);
    const toastLoadingId = toast.loading("Deposit Processing...");
    try {
      const response = await axios.post(
        "https://hexg.onrender.com/api/user/deposit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(userDeposit(response.data.data));
        toast.success(response.data.message);
        setProofOfPayment(null);
        setAmount("");
        setSelectedPaymentMethod(null);
        setShowTransactionDetails(false);
        setShowProofOfPayment(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      toast.dismiss(toastLoadingId);
    }
  };

  const getTransactionDetails = () => {
    if (!gateway || !selectedPaymentMethod) return null;

    return {
      walletAddress: gateway.add,
      qrCode: gateway.image,
    };
  };
  const transactionDetails = getTransactionDetails();

  return (
    <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4 overflow-y-scroll scrollbar-thin">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {showTransactionDetails ? (
        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <button
              className="flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 group"
              onClick={handleBack}
            >
              <FaArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium text-lg">Back</span>
            </button>
          </div>

          {/* Transaction Details Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Transaction Details
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="text-center mb-8">
              <p className="text-white/90 text-lg font-medium">
                Please proceed with your payment of{" "}
                <span className="text-green-400 font-bold text-xl">
                  ${amount}
                </span>{" "}
                to the wallet address below.
              </p>
            </div>

            {/* Wallet Address */}
            <div className="mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white font-mono text-sm break-all flex-1">
                    {transactionDetails?.walletAddress}
                  </p>
                  <button
                    onClick={() =>
                      handleCopyAddress(transactionDetails?.walletAddress || "")
                    }
                    className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <MdContentCopy className="text-white text-xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white rounded-2xl shadow-lg">
                {transactionDetails &&
                  transactionDetails.qrCode &&
                  typeof transactionDetails.qrCode === "string" && (
                    <img
                      src={transactionDetails.qrCode}
                      alt="QR Code"
                      className="w-48 h-48 object-cover rounded-xl"
                    />
                  )}
                {transactionDetails &&
                  transactionDetails.qrCode &&
                  typeof transactionDetails.qrCode !== "string" && (
                    <img
                      src={URL.createObjectURL(transactionDetails.qrCode)}
                      alt="QR Code"
                      className="w-48 h-48 object-cover rounded-xl"
                    />
                  )}
              </div>
            </div>

            {/* Payment Made Button */}
            <div className="text-center mb-6">
              <button
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                onClick={handlePaymentMade}
              >
                I have made payment
              </button>
            </div>

            {/* Proof of Payment Section */}
            {showProofOfPayment && (
              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="text-center">
                  <label className="text-white/80 font-medium block mb-4">
                    Upload proof of payment
                  </label>
                  <input
                    type="file"
                    id="proof-of-payment"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="proof-of-payment"
                    className="inline-block cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium"
                  >
                    {proofOfPayment ? proofOfPayment.name : "Select File"}
                  </label>
                </div>
                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    className="py-3 px-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Fund Your Account
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="max-w-2xl mx-auto space-y-12">
            {/* Amount Input */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <label className="block text-white text-xl font-semibold mb-4">
                Amount to Deposit
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full h-16 bg-white/5 border border-white/20 rounded-2xl px-6 text-white text-xl placeholder-white/50 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-6 flex items-center">
                  <span className="text-white/70 text-xl font-semibold">
                    USD
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-white text-xl font-semibold mb-8">
                Choose Payment Method
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Bitcoin */}
                <div
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedPaymentMethod === "btc"
                      ? "bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-2 border-orange-400 shadow-lg shadow-orange-500/25"
                      : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                  onClick={() => setSelectedPaymentMethod("btc")}
                >
                  <div className="text-center space-y-4">
                    <FaBtc className="text-5xl text-orange-400 mx-auto" />
                    <p className="text-white font-semibold text-lg">Bitcoin</p>
                  </div>
                  {selectedPaymentMethod === "btc" && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Ethereum */}
                <div
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedPaymentMethod === "eth"
                      ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-400 shadow-lg shadow-blue-500/25"
                      : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                  onClick={() => setSelectedPaymentMethod("eth")}
                >
                  <div className="text-center space-y-4">
                    <FaEthereum className="text-5xl text-blue-400 mx-auto" />
                    <p className="text-white font-semibold text-lg">Ethereum</p>
                  </div>
                  {selectedPaymentMethod === "eth" && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* USDT */}
                <div
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedPaymentMethod === "usdt"
                      ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-400 shadow-lg shadow-green-500/25"
                      : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                  onClick={() => setSelectedPaymentMethod("usdt")}
                >
                  <div className="text-center space-y-4">
                    <TbBrandTether className="text-5xl text-green-400 mx-auto" />
                    <p className="text-white font-semibold text-lg">USDT</p>
                  </div>
                  {selectedPaymentMethod === "usdt" && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Proceed Button */}
            <div className="text-center">
              <button
                className="w-full max-w-md py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-purple-500/25"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;
