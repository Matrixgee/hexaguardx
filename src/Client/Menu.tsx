import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/skyBig.png';
import { MdOutlineDashboard } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { MdHistory } from "react-icons/md";
import { PiSwap } from "react-icons/pi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { PiHandDepositFill } from "react-icons/pi";
import { TbPackages } from "react-icons/tb";

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

  type MenuItem = {
    name: string;
    icon: React.ElementType;
    path: string;
  };

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: MdOutlineDashboard, path: 'overview' },
    { name: 'Deposit', icon: PiHandDepositFill, path: 'deposit' },
    { name: 'Withdrawal', icon: BiMoneyWithdraw, path: 'withdraw' },
    { name: 'My-plans', icon: PiSwap, path: 'my-plans' },
    { name: 'Packages', icon: TbPackages, path: 'packages' },
    { name: 'History', icon: MdHistory, path: 'history' },
    { name: 'Support', icon: RiAccountPinCircleFill, path: 'support' }
  ];


  const handleMenuClick = (path: string, index: number) => {
    setSelectedMenu(index);
    navigate(path);
  };

  return (
    <div className="w-[100%] h-[100%] bg-[#050C1B] rounded-sm flex flex-col justify-around phone:hidden">
      <div className="w-[100%] h-[15%] flex flex-col justify-center items-center">
        <img src={Logo} alt="TwoPay Logo" className='w-[80%] h-[60%] object-contain cursor-pointer' onClick={()=>navigate('/')} />
      </div>
      <div className='w-[100%] h-[70%]'>
        <div className='w-[100%] h-[90%]  items-center flex-col  flex justify-around'>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`w-[90%] h-[10%] flex justify-center items-center cursor-pointer transition-all transform duration-300 rounded-md font-semibold hover:bg-[#03045E] ${
                selectedMenu === index ? 'bg-[#03045E] text-white' : 'text-[#cee4f3]'
              }`}
              onClick={() => handleMenuClick(item.path, index)}
            >
              <div className='w-[70%] gap-3 flex justify-start items-center'>
                <item.icon className='text-xl' />
                <div>{item.name}</div>
              </div>
            </div>
          ))}
        </div>
        <div className='w-[100%] h-[15%]'></div>
      </div>
    </div>
  );
};

export default Menu;