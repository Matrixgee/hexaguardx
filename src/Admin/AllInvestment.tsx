import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { AdminInvestmentPlan } from "../Function/Slice";
import ConfirmActionModal from "../Components/ConfirmActionModal";

const AllInvestment = () => {
  const url = "https://sk-yzt3.onrender.com/api/admin/allInvestments";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [investments, setInvestments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<any | null>(
    null
  );
  const [editForm, setEditForm] = useState({
    amount: "",
    status: "",
    planName: "",
  });

  // States for confirmation modal
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmTitle, setConfirmTitle] = useState("");

  const userToken = useSelector((state: any) => state.user.token);
  const dispatch = useDispatch();

  const deleteInvestment = async (id: string) => {
    const toastloadingId = "please wait.....";
    try {
      const response = await axios.delete(
        `https://sk-yzt3.onrender.com/api/admin/deleteInvestment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      fetchInvestments();
      dispatch(AdminInvestmentPlan(response.data.data));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting investment:", error);
      toast.error("Failed to delete investment. Please try again.");
    } finally {
      toast.dismiss(toastloadingId);
    }
  };

  const refundInvestment = async (id: string) => {
    const toastloadingId = "please wait.....";
    try {
      const response = await axios.put(
        `https://sk-yzt3.onrender.com/api/admin/refundInvestment/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      fetchInvestments();
      dispatch(AdminInvestmentPlan(response.data.data));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error refunding investment:", error);
      toast.error("Failed to refund investment. Please try again.");
    } finally {
      toast.dismiss(toastloadingId);
    }
  };

  const fetchInvestments = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      dispatch(AdminInvestmentPlan(response.data.data));
      setInvestments(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching investments:", error);
      setError("Failed to fetch investments. Please try again.");
      setLoading(false);
    }
  };

  const updateInvestment = async () => {
    if (!selectedInvestment) return;
    const toastloadingId = "please wait....";
    try {
      const response = await axios.put(
        `https://sk-yzt3.onrender.com/api/admin/updateInvestment/${selectedInvestment._id}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      dispatch(AdminInvestmentPlan(response.data.data));
      fetchInvestments();
      toast.success("Update Made Successfully");
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating investment:", error);
      toast.error("Failed to update investment. Please try again.");
    } finally {
      toast.dismiss(toastloadingId);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ended":
        return "text-orange-400";
      case "declined":
        return "text-red-500";
      case "active":
        return "text-green-500";
      default:
        return "";
    }
  };

  const handleDeleteClick = (investment: any) => {
    setConfirmTitle("Delete Investment");
    setConfirmMessage("Are you sure you want to delete this investment?");
    setConfirmAction(() => () => deleteInvestment(investment._id));
    setConfirmModalOpen(true);
  };

  const handleRefundClick = (investment: any) => {
    setConfirmTitle("Refund Investment");
    setConfirmMessage("Are you sure you want to refund this investment?");
    setConfirmAction(() => () => refundInvestment(investment._id));
    setConfirmModalOpen(true);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <BiLoaderCircle className="animate-spin" size={40} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="w-full h-[10%] px-6 flex justify-start items-center">
        <p className="font-semibold text-2xl">All Investments</p>
      </div>
      <div className="w-full h-[80%] bg-white shadow-md">
        <div className="w-full px-5 h-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Client Name</th>
                <th className="p-3 border">Plan Name</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Date Created</th>
                <th className="p-3 border">Option</th>
              </tr>
            </thead>
            <tbody>
              {investments.length > 0 ? (
                investments.map((investment: any) => (
                  <tr key={investment._id} className="hover:bg-gray-100">
                    <td className="p-3 border">
                      {investment._id?.slice(-3).toUpperCase()}
                    </td>
                    <td className="p-3 border">
                      {investment.userId
                        ? `${investment.userId.firstName} ${investment.userId.lastName}`
                        : "N/A"}
                    </td>
                    <td className="p-3 border">
                      {investment.planName || "N/A"}
                    </td>
                    <td className="p-3 border">
                      ${investment.amount?.toFixed(2) || "0.00"}
                    </td>
                    <td
                      className={`p-3 border uppercase font-semibold text-center ${getStatusColor(
                        investment.status
                      )}`}
                    >
                      {investment.status}
                    </td>
                    <td className="p-3 border ">
                      {new Date(investment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2 border flex justify-around items-center">
                      <button
                        className="px-4 py-1 bg-orange-500 text-white font-semibold rounded"
                        onClick={() => {
                          setSelectedInvestment(investment);
                          setEditForm({
                            amount: investment.amount.toString(),
                            status: investment.status,
                            planName: investment.planName,
                          });
                          setOpenModal(true);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="px-4 py-1 bg-red-500 m-3 text-white font-semibold rounded"
                        onClick={() => handleDeleteClick(investment)}
                      >
                        Delete
                      </button>
                      <button
                        className="text-white font-semibold rounded px-4 py-1 bg-yellow-400"
                        onClick={() => handleRefundClick(investment)}
                      >
                        Refund
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center p-3 border">
                    No investments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Action Modal */}
      <ConfirmActionModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => {
          confirmAction();
          setConfirmModalOpen(false);
        }}
        title={confirmTitle}
        message={confirmMessage}
        confirmLabel="Confirm"
      />

      {/* Edit Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Edit Investment</h2>
            <label className="block mb-2">
              Plan Name
              <input
                type="text"
                value={editForm.planName}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    planName: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded mt-1"
              />
            </label>
            <label className="block mb-2">
              Amount
              <input
                type="number"
                value={editForm.amount}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded mt-1"
              />
            </label>
            <label className="block mb-4">
              Status
              <select
                value={editForm.status}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded mt-1"
              >
                <option value="active">Active</option>
                <option value="declined">Declined</option>
                <option value="ended">Ended</option>
              </select>
            </label>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={updateInvestment}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllInvestment;
