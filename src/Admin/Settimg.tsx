import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Setting.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentGateways } from "../Function/Slice";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

interface PaymentGateway {
  _id: number;
  add: string;
  type: string;
  image: string | null; // Updated type to string | null
  qrCodePreview: string | null;
}

const Setting: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null);
  const [qrCodePreview, setQrCodePreview] = useState<string | null>(null);
  const [adminRole, setAdminRole] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const token = useSelector((state: any) => state.user.token);
  const paymentGateways =
    useSelector((state: any) => state.user.paymentGateways) || [];
  const dispatch = useDispatch();

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    getPaymentGateways();
  }, []);

  const getPaymentGateways = async () => {
    try {
      const response = await axios.get(
        "https://hexg.onrender.com/api/admin/getPost",
        { headers }
      );
      dispatch(setPaymentGateways(response.data.data));
    } catch (error) {
      console.error("Error fetching payment gateways:", error);
    }
  };

  const openPaymentModal = (paymentGateway?: PaymentGateway) => {
    if (paymentGateway) {
      setEditId(paymentGateway._id);
      setWalletAddress(paymentGateway.add);
      setWalletType(paymentGateway.type);
      setQrCodeFile(null); // Reset the file input
      setQrCodePreview(paymentGateway.image); // Use the image URL as the preview
    } else {
      setEditId(null);
      setWalletAddress("");
      setWalletType("");
      setQrCodeFile(null);
      setQrCodePreview(null);
    }
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setEditId(null);
    setWalletAddress("");
    setWalletType("");
    setQrCodeFile(null);
    setQrCodePreview(null);
  };

  const openAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastLoadingId = toast.loading("Please wait while updating ");
    try {
      const formData = new FormData();
      formData.append("add", walletAddress);
      formData.append("type", walletType);
      if (qrCodeFile) formData.append("image", qrCodeFile);

      const response = await axios.post(
        "https://hexg.onrender.com/api/admin/postWay",
        formData,
        { headers }
      );
      dispatch(setPaymentGateways([...paymentGateways, response.data.data]));
      toast.success(response.data.message, { duration: 4000 });
      closePaymentModal();
    } catch (error) {
      console.error("Error submitting payment gateway:", error);
    } finally {
      toast.dismiss(toastLoadingId);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hexg.onrender.com/api/admin/roles",
        { adminRole },
        { headers }
      );
      console.log("Admin Role successfully added:", response.data);
      closeAdminModal();
    } catch (error) {
      console.error("Error adding admin role:", error);
    }
  };

  const handleQrCodeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setQrCodeFile(file);
      setQrCodePreview(URL.createObjectURL(file));
    }
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    const toastLoadingId = toast.loading("Please wait while deleting ");
    try {
      await axios.delete(
        `https://hexg.onrender.com/api/admin/deletePost/${deleteId}`,
        { headers }
      );
      dispatch(
        setPaymentGateways(
          paymentGateways.filter((pg: PaymentGateway) => pg._id !== deleteId)
        )
      );
      toast.success("Payment gateway deleted successfully", { duration: 4000 });
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting payment gateway:", error);
    } finally {
      toast.dismiss(toastLoadingId);
    }
  };

  return (
    <div className="setting-container">
      <button onClick={() => openPaymentModal()} className="open-modal-button">
        Add Payment Gateway
      </button>
      <button onClick={openAdminModal} className="open-modal-button">
        Add Admin Role
      </button>
      <div className="table-container">
        <table className="payment-gateways-table">
          <thead>
            <tr>
              <th>Wallet Address</th>
              <th>Wallet Type</th>
              <th>QR Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentGateways.map((gateway: PaymentGateway) => (
              <tr key={gateway._id}>
                <td>{gateway.add}</td>
                <td>{gateway.type}</td>
                <td>
                  {gateway.image && (
                    <img
                      src={gateway.image}
                      alt="QR Code"
                      className="qr-code-preview"
                    />
                  )}
                </td>
                <td>
                  <button
                    onClick={() => openDeleteModal(gateway._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isPaymentModalOpen}
        onRequestClose={closePaymentModal}
        contentLabel="Payment Gateway Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="modal-title">
          {editId !== null ? "Edit" : "Add"} Payment Gateway
        </h2>
        <form onSubmit={handlePaymentSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="walletAddress">Wallet Address</label>
            <input
              type="text"
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="walletType">Wallet Type</label>
            <select
              id="walletType"
              value={walletType}
              onChange={(e) => setWalletType(e.target.value)}
              required
            >
              <option value="">Select Wallet Type</option>
              <option value="btc">Bitcoin (BTC)</option>
              <option value="eth">Ethereum (ETH)</option>
              <option value="usdt"> Tether (USDT)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="qrCodeFile">QR Code Image</label>
            <input
              type="file"
              id="qrCodeFile"
              accept="image/*"
              onChange={handleQrCodeFileChange}
            />
          </div>
          {qrCodePreview && (
            <div className="form-group">
              <img
                src={qrCodePreview}
                alt="QR Code Preview"
                className="qr-code-preview"
              />
            </div>
          )}
          <div className="modal-buttons">
            <button type="submit" className="submit-button">
              Save
            </button>
            <button
              type="button"
              onClick={closePaymentModal}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isAdminModalOpen}
        onRequestClose={closeAdminModal}
        contentLabel="Admin Role Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="modal-title">Add Admin Role</h2>
        <form onSubmit={handleAdminSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="adminRole">Admin Role</label>
            <select
              id="adminRole"
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value)}
              required
            >
              <option value="">Select Admin Role</option>
              <option value="admin">Admin</option>
              <option value="superAdmin">Super Admin</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="submit-button">
              Save
            </button>
            <button
              type="button"
              onClick={closeAdminModal}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="modal-title">Delete Confirmation</h2>
        <p>Are you sure you want to delete this payment gateway?</p>
        <div className="modal-buttons">
          <button onClick={handleDelete} className="submit-button">
            Yes, Delete
          </button>
          <button onClick={closeDeleteModal} className="cancel-button">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Setting;
