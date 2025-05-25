import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdCheckCircle } from "react-icons/md";
import axios from "axios";
import { Modal } from "antd";
import { Toaster, toast } from "react-hot-toast";
import { adminTransactionView } from "../Function/Slice";
import { BiLoaderCircle } from "react-icons/bi";

interface Transaction {
  _id: string;
  mode: string;
  transationType: string;
  firstName: string;
  lastName: string;
  email: string;
  amount: number;
  status: "approved" | "pending" | "rejected" | string;
  createdAt: string;
  image: string;
}

const AdminDeposit = () => {
  const adminTransactions = useSelector(
    (state: any) => state.user.adminTransactions
  );
  const userToken = useSelector((state: any) => state.user.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState<
    string | null
  >(null);
  const [modalAction, setModalAction] = useState<string | null>(null);

  const openProofOfPayment = (url: string) => {
    window.open(url, "_blank");
  };

  const getAllTransactions = async () => {
    const url = "https://hexg.onrender.com/api/admin/allTransactions";
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      dispatch(adminTransactionView(response.data.data));
      setLoading(false); // Update loading state once data is fetched
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Failed to fetch transactions. Please try again."); // Set error message
      setLoading(false); // Update loading state in case of error
      toast.error("Failed to fetch transactions. Please try again.");
    }
  };

  useEffect(() => {
    getAllTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userToken]);

  const confirmDeposit = async (transactionId: string) => {
    const confirmUrl = `https://hexg.onrender.com/api/admin/approveDeposit/${transactionId}`;
    try {
      await axios.put(
        confirmUrl,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      // Refresh the transactions list after confirming a deposit
      getAllTransactions();
      toast.success("Deposit confirmed successfully");
    } catch (error) {
      console.error("Error confirming deposit:", error);
      setError("Failed to confirm deposit. Please try again.");
      toast.error("Failed to confirm deposit. Please try again.");
    }
  };

  const handleDecline = async (transactionId: string) => {
    const declineUrl = `https://hexg.onrender.com/api/admin/declineDeposit/${transactionId}`;
    try {
      await axios.put(
        declineUrl,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      // Refresh the transactions list after declining a deposit
      getAllTransactions();
      toast.success("Deposit declined successfully");
    } catch (error) {
      console.error("Error declining deposit:", error);
      setError("Failed to decline deposit. Please try again.");
      toast.error("Failed to decline deposit. Please try again.");
    }
  };

  const showModal = (transactionId: string, action: string) => {
    setCurrentTransactionId(transactionId);
    setModalAction(action);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (currentTransactionId && modalAction) {
      if (modalAction === "approve") {
        confirmDeposit(currentTransactionId);
      } else if (modalAction === "decline") {
        handleDecline(currentTransactionId);
      }
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center ">
        <BiLoaderCircle className="animate-spin" size={40} />
      </div>
    ); // Placeholder for loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Placeholder for error state
  }

  return (
    <div className="w-full h-full scrollbar overflow-y-scroll">
      <Toaster />
      <div className="w-full h-1/5 flex justify-around items-start px-5 flex-col">
        <p className="text-3xl font-bold text-gray-500 max-md:text-xl">
          Manage clients deposits
        </p>
      </div>
      <div className="w-full h-1/6 flex justify-between px-5 items-center max-md:flex-col max-md:h-1/4">
        <div className="w-[40%] h-full flex justify-around items-center max-md:w-full">
          <button className="w-[30%] h-1/2 text-white font-semibold bg-green-500 rounded-md">
            Copy
          </button>
          <button className="w-[30%] h-1/2 text-white font-semibold bg-red-500 rounded-md">
            CSV
          </button>
          <button className="w-[30%] h-1/2 text-white font-semibold bg-blue-500 rounded-md">
            Print
          </button>
        </div>
        <div className="w-1/3 h-full flex justify-center items-center max-md:w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-4/5 h-3/5 rounded-md px-5 border outline-none"
          />
        </div>
      </div>
      <div className="w-full px-5 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Client Name</th>
              <th className="p-3 border">Client Email</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Payment Method</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Date Created</th>
              <th className="p-3 border">Option</th>
            </tr>
          </thead>
          <tbody>
            {adminTransactions.map((transaction: Transaction) => (
              <tr key={transaction._id}>
                <td className="p-3 border">
                  {transaction._id?.slice(-13).toUpperCase()}
                </td>
                <td className="p-3 border">
                  {transaction.firstName} {transaction.lastName}
                </td>
                <td className="p-3 border">{transaction.email}</td>
                <td className="p-3 border">${transaction.amount}</td>

                <td className="p-3 border">{transaction.mode}</td>
                <td className="p-3 border">{transaction.transationType}</td>
                <td className="p-3 border">
                  <span
                    className={`bg-${
                      transaction.status === "pending"
                        ? "yellow"
                        : transaction.status === "approved"
                        ? "green"
                        : "red"
                    }-500 text-white px-2 py-1 rounded`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="p-3 border">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 border flex justify-around">
                  <button className="text-blue-500">
                    <FaEye
                      onClick={() => openProofOfPayment(transaction.image)}
                    />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => showModal(transaction._id, "decline")}
                  >
                    <MdDelete />
                  </button>
                  <button
                    className="text-green-500"
                    onClick={() => showModal(transaction._id, "approve")}
                  >
                    <MdCheckCircle />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title="Confirm Action"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to {modalAction} this deposit?</p>
      </Modal>
    </div>
  );
};

export default AdminDeposit;
