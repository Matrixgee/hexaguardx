import TradingViewOne from "../Components/TradingViewOne";
import TradingViewTwo from "../Components/TradingViewTwo";
import { RiMoneyDollarCircleLine, RiShuffleLine } from "react-icons/ri";
import { PiHandDepositFill } from "react-icons/pi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiMoneyStack, GiPayMoney } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import { GoGift } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { setOneUser } from "../Function/Slice";

const Overview = () => {
  const user = useSelector((state: any) => state.user.oneUser);

  const UserToken = useSelector((state: any) => state.user.token);

  const id = localStorage.getItem("id");

  const dispatch = useDispatch();

  // console.log(id);
  const GetUser = async () => {
    try {
      const response = await axios.get(
        `https://sk-smoky.vercel.app/api/user/userprofile/${id}`,
        {
          headers: { Authorization: `Bearer ${UserToken}` },
        }
      );
      dispatch(setOneUser(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  const CardContent = [
    {
      id: 1,
      Amount: `$ ${user.accountBalance}`,
      Title: "Account Balance",
      bg: "bg-green-500",
      icon: <MdAttachMoney />,
    },
    {
      id: 2,
      Amount: `$ ${user.totalProfit}`,
      Title: "Total Profit",
      bg: "bg-purple-500",
      icon: <GiMoneyStack />,
    },
    {
      id: 3,
      Amount: `$ ${user.totalBonus}`,
      Title: "Total Bonus",
      bg: "bg-indigo-400",
      icon: <GoGift />,
    },
    {
      id: 4,
      Amount: `$${user.referralBonus}`,
      Title: "Referral Bonus",
      bg: "bg-yellow-500",
      icon: <RiShuffleLine />,
    },
    {
      id: 5,
      Amount: `${user.investmentPlan}`,
      Title: "Investment Plan",
      bg: "bg-red-500",
      icon: <GiPayMoney />,
    },
    {
      id: 6,
      Amount: `${user.activePlan}`,
      Title: "Active Plan",
      bg: "bg-pink-500",
      icon: <RiMoneyDollarCircleLine />,
    },
    {
      id: 7,
      Amount: `$ ${user.totalDeposit}`,
      Title: "Total Deposit",
      bg: "bg-blue-500",
      icon: <PiHandDepositFill />,
    },
    {
      id: 8,
      Amount: `$${user.totalWithdrawn}`,
      Title: "Withdrawals",
      bg: "bg-slate-500",
      icon: <BiMoneyWithdraw />,
    },
  ];

  return (
    <div className="w-[100%] h-[100%] bg-[#101829] scrollbar-thin overflow-y-scroll">
      <div className="welcome w-[100%] h-[12%] flex justify-start px-7 items-center">
        <p className="text-xl font-medium phone:text-2xl text-slate-300">
          Welcome, {user?.firstName} {user?.lastName} !
        </p>
      </div>
      <div className="CardHolder w-[100%] h-[45%] flex justify-around flex-wrap items-center">
        {CardContent.map((item) => (
          <div
            className="card w-[21%] h-[35%] bg-white rounded-md flex justify-center items-center flex-col"
            key={item.id}
          >
            <div className="w-[90%] h-[70%] flex justify-center items-center">
              <div
                className={`iconhold w-12 text-gray-200 h-12 text-xl ${item.bg} rounded-md flex justify-center items-center`}
              >
                {item.icon}
              </div>
              <div className="w-[70%] h-16">
                <div className="w-[100%] h-[60%] flex justify-start px-4 items-center">
                  <p>{item.Amount}</p>
                </div>
                <div className="cardText w-[100%] h-[40%] flex justify-center items-center">
                  <p>{item.Title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[100%] h-[55rem] flex justify-around flex-col items-center">
        <div className="w-[100%] h-[10%] flex justify-start items-center px-5">
          <p className="text-xl text-gray-400 font-semibold">
            Personal Trading Chart
          </p>
        </div>
        <div className="w-[97%] h-[90%] flex justify-center items-center">
          <TradingViewOne />
        </div>
        <div className="w-[100%] h-[10%] flex justify-start items-center px-5">
          <p className="text-xl text-gray-400 font-semibold">Market Cap</p>
        </div>
        <div className="w-[97%] h-[90%] flex justify-center items-center">
          <TradingViewTwo />
        </div>
      </div>
    </div>
  );
};

export default Overview;
