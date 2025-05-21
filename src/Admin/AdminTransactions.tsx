// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { BsEye } from "react-icons/bs";
// import { CiMenuKebab } from "react-icons/ci";
// import toast from "react-hot-toast";
// import { Modal } from "antd";
// import { adminTransactionView } from "../Function/Slice";
//  // Adjust the import based on your store location

// interface Transaction {
//     _id: string;
//     mode: string;
//     firstName: string;
//     amount: number;
//     status: "approved" | "pending" | "rejected" | string;
//     createdAt: string;
//     image: string;
// }

// const AdminTransactions: React.FC = () => {
//     const dispatch = useDispatch();
//     const userToken = useSelector((state: any) => state.user.token);
//     const adminTransactions = useSelector((state:any) => state.user.adminTransactions);

//     const [menuIndex, setMenuIndex] = useState<number | null>(null);
//     const [showMenu, setShowMenu] = useState<boolean[]>([]);
//     const menuRefs = useRef<(HTMLDivElement | null)[]>([]); // Update the type here
//     const [loading, setLoading] = useState<boolean>(false);
//     const [openConfirm, setOpenConfirm] = useState(false);
//     const [selectedItemId, setSelectedItemId] = useState<string>('');

//     const handleRequestError = (error: any) => {
//         const errorMsg = error.response ? error.response.data.message : 'An error occurred.';
//         toast.error(errorMsg);
//     };

//     useEffect(() => {
//         getAllTransactions();
//     }, []);

//     const getAllTransactions = async () => {
//         const url = 'https://sk-yzt3.onrender.com/api/admin/allTransactions';
//         const headers = { Authorization: `Bearer ${userToken}` };
//         try {
//             const response = await axios.get(url, { headers });
//             dispatch(adminTransactionView(response.data.data));
//             console.log(response.data.data);
//             // Initialize the showMenu state
//             setShowMenu(Array(response.data.data.length).fill(false));
//         } catch (error) {
//             handleRequestError(error);
//         }
//     };

//     const handleClickOutside = (event: MouseEvent) => {
//         if (menuRefs.current && menuRefs.current.every((ref) => ref && !ref.contains(event.target as Node))) {
//             setMenuIndex(null);
//             setShowMenu(Array(adminTransactions?.length || 0).fill(false));
//         }
//     };

//     useEffect(() => {
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [adminTransactions, menuIndex]);

//     const openProofOfPayment = (url: string) => {
//         window.open(url, "_blank");
//     };

//     const handleShow = (index: number, item_id: string) => {
//         const newShowMenu = [...showMenu];
//         newShowMenu[index] = !newShowMenu[index];
//         setShowMenu(newShowMenu);
//         setSelectedItemId(item_id);
//         setMenuIndex(index);
//     };

//     const handleConfirm = () => {
//         if (!selectedItemId) return;
//         const toastLoadingId = toast.loading("Please wait...");
//         setLoading(true);
//         const url = `https://sk-yzt3.onrender.com/api/admin/approveDeposit/${selectedItemId}`;
//         const headers = { Authorization: `Bearer ${userToken}` };
//         axios.put(url, {}, { headers })
//             .then((response) => {
//                 setLoading(false);
//                 toast.dismiss(toastLoadingId);
//                 console.log(response);
//                 getAllTransactions();
//                 toast.success(`Payment Confirmed`);
//                 setOpenConfirm(false);
//             })
//             .catch((error) => {
//                 setLoading(false);
//                 toast.dismiss(toastLoadingId);
//                 handleRequestError(error);
//             });
//     };

//     const handleDecline = () => {
//         const toastLoadingId = toast.loading("Please wait...");
//         setLoading(true);
//         const url = `https://sk-yzt3.onrender.com/api/admin/declineDeposit/${selectedItemId}`;
//         const headers = { Authorization: `Bearer ${userToken}` };
//         axios.put(url, {}, { headers })
//             .then((response) => {
//                 setLoading(false);
//                 toast.dismiss(toastLoadingId);
//                 console.log(response);
//                 getAllTransactions();
//                 toast.success(`Payment Declined`);
//             })
//             .catch((error) => {
//                 setLoading(false);
//                 toast.dismiss(toastLoadingId);
//                 handleRequestError(error);
//             });
//     };

