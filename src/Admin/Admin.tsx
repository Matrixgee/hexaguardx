import { Outlet } from "react-router-dom";

import Sidebar from "./AdminMenu";
import { useState } from "react";
import UserHeader from "./AdminHeader";

const Admin = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="w-full h-screen flex">
        {/* Sidebar only visible on md and above */}
        <div className="hidden md:block w-[20%] bg-green-500 h-full">
          <Sidebar setActive={setActive} active={active} />
        </div>

        {/* Main Content (takes full width on mobile, 80% on desktop) */}
        <div className="w-full md:w-[80%] h-full bg-slate-100 flex flex-col">
          <UserHeader setActive={setActive} active={active} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
