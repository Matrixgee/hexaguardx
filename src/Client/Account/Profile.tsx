import {Modal} from "antd";
import {useState} from "react";
import {FaAngleRight} from "react-icons/fa";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state:any)=>state.user.user)

    const [edit, setEdit] = useState<boolean>(false);
    const [change, setChange] = useState<boolean>(false);

    const toggleEdit = () => {
        setEdit(!edit);
    };

    return (
        <>
            <div className="w-full h-[80vh]   flex flex-col">
                <p className="text-xl text-[#d0d0d0] font-semibold phone:text-lg ">
                    Personal Information
                </p>
                <p className="text-sm text-[#cbcbcb] font-medium phone:text-xs">
                    Basic info, like your name and address, that you use here.
                </p>
                <div className="w-full h-[100px] mt-5 ">
                    <div
                        onClick={toggleEdit}
                        className="w-full h-20 border-b border-b-gray-300 flex justify-between items-center cursor-pointer px-4"
                    >
                        <div className="w-1/2 h-[10%] flex items-center justify-between phone:flex-col phone:items-start phone:justify-center phone:gap-2">
                            <p className="text-[#aeaeae] text-sm">
                                Full Name
                            </p>
                            <p className="text-[whitesmoke] text-base phone:text-sm">
                                {user.firstName} {user.lastName}
                            </p>
                        </div>
                        <span className="w-max h-max rounded-full bg-gray-300 text-gray-400 p-2 flex items-center justify-center">
                            <FaAngleRight className="w-3 h-3" />
                        </span>
                    </div>
                    <div
                        onClick={toggleEdit}
                        className="w-full h-20 border-b border-b-gray-300 flex justify-between items-center cursor-pointer px-4"
                    >
                        <div className="w-1/2 h-full flex items-center justify-between phone:flex-col phone:items-start phone:justify-center phone:gap-2">
                            <p className="text-[#aeaeae] text-sm">
                                Email
                            </p>
                            <p className="text-[whitesmoke] text-base phone:text-sm">
                                {user.email}
                            </p>
                        </div>
                        <span className="w-max h-max rounded-full bg-gray-300 text-gray-400 p-2 flex items-center justify-center">
                            <FaAngleRight className="w-3 h-3" />
                        </span>
                    </div>
                    <div
                        onClick={toggleEdit}
                        className="w-full h-20 border-b border-b-gray-300 flex justify-between items-center cursor-pointer px-4"
                    >
                        <div className="w-1/2 h-full flex items-center justify-between phone:flex-col phone:items-start phone:justify-center phone:gap-2">
                            <p className="text-[#aeaeae] text-sm">
                                Phone Number
                            </p>
                            <p className="text-[whitesmoke] text-base phone:text-sm">
                                {user.phoneNumber}
                            </p>
                        </div>
                        <span className="w-max h-max rounded-full bg-gray-300 text-gray-400 p-2 flex items-center justify-center">
                            <FaAngleRight className="w-3 h-3" />
                        </span>
                    </div>
                    <div
                        onClick={toggleEdit}
                        className="w-full h-20 border-b border-b-gray-300 flex justify-between items-center cursor-pointer px-4"
                    >
                        <div className="w-1/2 h-full flex items-center justify-between phone:flex-col phone:items-start phone:justify-center phone:gap-2">
                            <p className="text-[#aeaeae] text-sm">
                                Date of birth
                            </p>
                            <p className="text-[whitesmoke] text-base phone:text-sm">
                                {/* {oneUserData.dateOfBirth} */}
                            </p>
                        </div>
                        <span className="w-max h-max rounded-full bg-gray-300 text-gray-400 p-2 flex items-center justify-center">
                            <FaAngleRight className="w-3 h-3" />
                        </span>
                    </div>
                    <div
                        onClick={toggleEdit}
                        className="w-full h-20 flex justify-between items-center cursor-pointer px-4"
                    >
                        <div className="w-1/2 h-full flex items-center justify-between phone:flex-col phone:items-start phone:justify-center phone:gap-2">
                            <p className="text-[#aeaeae] text-sm">
                                Address
                            </p>
                            <p className="text-[whitesmoke] text-base phone:text-sm">
                                {/* {`${oneUserData?.address} ${oneUserData?.country} ${oneUserData?.postalCode}`} */}
                            </p>
                        </div>
                        <span className="w-max h-max rounded-full bg-gray-300 text-gray-400 p-2 flex items-center justify-center">
                            <FaAngleRight className="w-3 h-3" />
                        </span>
                    </div>
                </div>
            </div>
            <Modal
                open={edit}
                onCancel={toggleEdit}
                cancelButtonProps={{hidden: true}}
                okButtonProps={{
                    hidden: true,
                }}
                closeIcon={true}
                width={750}
            >
                <div className="w-full h-max px-12 phone:px-0 py-5 flex flex-col items-center gap-5">
                    <p className="text-[rgb(54,74,79)] text-lg font-semibold phone:text-xl w-full">
                        Update Profile
                    </p>
                    <div className="w-full h-max">
                        <div className="w-full h-12 flex items-center gap-4 border-b border-b-gray-300">
                            <div
                                className={`w-max h-full flex items-center ${
                                    change
                                        ? ""
                                        : "border-b-2 border-b-[#0238ac]"
                                }  cursor-pointer`}
                                onClick={() => setChange(false)}
                            >
                                Personal
                            </div>
                            <div
                                className={`w-max h-full flex items-center ${
                                    change
                                        ? "border-b-2 border-b-[#0238ac]"
                                        : ""
                                }  cursor-pointer`}
                                onClick={() => setChange(true)}
                            >
                                Address
                            </div>
                        </div>
                        {change ? (
                            <>
                                <div className="w-full h-max flex mt-8 flex-col gap-4">
                                    <div className="w-full h-max flex flex-col gap-2">
                                        <p className="font-medium text-[rgb(52,67,87)]">
                                            Address
                                        </p>
                                        <input
                                            type="text"
                                            className="w-full h-11 border border-gray-300 rounded pl-4"
                                        />
                                    </div>
                                    <div className="w-full h-max flex justify-between gap-8">
                                        <div className="w-1/2 h-max flex flex-col gap-2">
                                            <p className="font-medium text-[rgb(52,67,87)]">
                                                Postal
                                            </p>
                                            <input
                                                type="text"
                                                className="w-full h-11 border border-gray-300 rounded pl-4"
                                            />
                                        </div>
                                        <div className="w-1/2 h-max flex flex-col gap-2">
                                            <p className="font-medium text-[rgb(52,67,87)]">
                                                Country
                                            </p>
                                            <input
                                                type="text"
                                                className="w-full h-11 border border-gray-300 rounded pl-4"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-full h-max mt-8 flex flex-col gap-4">
                                    <div className="w-full h-max flex justify-between gap-8">
                                        <div className="w-1/2 h-max flex flex-col gap-2">
                                            <p className="font-medium text-[rgb(52,67,87)]">
                                                Username
                                            </p>
                                            <input
                                                type="text"
                                                className="w-full h-11 border border-gray-300 rounded pl-4"
                                                
                                            />
                                        </div>
                                        <div className="w-1/2 h-max flex flex-col gap-2">
                                            <p className="font-medium text-[rgb(52,67,87)]">
                                                Fullname
                                            </p>
                                            <input
                                                type="text"
                                                className="w-full h-11 border border-gray-300 rounded pl-4"
                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full h-max flex justify-between gap-8">
                                        <div className="w-1/2 h-max flex flex-col gap-2">
                                            <p className="font-medium text-[rgb(52,67,87)]">
                                                Email
                                            </p>
                                            <input
                                                type="text"
                                                className="w-full h-11 border border-gray-300 rounded pl-4"
                                                
                                            />
                                        </div>
                                        <div className="w-1/2 h-max flex flex-col gap-2">
                                            <p className="font-medium text-[rgb(52,67,87)]">
                                                Phone No
                                            </p>
                                            <input
                                                type="text"
                                                className="w-full h-11 border border-gray-300 rounded pl-4"
                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full h-max flex justify-between gap-8">
                                        <div className="w-1/2 h-max flex flex-col gap-2">
                                            <p className="font-medium text-[rgb(52,67,87)]">
                                                Date of Birth
                                            </p>
                                            <input
                                                type="text"
                                                className="w-full h-11 border border-gray-300 rounded pl-4"
                                                placeholder="DD/MM/YYYY"
                                                
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <button
                        className="w-max h-max px-5 py-2 bg-[#0238ac] text-white rounded text-sm font-semibold"
                    >
                        UPDATE
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Profile;