//     return (
//         <>
//             <div className="w-full h-screen flex flex-col gap-2 overflow-y-auto">
//                 {adminTransactions?.length > 0 ? (
//                     <>
//                         <div className="w-full h-max border border-gray-200 bg-white rounded overflow-x-auto">
//                             <div className="w-max h-10 border-t border-t-gray-300 pl-6 flex gap-4">
//                                 <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
//                                     Reference
//                                 </div>
//                                 <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
//                                     Mode
//                                 </div>
//                                 <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
//                                     User
//                                 </div>
//                                 <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
//                                     Amount
//                                 </div>
//                                 <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
//                                     Status
//                                 </div>
//                                 <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
//                                     Date
//                                 </div>
//                                 <div className="w-[5rem] h-full flex items-center text-xs text-black font-medium">
//                                     Action
//                                 </div>
//                                 <div className="w-[5rem] h-full flex items-center text-xs text-black font-medium">
//                                     Proof
//                                 </div>
//                             </div>
//                             <div className="w-max h-max">
//                                 {adminTransactions.map((item: Transaction, index: number) => (
//                                     <div key={item._id} className="w-full h-12 border-t border-t-gray-300 flex pl-6">
//                                         <div className="w-[10.5rem] h-full flex items-center text-sm text-[rgb(83,104,128)] font-semibold">
//                                             {item?._id?.slice(-10).toUpperCase()}
//                                         </div>
//                                         <div className="w-[10.5rem] h-full flex items-center text-sm text-[rgb(83,104,128)] font-semibold">
//                                             {item.mode}
//                                         </div>
//                                         <div className="w-[10.5rem] h-full flex items-center text-sm text-[rgb(83,104,128)] font-semibold">
//                                             {item.firstName}
//                                         </div>
//                                         <div className="w-[10.5rem] h-full flex items-center text-sm text-[rgb(83,104,128)] font-semibold">
//                                             ${item.amount}
//                                         </div>
//                                         <div className='w-[10.5rem] h-full flex items-center text-sm text-[rgb(83,104,128)] font-semibold justify-center'>
//                                         <p
//                                                 className={`w-max h-max px-3 py-1 phone:py-1 text-white rounded-full flex items-center justify-center ${
//                                                     item?.status === "approved"
//                                                         ? "bg-green-400"
//                                                         : item?.status ===
//                                                           "pending"
//                                                         ? "bg-yellow-400"
//                                                         : item?.status ===
//                                                           "rejected"
//                                                         ? "bg-red-400"
//                                                         : ""
//                                                 }`}
//                                             >
//                                               {item.status}  
//                                             </p>
                                            
//                                         </div>
//                                         <div className="w-[10.5rem] h-full flex items-center text-sm text-[rgb(83,104,128)] font-semibold">
//                                         {new Date(item?.createdAt).toLocaleDateString()}
//                                         </div>
//                                         <div className="w-[5rem] h-full flex items-center">
//                                             <CiMenuKebab
//                                                 onClick={() => handleShow(index, item._id)}
//                                                 className="text-xl cursor-pointer"
//                                             />
//                                             {showMenu[index] && (
//                                                 <div
//                                                     ref={(el) => (menuRefs.current[index] = el)}
//                                                     className="relative w-28 p-2 bg-white shadow-lg rounded border border-gray-100 flex flex-col items-start gap-1"
//                                                 >
//                                                     <p
//                                                         onClick={() => setOpenConfirm(true)}
//                                                         className="text-xs font-bold text-[rgb(83,104,128)] hover:text-[rgb(37,99,235)] cursor-pointer"
//                                                     >
//                                                         Confirm
//                                                     </p>
//                                                     <p
//                                                         onClick={handleDecline}
//                                                         className="text-xs font-bold text-[rgb(83,104,128)] hover:text-[rgb(37,99,235)] cursor-pointer"
//                                                     >
//                                                         Decline
//                                                     </p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className="w-[5rem] h-full flex items-center">
//                                             <BsEye
//                                                 onClick={() => openProofOfPayment(item.image)}
//                                                 className="text-xl cursor-pointer"
//                                             />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="w-full h-screen flex justify-center items-center">
//                         <p className="text-lg font-semibold">No Transactions Available</p>
//                     </div>
//                 )}
//             </div>
//             <Modal
//                 title="Confirm Payment"
//                 visible={openConfirm}
//                 onOk={handleConfirm}
//                 confirmLoading={loading}
//                 onCancel={() => setOpenConfirm(false)}
//             >
//                 <p>Are you sure you want to confirm this payment?</p>
//             </Modal>
//         </>
//     );
// };

// export default AdminTransactions;
