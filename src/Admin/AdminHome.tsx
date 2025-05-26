import { IoDownloadOutline } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";
import {
  MdOutlinePendingActions,
  MdOutlineNoEncryptionGmailerrorred,
} from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { FaUserPen } from "react-icons/fa6";
import { TbPackages, TbBleachOff } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  // Select admin data from the Redux store
  const adminData = useSelector((state: any) => state.user.adminData);

  const Navigate = useNavigate();

  // Create dataInfo array with dynamic values
  const dataInfo = [
    {
      id: 1,
      value: "Total Deposit",
      icon: <IoDownloadOutline className="text-2xl text-orange-300" />,
      bgColor: "bg-orange-100",
      figure: `$${adminData.totalApprovedDeposit}`,
    },
    {
      id: 2,
      value: "Total Withdraw",
      icon: <BiMoneyWithdraw className="text-2xl text-red-500" />,
      bgColor: "bg-red-100",
      figure: `$${adminData.totalPendingWithdraw}`,
    },
    {
      id: 3,
      value: "Pending Deposit",
      icon: <TbBleachOff className="text-2xl text-indigo-300" />,
      bgColor: "bg-indigo-100",
      figure: `$${adminData.totalPendingDeposit}`,
    },
    {
      id: 4,
      value: "Total Users",
      icon: <PiUsersThree className="text-2xl text-green-300" />,
      bgColor: "bg-green-100",
      figure: `${adminData.totalUsers}`,
    },
    {
      id: 5,
      value: "Pending Withdraw",
      icon: <MdOutlinePendingActions className="text-2xl text-blue-300" />,
      bgColor: "bg-blue-100",
      figure: `$${adminData.totalPendingWithdraw}`,
    },
    {
      id: 6,
      value: "Active Users",
      icon: <FaUserPen className="text-2xl text-pink-300" />,
      bgColor: "bg-pink-100",
      figure: `${adminData.activeUsers}`,
    },
    {
      id: 7,
      value: "Block Users",
      icon: (
        <MdOutlineNoEncryptionGmailerrorred className="text-2xl text-[#d9321f]" />
      ),
      bgColor: "bg-red-100",
      figure: `${adminData.suspendedUsers}`,
    },
    {
      id: 8,
      value: "Investment Plans",
      icon: <TbPackages className="text-2xl text-yellow-300" />,
      bgColor: "bg-yellow-100",
      figure: `${adminData.totalInvestmentPlans}`,
    },
  ];

  return (
    <div className="w-full h-[calc(100%-6rem)] bg-slate-100 scrollbar-thin overflow-y-scroll">
      <div className="AdminWel w-full h-[25%] flex justify-between items-center">
        <div className="AdminTex w-[30%] h-full px-5 flex justify-center flex-col items-start">
          <p className="text-2xl">Dashboard</p>
          <p>Welcome, Super Admin!</p>
        </div>
        <div className="ActionBtns w-[35%] h-full flex justify-around items-center">
          <button
            className="w-32 h-[2.7rem] text-white rounded-md transition-all duration-300 hover:bg-green-500 bg-green-400"
            onClick={() => Navigate("/admin/admindeposit")}
          >
            Deposits
          </button>
          <button
            className="w-32 h-[2.7rem] text-white rounded-md transition-all duration-300 hover:bg-red-500 bg-red-400"
            onClick={() => Navigate("/admin/adminwithdraw")}
          >
            Withdrawal
          </button>
          <button
            className="w-32 h-[2.7rem] text-white rounded-md transition-all duration-300 hover:bg-blue-500 bg-blue-400"
            onClick={() => Navigate("/admin/allusers")}
          >
            Users
          </button>
        </div>
      </div>
      <div className="AdminOverview w-full h-[13rem] flex flex-wrap justify-around items-center">
        {dataInfo.map((data) => (
          <div
            key={data.id}
            className="w-[23%] h-[42%] bg-white rounded-md flex justify-center items-center m-2 max-md:w-[100%] max-md:h-[13%]"
          >
            <div
              className={`w-[50px] h-[50px] ${data.bgColor} rounded-full flex justify-center items-center`}
            >
              {data.icon}
            </div>
            <div className="insideCard w-[60%] h-full flex gap-2 justify-center flex-col items-center max-md:w-[80%]">
              <p className="text-lg">{data.value}</p>
              <p>{data.figure}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
