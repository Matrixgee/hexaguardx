import { useState } from "react";
import {
  Wallet,
  ArrowUpRight,
  Shield,
  Bitcoin,
  DollarSign,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "btc" | "eth" | "usdt" | null
  >(null);
  const [isProcessing, setisProcessing] = useState(false);

  const userToken = useSelector((state: any) => state.user.token);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const url = `https://hexg.onrender.com/api/user/withdraw/${userId}`;

  const headers = {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": "application/json",
  };
  const handleWithdraw = async () => {
    if (!amount || !walletAddress || !paymentMethod) {
      toast.error("Please fill all fields before withdrawing.");
      return;
    }

    const requestData = {
      amount,
      add: walletAddress,
      mode: paymentMethod, // ✅ Send mode as a plain string
    };

    console.log("Sending Data:", requestData); // Debugging

    const toastLoadingId = toast.loading("Processing withdrawal...");

    try {
      const response = await axios.post(url, requestData, { headers });
      setisProcessing(true);
      // Reset form fields
      setPaymentMethod(null);
      setAmount("");
      setWalletAddress("");

      navigate("/user/overview");
      toast.dismiss(toastLoadingId);
      toast.success(response.data.message || "Withdrawal request sent!");
    } catch (error: any) {
      toast.dismiss(toastLoadingId);
      console.error("Withdrawal Error:", error.response?.data);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setisProcessing(false);
    }
  };

  const cryptoOptions = [
    {
      value: "btc",
      label: "Bitcoin",
      icon: "₿",
      gradient: "from-orange-400 to-orange-600",
    },
    {
      value: "eth",
      label: "Ethereum",
      icon: "Ξ",
      gradient: "from-blue-400 to-purple-600",
    },
    {
      value: "usdt",
      label: "USDT",
      icon: "₮",
      gradient: "from-green-400 to-emerald-600",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 h-[calc(100vh-4rem)] overflow-y-scroll flex items-center flex-col px-10 max-md:px-4 py-16 max-md:flex max-md:justify-center max-md:items-center relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="w-1/2 max-md:w-full h-max bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-20 max-md:px-5 py-10 flex flex-col gap-6 items-center shadow-2xl relative ">
        {/* Header with icon */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
            <ArrowUpRight className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white max-md:text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Crypto Withdrawal
            </h2>
            <p className="text-gray-300 text-sm">Secure & instant transfers</p>
          </div>
        </div>

        {/* Amount Input with enhanced styling */}
        <div className="w-full h-max flex flex-col gap-3">
          <label className="text-sm text-gray-200 font-medium flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Amount <span className="text-xs text-gray-400">(USD)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-14 bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-gray-400 outline-none pl-4 pr-12 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
              placeholder="Enter amount..."
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Payment Method Selection - Card Style */}
        <div className="w-full h-max flex flex-col gap-3">
          <label className="text-sm text-gray-200 font-medium flex items-center gap-2">
            <Bitcoin className="w-4 h-4" />
            Payment Method
          </label>
          <div className="grid grid-cols-1 gap-3">
            {cryptoOptions.map((crypto) => (
              <div
                key={crypto.value}
                onClick={() =>
                  setPaymentMethod(crypto.value as "btc" | "eth" | "usdt")
                }
                className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                  paymentMethod === crypto.value
                    ? "border-purple-400 bg-white/20 shadow-lg shadow-purple-500/20"
                    : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-r ${crypto.gradient} flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {crypto.icon}
                    </div>
                    <span className="text-white font-medium">
                      {crypto.label}
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      paymentMethod === crypto.value
                        ? "border-purple-400 bg-purple-400"
                        : "border-gray-400"
                    } transition-all duration-300`}
                  >
                    {paymentMethod === crypto.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet Address Input */}
        <div className="w-full h-max flex flex-col gap-3">
          <label className="text-sm text-gray-200 font-medium flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Wallet Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full h-14 bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-gray-400 outline-none pl-4 pr-12 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
              placeholder="Enter wallet address..."
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Shield className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Enhanced Withdraw Button */}
        <button
          onClick={handleWithdraw}
          disabled={isProcessing}
          className={`w-full h-14 rounded-xl text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            isProcessing
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95"
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              <ArrowUpRight className="w-5 h-5" />
              WITHDRAW FUNDS
            </>
          )}
        </button>

        {/* Security Notice */}
        <div className="w-full p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg">
          <div className="flex items-center gap-2 text-blue-300 text-xs">
            <Shield className="w-4 h-4" />
            <span>All transactions are secured with end-to-end encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
