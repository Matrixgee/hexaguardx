import { Outlet } from "react-router-dom";
// import DasHeader from "./DasHeader"
import Menu from "./Menu";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen bg-red-500 flex ">
      <div className="w-[18%] h-full bg-green-500 phone:hidden">
        <Menu />
      </div>
      <div className="w-full h-full bg-[#101829] flex flex-col">
        {/* <DasHeader/> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
