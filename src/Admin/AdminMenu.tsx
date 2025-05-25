import React from "react";
import logo from "../assets/newlog.png";
import {
  MdOutlineClear,
  MdOutlineDashboard,
  MdOutlineWallet,
} from "react-icons/md";

import { TbPackages } from "react-icons/tb";

import { useNavigate } from "react-router-dom";
import { FaRegCreditCard } from "react-icons/fa";
import { FaGear, FaRegCircleUser } from "react-icons/fa6";
import { KeySquare } from "lucide-react";

interface MenuItem {
  name: string;
  icon: React.ReactElement;
  path: string;
}

interface SidebarProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, setActive }) => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = React.useState<number | null>(null);

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: <MdOutlineDashboard />, path: "adminhome" },
    {
      name: "All Transactions",
      icon: <FaRegCreditCard />,
      path: "admindeposit",
    },
    {
      name: "All Withdrawal",
      icon: <FaRegCreditCard />,
      path: "adminwithdraw",
    },
    { name: "Plans", icon: <TbPackages />, path: "packs" },
    { name: "All Users", icon: <FaRegCircleUser />, path: "allusers" },
    {
      name: "All Investment",
      icon: <MdOutlineWallet />,
      path: "allinvestment",
    },
    {
      name: "All Kyc",
      icon: <KeySquare />,
      path: "allkyc",
    },
    { name: "Settings", icon: <FaGear />, path: "settings" },
  ];

  const handleMenuClick = (path: string, index: number) => {
    setSelectedMenu(index);
    navigate(path);
    setActive(false);
  };

  return (
    <aside className={`sidebar z-30 ${active ? "active" : ""}`}>
      <div className="close_icon" onClick={() => setActive(!active)}>
        <MdOutlineClear />
      </div>
      <div className="sidebar_inner">
        <div className="logo">
          <img src={logo} alt="FinTrading Logo" />
          <span className="text-slate-200">HexaGuard</span>
        </div>
        <div className="sidebar_items w-[90%]">
          <ul className="sidebar_items_inner text-slate-400">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={selectedMenu === index ? "active" : ""}
                onClick={() => handleMenuClick(item.path, index)}
              >
                <span className="menu_icon">{item.icon}</span>
                <a href="#">{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
