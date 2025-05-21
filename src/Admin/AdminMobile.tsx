import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Logo from "../assets/skyBig.png";
import { MdOutlineDashboard, MdOutlineWallet } from "react-icons/md";
import { TbPackages } from "react-icons/tb";
import { FaRegCreditCard, FaRegCircleUser, FaGear } from "react-icons/fa6";

const AdminMobile: React.FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
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
    { name: "Investment Plans", icon: TbPackages, path: "packs" },
    { name: "All User", icon: FaRegCircleUser, path: "allusers" },
    { name: "All Investment", icon: MdOutlineWallet, path: "allinvestment" },
    { name: "Support", icon: FaGear, path: "settings" },
  ];

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleMenuClick = (path: string, index: number) => {
    setSelectedMenu(index);
    navigate(path);
    onClose();
  };

  return (
    <div>
      <Button type="primary" onClick={showDrawer} icon={<MenuOutlined />} />
      <Drawer
        title={
          <img
            src={Logo}
            alt="TwoPay Logo"
            className="w-[80%] h-[80%] object-contain"
          />
        }
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <div className="w-[100%] h-[100%] flex items-center flex-col justify-around">
          {menuItems.map((item, index) => (
            <div key={index} className="w-[100%] flex flex-col">
              <div
                className={`w-[98%] mx-auto py-3 flex justify-between items-center cursor-pointer transition-all transform duration-300 rounded-md font-semibold hover:bg-[#03045E] ${
                  selectedMenu === index
                    ? "bg-[#03045E] text-white"
                    : "text-[#050C1B]"
                }`}
                onClick={() => handleMenuClick(item.path, index)}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="text-3xl text-gray-200" />
                  <div className="text-xl text-gray-200">{item.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default AdminMobile;
