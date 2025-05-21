import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../Function/Slice"; // Adjust import according to your project structure

interface CreditDebitModalProps {
  isOpen: boolean;
  onClose: () => void;
  _id: string | undefined;
}

interface RootState {
  user: {
    token: string;
  };
}

const CreditDebitModal: React.FC<CreditDebitModalProps> = ({ isOpen, onClose, _id }) => {
  const [amount, setAmount] = useState<number | undefined>();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [creditLoading, setCreditLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userToken = useSelector((state: RootState) => state.user.token);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const handleCreditDebitUser = async () => {
    if (!amount || !selectedOption || !selectedType || (selectedType !== "credit" && selectedType !== "debit")) {
      alert("All fields are required");
      return;
    }

    if (!_id) {
      alert("Invalid user ID");
      return;
    }

    const toastLoadingId = toast.loading("Please wait...");
    setCreditLoading(true);
    try {
      const url = `https://sk-yzt3.onrender.com/api/admin/creditOrDebit/${_id}`;
      const token = userToken;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const data = {
        type: selectedType,
        amount,
        field: selectedOption,
      };
      const response = await axios.put(url, data, { headers });
      dispatch(setAllUsers(response.data.data));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error handling credit/debit:", error);
      toast.error("An error occurred");
    } finally {
      setCreditLoading(false);
      toast.dismiss(toastLoadingId);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-medium mb-4">Credit/Debit User</h2>
        <div className="mb-4">
          <label className="block font-medium">Amount:</label>
          <input
            type="number"
            className="border p-2 rounded-md w-full"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Select Where:</label>
          <select
            className="border p-2 rounded-md w-full"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Select Option</option>
            <option value="referralBonus">Referral Bonus</option>
            <option value="totalProfit">Total Profit</option>
            <option value="accountBalance">Account Balance</option>
            <option value="totalBonus">Total Bonus</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium">Select Type:</label>
          <select
            className="border p-2 rounded-md w-full"
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value="">Select Type</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md mr-2"
            onClick={handleCreditDebitUser}
            disabled={creditLoading}
          >
            Submit
          </button>
          <button
            className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditDebitModal;
