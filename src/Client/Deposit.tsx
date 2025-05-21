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
    "btc" | "eth" | "usdt" | null // Added "usdt" as a valid payment method
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gateway, setGateway] = useState<Gateway | null>(null);

  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.user.token);

  const getAddressByName = async (type: string) => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    const apiUrl = `https://sk-smoky.vercel.app/api/user/getPostByName/${type}`;

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
        : "usdt" // Handle USDT payment mode
    );
    formData.append("amount", amount);
    formData.append("image", proofOfPayment);

    setIsLoading(true);
    const toastLoadingId = toast.loading("Deposit Processing...");
    try {
      const response = await axios.post(
        "https://sk-yzt3.onrender.com/api/user/deposit",
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
    <div className="depositBody w-[100%] h-[100%] bg-[#101829] py-12 overflow-y-scroll scrollbar-thin">
      {showTransactionDetails ? (
        <div className="w-[100%] h-[57rem] flex flex-col justify-center gap-2 items-center">
          <div className="w-[80%] h-[10%]">
            <div
              className="w-[8%] text-lg h-[100%] cursor-pointer flex justify-around items-center"
              onClick={handleBack}
            >
              <FaArrowLeft className="text-gray-300" />
              <p className="font-semibold text-gray-300">Back</p>
            </div>
          </div>
          <div className="Transaction w-[50%] h-[70%] bg-white flex-col flex justify-center items-center">
            <div className="w-[100%] h-[20%] flex justify-around items-center flex-col">
              <p className="text-lg text-gray-500 font-medium">
                Transaction Details
              </p>
              {/* <p className="text-[18px] text-gray-600 font-semibold text-center">
                You are about to pay {transactionDetails?.cryptoAmount} {selectedPaymentMethod?.toUpperCase()} for {amount} USD*
              </p> */}
              {/* <p className="text-[18px] text-gray-600 font-semibold text-center">
                You are about to pay {amount} USD using {selectedPaymentMethod?.toUpperCase()}.
              </p> */}
            </div>
            <div className="w-[70%] h-[8%] flex justify-center items-center">
              <p className="text-gray-600 font-medium">
                <p className="text-[18px] text-gray-600 font-semibold text-center">
                  Please proceed with your payment of ${amount} to the wallet
                  address below.
                </p>
              </p>
            </div>
            <div className="AddressHolder w-[80%] h-[40%] flex justify-around items-center flex-col">
              <div className="Address w-[96%] h-[15%] rounded-md gap-2 bg-gray-300 flex justify-center items-center">
                <p className="walletAddress font-semibold text-gray-600">
                  {transactionDetails?.walletAddress}
                </p>
                <MdContentCopy
                  className="cursor-pointer"
                  onClick={() =>
                    handleCopyAddress(transactionDetails?.walletAddress || "")
                  }
                />
              </div>
              <div className="w-[40%] h-[60%] flex justify-center items-center">
                {transactionDetails &&
                  transactionDetails.qrCode &&
                  typeof transactionDetails.qrCode === "string" && (
                    <img
                      src={transactionDetails.qrCode}
                      alt=""
                      className="w-[100%] h-[100%] object-cover"
                    />
                  )}
                {transactionDetails &&
                  transactionDetails.qrCode &&
                  typeof transactionDetails.qrCode !== "string" && (
                    <img
                      src={URL.createObjectURL(transactionDetails.qrCode)}
                      alt=""
                      className="w-[100%] h-[100%] object-cover"
                    />
                  )}
              </div>
            </div>
            <div className="w-[70%] h-[10%] flex justify-center items-center">
              <button
                className="w-[90%] h-[70%] bg-[#050C1B] text-gray-200 font-semibold rounded-md"
                onClick={handlePaymentMade}
              >
                I have made payment
              </button>
            </div>
            {showProofOfPayment && (
              <div className="w-[80%] h-[20%] flex flex-col items-center gap-3">
                <label
                  className="text-gray-500 font-medium"
                  htmlFor="proof-of-payment"
                >
                  Click to select proof of payment
                </label>
                <input
                  type="file"
                  id="proof-of-payment"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="proof-of-payment"
                  className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded"
                >
                  {proofOfPayment ? proofOfPayment.name : "Select File"}
                </label>
                <button
                  onClick={handleSubmit}
                  className=" py-2 px-12 bg-[#050C1B] text-gray-200 font-semibold rounded-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="texthold w-[100%] h-[10%] flex justify-center items-center">
            <p className="text-3xl text-slate-400 font-bold">
              Fund Your Account
            </p>
          </div>
          <div className="w-[100%] h-[80%] flex justify-center flex-col items-center">
            <div className="DepoistAmount w-[40%] h-[40%] flex justify-center gap-3 flex-col items-start">
              <label htmlFor="" className="text-lg font-semibold text-gray-300">
                Amount to Deposit
              </label>
              <input
                type="text"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-[100%] h-[40%] bg-transparent text-gray-200 border-2 border-slate-400 rounded-lg px-5 outline-none"
              />
            </div>
            <div className="depositHolder w-[40%] h-[80%] flex justify-around items-center flex-col">
              <div className="w-[100%] h-[10%] flex justify-start items-center">
                <p className="text-gray-300 font-semibold">
                  Choose Payment Method
                </p>
              </div>
              <div className="w-[100%] h-[50%] flex justify-around items-center space-x-4">
                <div
                  className={`w-[40%] h-[60%] flex flex-col justify-around items-center cursor-pointer ${
                    selectedPaymentMethod === "btc"
                      ? "border-4 border-[#FFA500]"
                      : "border-2 border-slate-400"
                  } rounded-lg`}
                  onClick={() => setSelectedPaymentMethod("btc")}
                >
                  <FaBtc className="text-4xl text-gray-300" />
                  <p className="text-lg text-gray-300">Bitcoin</p>
                </div>
                <div
                  className={`w-[40%] h-[60%] flex flex-col justify-around items-center cursor-pointer ${
                    selectedPaymentMethod === "eth"
                      ? "border-4 border-[#FFA500]"
                      : "border-2 border-slate-400"
                  } rounded-lg`}
                  onClick={() => setSelectedPaymentMethod("eth")}
                >
                  <FaEthereum className="text-4xl text-gray-300" />
                  <p className="text-lg text-gray-300">Ethereum</p>
                </div>
                <div
                  className={`w-[30%] h-[60%] flex flex-col justify-around items-center cursor-pointer ${
                    selectedPaymentMethod === "usdt"
                      ? "border-4 border-[#FFA500]"
                      : "border-2 border-slate-400"
                  } rounded-lg`}
                  onClick={() => setSelectedPaymentMethod("usdt")}
                >
                  <TbBrandTether className="text-4xl text-gray-300" />
                  <p className="text-lg text-gray-300">USDT</p>
                </div>
              </div>
              <div className="w-[100%] h-[26%] flex justify-center items-center">
                <button
                  className="w-[90%] h-[70%] bg-[#050C1B] text-gray-200 font-semibold rounded-md"
                  onClick={handleProceedToPayment}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Deposit;
