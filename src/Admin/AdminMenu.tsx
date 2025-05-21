import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/skyBig.png";
import { MdOutlineDashboard, MdOutlineWallet } from "react-icons/md";

import { TbPackages } from "react-icons/tb";
import { FaRegCircleUser, FaRegCreditCard, FaGear } from "react-icons/fa6";

const AdminMenu: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

  type MenuItem = {
    name: string;
    icon: React.ElementType;
    path: string;
  };

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: MdOutlineDashboard, path: "adminhome" },
    { name: "All Transactions", icon: FaRegCreditCard, path: "admindeposit" },
    { name: "All Withdrawal", icon: FaRegCreditCard, path: "adminwithdraw" },
    { name: "Plans", icon: TbPackages, path: "packs" },
    { name: "All Users", icon: FaRegCircleUser, path: "allusers" },
    { name: "All Investment", icon: MdOutlineWallet, path: "allinvestment" },
    { name: "Settings", icon: FaGear, path: "settings" },
  ];

  const handleMenuClick = (path: string, index: number) => {
    setSelectedMenu(index);
    navigate(path);
  };

  const renderMenuItem = (item: MenuItem, index: number) => (
    <div
      key={index}
      className={`w-[98%] h-[10%] flex justify-center items-center cursor-pointer transition-all transform duration-300 rounded-md font-semibold hover:bg-[#03045E] ${
        selectedMenu === index ? "bg-[#03045E] text-white" : "text-[#cee4f3]"
      }`}
      onClick={() => handleMenuClick(item.path, index)}
    >
      <div className="w-[70%] gap-3 flex justify-start items-center">
        <item.icon className="text-xl" />
        <div>{item.name}</div>
      </div>
    </div>
  );

  return (
    <div className="w-[100%] h-[100%] bg-[#050C1B] rounded-sm flex flex-col justify-around phone:hidden">
      <div className="w-[100%] h-[15%] flex flex-col justify-center items-center">
        <img
          src={Logo}
          alt=""
          className="w-[80%] h-[60%] object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="w-[100%] h-[70%] ">
        <div className="w-[100%] h-[90%] items-center flex-col flex justify-around">
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </div>
        <div className="w-[100%] h-[15%]"></div>
      </div>
    </div>
  );
};

export default AdminMenu;
