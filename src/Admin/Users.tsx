// import { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { CiMenuKebab } from 'react-icons/ci';
// import axios from 'axios';
// import { setAllUsers } from '../Function/Slice';
// import toast from 'react-hot-toast';
// import { Modal, Spin } from 'antd';

// const Users = () => {
//     const users = useSelector((state: any) => state.user.allAdminUsers || []); // Ensure users is initialized as an empty array
//     const userToken = useSelector((state: any) => state.user.token);

//     const [loading, setLoading] = useState<boolean>(false);
//     const [DeleteLoading, setDeleteLoading] = useState(false)
//     const [modalVisible, setModalVisible] = useState<boolean>(false);
//     const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
//     const [creditLoading, setCreditLoading] = useState<boolean>(false);
//     const [openModal, setOpenModal] = useState<boolean>(false);
//     const [type, setType] = useState<string>('');
//     const [amount, setAmount] = useState<number | undefined>(undefined);
//     const [selectedUserId, setSelectedUserId] = useState<string>('');
//     const dispatch = useDispatch();
//     const [menuIndex, setMenuIndex] = useState<number | null>(null);

//     const handleShowMenu = (index: number) => {
//         setMenuIndex(index);
//     };

//     const handleRequestError = (error: any) => {
//         const errorMsg = error.response ? error.response.data.message : 'An error occurred.';
//         toast.error(errorMsg);
//     };

//     const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (menuIndex !== null && menuRefs.current[menuIndex] && !menuRefs.current[menuIndex]?.contains(event.target as Node)) {
//                 setMenuIndex(null);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [menuIndex]);

//     const getAllUsers = async () => {
//         if (!userToken) return;

//         const url = 'https://hexg.onrender.com/api/admin/getAllUser';
//         const headers = {
//             Authorization: `Bearer ${userToken}`,
//         };
//         try {
//             setLoading(true);
//             const response = await axios.get(url, { headers });
//             dispatch(setAllUsers(response.data.data));
//         } catch (error) {
//             handleRequestError(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         getAllUsers();
//     }, [userToken]);

//     const handleVerifyUser = async (_id: string) => {
//         if (!userToken) return;

//         const toastLoadingId = toast.loading('Please wait...');
//         try {
//             setLoading(true);
//             const url = `https://hexg.onrender.com/api/admin/verifyUser/${_id}`;
//             const headers = {
//                 Authorization: `Bearer ${userToken}`,
//             };
//             const data = {};
//             const response = await axios.put(url, data, { headers });
//             dispatch(setAllUsers(response.data.data));
//             toast.success(response.data.message);
//             setModalVisible(true);
//         } catch (error) {
//             handleRequestError(error);
//         } finally {
//             setLoading(false);
//             toast.dismiss(toastLoadingId);
//         }
//     };

//     const handleDeleteUser = async (_id: string) => {
//         if (!userToken) return;

//         const toastLoadingId = toast.loading('Please wait...');
//         try {
//             setDeleteLoading(true);
//             const url = `https://hexg.onrender.com/api/admin/deleteOneUser/${_id}`;
//             const headers = {
//                 Authorization: `Bearer ${userToken}`,
//             };
//             const response = await axios.delete(url, { headers });
//             toast.success(response.data.message);
//             setDeleteModalVisible(true);
//             getAllUsers();
//         } catch (error) {
//             handleRequestError(error);
//         } finally {
//             setDeleteLoading(false);
//             toast.dismiss(toastLoadingId);
//         }
//     };

//     const handleCreditDebitUser = async (_id: string) => {
//         if (!amount || !type || (type !== 'credit' && type !== 'debit')) {
//             alert('All fields must be required');
//             return;
//         }

//         const toastLoadingId = toast.loading('Please wait...');
//         setCreditLoading(true);
//         try {
//             const url = `https://exp-pro.onrender.com/api/admin/creditOrDebit/${_id}`;
//             const token = userToken; // Assuming userToken is defined
//             const headers = {
//                 Authorization: `Bearer ${token}`,
//             };
//             const data = {
//                 type,
//                 amount,
//             };
//             const response = await axios.put(url, data, { headers });
//             dispatch(setAllUsers(response.data.data));
//             toast.success(response.data.message);
//         } catch (error) {
//             handleRequestError(error);
//         } finally {
//             setCreditLoading(false);
//             toast.dismiss(toastLoadingId);
//         }
//     };

//     const handleOpenCreditDebitModal = (userId: string) => {
//         setSelectedUserId(userId);
//         setOpenModal(true);
//     };

//     const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setAmount(Number(e.target.value));
//     };

//     const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setType(e.target.value);
//     };

