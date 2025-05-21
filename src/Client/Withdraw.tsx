import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "btc" | "eth" | "usdt" | null
  >(null);

  const userToken = useSelector((state: any) => state.user.token);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const url = `https://sk-yzt3.onrender.com/api/user/withdraw/${userId}`;

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
    }
  };

  return (
    <div className="w-full bg-[#101829] h-full overflow-y-scroll flex items-center flex-col px-10 phone:px-4 py-16 phone:flex phone:justify-center phone:items-center">
      <div className="w-1/2 phone:w-full h-max bg-white rounded px-20 phone:px-5 py-10 flex flex-col gap-5 items-center">
        <p className="text-2xl font-semibold text-[rgb(54,74,99)] text-center phone:text-xl">
          Request New Withdrawal
        </p>

        {/* Amount Input */}
        <div className="w-full h-max flex flex-col gap-2">
          <p className="text-sm text-[rgb(52,67,87)] font-medium">
            Amount <span className="text-xs">(USD)</span>
          </p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full h-14 border border-[rgb(128,148,174)] outline-1 pl-2 outline-[#0238ac] rounded"
            placeholder="Input amount here..."
          />
        </div>

        {/* Payment Method Selection */}
        <div className="w-full h-max flex flex-col gap-2">
          <p className="text-sm text-[rgb(52,67,87)] font-medium">
            Payment Type
          </p>
          <select
            name="paymentType"
            value={paymentMethod || ""}
            onChange={(e) =>
              setPaymentMethod(e.target.value as "btc" | "eth" | "usdt")
            }
            className="w-full h-14 border border-[rgb(128,148,174)] outline-1 outline-[#0238ac] rounded"
          >
            <option value="">Select Payment Type</option>
            <option value="btc">Bitcoin</option>
            <option value="eth">Ethereum</option>
            <option value="usdt">USDT</option>
          </select>
        </div>

        {/* Wallet Address Input */}
        <div className="w-full h-max flex flex-col gap-2">
          <p className="text-sm text-[rgb(52,67,87)] font-medium">
            Wallet Address
          </p>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full h-14 border border-[rgb(128,148,174)] outline-1 pl-2 outline-[#0238ac] rounded"
            placeholder="Enter wallet address here..."
          />
        </div>

        {/* Withdraw Button */}
        <button
          onClick={handleWithdraw}
          className="w-full h-14 bg-[#101829] transition-all duration-300 hover:bg-[#0238ac] text-white rounded text-sm font-semibold"
        >
          WITHDRAW
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
