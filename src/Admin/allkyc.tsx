import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const AllKyc = () => {
  const [kycList, setKycList] = useState([]);
  const userToken = useSelector((state: any) => state.user.token);

  const fetchKyc = async () => {
    try {
      const res = await axios.get(
        "https://hexg.onrender.com/api/admin/getAllKyc",
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setKycList(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch KYC data");
    }
  };

  const handleKycAction = async (
    _id: string,
    status: "approved" | "declined" | "processing"
  ) => {
    const toastId = toast.loading("Updating...");
    try {
      const res = await axios.put(
        `https://hexg.onrender.com/api/admin/updateKycStatus/${_id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      toast.dismiss(toastId);
      toast.success(res.data.message || "Status updated");
      fetchKyc(); // Refresh
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err.response?.data?.error || "Error updating KYC status");
    }
  };

  useEffect(() => {
    fetchKyc();
  }, []);

  return (
    <div className="w-full h-full px-5 py-5 overflow-x-auto">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">
        All KYC Requests
      </h1>
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Client Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Submitted At</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {kycList.map((kyc: any) => (
            <tr key={kyc._id}>
              <td className="p-3 border">{kyc._id.slice(0, 6)}</td>
              <td className="p-3 border">{kyc.user?.userName || "N/A"}</td>
              <td className="p-3 border">{kyc.user?.email || "N/A"}</td>
              <td className="p-3 border">
                <span
                  className={`px-2 py-1 rounded capitalize ${
                    kyc.status === "pending"
                      ? "bg-yellow-500 text-white"
                      : kyc.status === "approved"
                      ? "bg-green-500 text-white"
                      : kyc.status === "processing"
                      ? "bg-blue-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {kyc.status}
                </span>
              </td>
              <td className="p-3 border">
                {new Date(kyc.createdAt).toLocaleDateString()}
              </td>
              <td className="p-3 border flex flex-wrap gap-2">
                <button
                  onClick={() => handleKycAction(kyc._id, "approved")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleKycAction(kyc._id, "processing")}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Processing
                </button>
                <button
                  onClick={() => handleKycAction(kyc._id, "declined")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllKyc;