//     const handleModalClose = () => {
//         setModalVisible(false);
//         setDeleteModalVisible(false);
//         setOpenModal(false);
//     };

//     return (
//         <>
//             <div className="w-full h-screen flex flex-col gap-2 overflow-y-auto">
//                 <div className="w-max h-10 flex items-center gap-4 justify-between bg-gray-300">
//                     <p className="w-32 h-full flex justify-center items-center">Name</p>
//                     <p className="w-32 h-full flex justify-center items-center">UserName</p>
//                     <p className="w-32 h-full flex justify-center items-center">Account balance</p>
//                     <p className="w-32 h-full flex justify-center items-center">Verify</p>
//                     <p className="w-32 h-full flex justify-center items-center">Date Registered</p>
//                     <p className="w-32 h-full flex justify-center items-center">Action</p>
//                 </div>
//                 <div className="w-max h-max flex flex-col gap-2">
//                     {users.length > 0 && users.map((user: any, index: number) => (
//                         <div
//                             className="w-max h-16 flex items-center gap-4 justify-between bg-sky-100 shadow"
//                             key={index}
//                             ref={(el) => (menuRefs.current[index] = el)}
//                         >
//                             <p className="w-32 h-full flex justify-center items-center text-sm">
//                                 {user.firstName}
//                             </p>
//                             <p className="w-32 h-full flex justify-center items-center text-sm">
//                                 {user.userName}
//                             </p>
//                             <p className="w-32 h-full flex justify-center items-center text-sm">
//                                 {user.accountBalance}
//                             </p>
//                             <p className="w-32 h-full flex justify-center items-center text-sm">
//                                 {`${user.isVerified}`}
//                             </p>
//                             <p className="w-32 h-full flex justify-center items-center text-sm">
//                                 {new Date(user?.createdAt).toLocaleDateString()}
//                             </p>
//                             <p className="w-32 h-full flex justify-center items-center text-sm relative">
//                                 <CiMenuKebab
//                                     className="w-6 h-6 cursor-pointer"
//                                     onClick={() => handleShowMenu(index)}
//                                 />
//                                 {menuIndex === index && (
//                                     <div className="absolute top-12 right-[10px] z-10 w-32 h-max flex flex-col bg-orange-100 gap-2 p-2">
//                                         <div
//                                             className="w-full h-8 flex items-center justify-center bg-white cursor-pointer"
//                                             onClick={() => handleOpenCreditDebitModal(user._id)}
//                                         >
//                                             Credit/Debit
//                                             {creditLoading && <Spin />}
//                                         </div>
//                                         <div
//                                             className="w-full h-8 flex items-center justify-center bg-white cursor-pointer"
//                                             // Implement suspend user action here
//                                         >
//                                             Suspend User
//                                         </div>
//                                         <div
//                                             className="w-full h-8 flex items-center justify-center bg-white cursor-pointer"
//                                             onClick={() => handleVerifyUser(user._id)}
//                                         >
//                                             Verify User
//                                             {loading && <Spin />}
//                                         </div>
//                                         <div
//                                             className="w-full h-8 flex items-center justify-center bg-white cursor-pointer"
//                                             onClick={() => handleDeleteUser(user._id)}
//                                         >
//                                             Delete User
//                                             {DeleteLoading && <Spin />}
//                                         </div>
//                                     </div>
//                                 )}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//                 <Modal
//                     title="User Verify Successful"
//                     visible={modalVisible}
//                     onOk={handleModalClose}
//                     onCancel={handleModalClose}
//                 >
//                     User verification was successful!
//                 </Modal>

//                 <Modal
//                     title="User Delete Successful"
//                     visible={deleteModalVisible}
//                     onOk={handleModalClose}
//                     onCancel={handleModalClose}
//                 >
//                     User deletion was successful!
//                 </Modal>
//                 <Modal
//                     title="Credit/Debit User"
//                     visible={openModal}
//                     onOk={() => handleCreditDebitUser(selectedUserId)}
//                     onCancel={handleModalClose}
//                 >
//                     <div className="w-full h-max flex flex-col items-center gap-5">
//                         <div className="w-full h-max text-lg flex flex-col gap-2">
//                             <input
//                                 type="number"
//                                 placeholder="Enter amount"
//                                 value={amount === undefined ? '' : amount.toString()}
//                                 onChange={handleAmountChange}
//                                 className="w-full p-2 border border-gray-300 rounded"
//                             />
//                             <select
//                                 value={type}
//                                 onChange={handleModeChange}
//                                 className="w-full p-2 border border-gray-300 rounded"
//                             >
//                                 <option value="">Select mode</option>
//                                 <option value="credit">Credit</option>
//                                 <option value="debit">Debit</option>
//                             </select>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>
//         </>
//     );
// };

// export default Users;
