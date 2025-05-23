import { Outlet } from "react-router-dom";

// import Menu from "./Menu"
import Sidebar from "../Components/sidebar";
import { useState } from "react";
import UserHeader from "../Components/dasheader";

const Dashboard = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="h-screen w-screen max-w-[100vw] max-h-[100vh] overflow-hidden flex">
      <Sidebar active={active} setActive={setActive} />
      <div className=" w-full h-full bg-[#101829]">
        <UserHeader active={active} setActive={setActive} />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
