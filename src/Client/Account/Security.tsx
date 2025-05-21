import {Modal} from "antd";
import {useState} from "react";

const Security = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

    const handleToggleModal = () => {
        setModal(!modal);
    };

    

    return (
        <>
            <div className="w-full h-max pt-5 flex flex-col gap-2">
                <p className="text-xl text-[rgb(54,74,99)] font-semibold">
                    Security Settings
                </p>
                <p className="text-sm text-[rgb(82,100,132)] font-medium">
                    These settings are helps you keep your account secure.
                </p>
                <div className="w-full h-max border mt-5 border-gray-300 rounded bg-white">
                    <div className="w-full h-20 flex items-center justify-between px-5 phone:flex-col phone:h-max phone:py-2 phone:gap-4 phone:px-2 phone:items-start">
                        <p className="text-base text-[rgb(54,74,99)] font-semibold flex flex-col ">
                            Change Password
                            <span className="text-[rgb(82,100,132)] text-sm font-normal">
                                Set a unique password to protect your account.
                            </span>
                        </p>
                        <button
                            className="w-max h-max px-5 py-2 bg-[#023e8a] text-white rounded text-sm font-semibold"
                            onClick={handleToggleModal}
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                open={modal}
                onCancel={handleToggleModal}
                cancelButtonProps={{hidden: true}}
                okButtonProps={{
                    hidden: true,
                }}
                closeIcon={true}
            >
                <div className="w-full h-max px-12 phone:px-0 py-5 flex flex-col items-center gap-5">
                    <p className="text-[rgb(54,74,79)] text-2xl font-semibold phone:text-xl">
                        CHANGE YOUR PASSWORD
                    </p>
                    <div className="w-full h-max flex flex-col gap-2">
                        <p className="text-[rgb(52,67,87)] font-medium">
                            Old Password
                        </p>
                        <input
                            type="password"
                            className="w-full h-10 rounded border border-gray-300 outline-1 outline-red-100 pl-4"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className="w-full h-max flex flex-col gap-2">
                        <p className="text-[rgb(52,67,87)] font-medium">
                            New Password
                        </p>
                        <input
                            type="password"
                            className="w-full h-10 rounded border border-gray-300 outline-1 outline-red-100 pl-4"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="w-full h-max flex flex-col gap-2">
                        <p className="text-[rgb(52,67,87)] font-medium">
                            Confirm New Password
                        </p>
                        <input
                            type="password"
                            className="w-full h-10 rounded border border-gray-300 outline-1 outline-red-100 pl-4"
                            value={confirmNewPassword}
                            onChange={(e) =>
                                setConfirmNewPassword(e.target.value)
                            }
                        />
                    </div>
                    <button
                        className="w-max h-max px-5 py-2 bg-[#023e8a] text-white rounded text-sm font-semibold"
                    >
                        UPDATE PASSWORD
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Security;