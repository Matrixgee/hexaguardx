import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const AdminWithdraw = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const userToken = useSelector((state: any) => state.user.token);

  const fetchWithdrawals = async () => {
    try {
      const response = await axios.get(
        "https://hexg.onrender.com/api/admin/getWithdrawals",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setWithdrawals(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch withdrawals.");
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleApproveWithdraw = async (_id: string) => {
    const toastId = toast.loading("Approving...");
    try {
      const response = await axios.put(
        `https://hexg.onrender.com/api/admin/approveWithdrawal/${_id}`,
        { status: "approved" },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.dismiss(toastId);
      toast.success(response.data.message);
      fetchWithdrawals();
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.error || "Approval failed.");
    }
  };

  const handleDeclineWithdraw = async (_id: string) => {
    const toastId = toast.loading("Declining...");
    try {
      const response = await axios.put(
        `https://hexg.onrender.com/api/admin/declineWithdrawal/${_id}`,
        { status: "rejected" },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.dismiss(toastId);
      toast.success(response.data.message);
      fetchWithdrawals();
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.error || "Decline failed.");
    }
  };

  const handleProcessingWithdraw = async (_id: string) => {
    const toastId = toast.loading("Marking as processing...");
    try {
      const response = await axios.put(
        `https://hexg.onrender.com/api/admin/pendingWithdrawal/${_id}`,
        { status: "processing" },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.dismiss(toastId);
      toast.success(response.data.message);
      fetchWithdrawals();
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.error || "Processing failed.");
    }
  };

  return (
    <div className="w-full h-full scrollbar overflow-y-scroll">
      <div className="w-full px-5 pt-5">
        <p className="text-3xl font-bold text-gray-500 max-md:text-xl">
          Manage Client Withdrawals
        </p>
      </div>

      <div className="w-full px-5 mt-4 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Client Name</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Method</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal: any) => (
              <tr key={withdrawal._id}>
                <td className="p-3 border">{withdrawal._id.slice(0, 6)}</td>
                <td className="p-3 border">
                  {withdrawal.userId?.userName || "N/A"}
                </td>
                <td className="p-3 border">${withdrawal.amount}</td>
                <td className="p-3 border">{withdrawal.mode}</td>
                <td className="p-3 border">
                  <span
                    className={`px-2 py-1 rounded capitalize ${
                      withdrawal.status === "pending"
                        ? "bg-yellow-500 text-white"
                        : withdrawal.status === "approved"
                        ? "bg-green-500 text-white"
                        : withdrawal.status === "processing"
                        ? "bg-blue-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {withdrawal.status}
                  </span>
                </td>
                <td className="p-3 border">{withdrawal.date}</td>
                <td className="p-3 border flex flex-wrap gap-2">
                  <button
                    onClick={() => handleApproveWithdraw(withdrawal._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleProcessingWithdraw(withdrawal._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => handleDeclineWithdraw(withdrawal._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Decline
                  </button>
                  <button className="text-blue-500">
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminWithdraw;
