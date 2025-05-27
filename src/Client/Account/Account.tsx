import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

const Account = () => {
  return (
    <>
      <div className="w-full h-[83vh] ">
        <div className="w-[100%] h-[full] flex flex-col pl-5 pr-5 phone:px-4 py-8 gap-3">
          <p className="text-base text-[whitesmoke] phone:text-sm">
            My Account
          </p>
          <p className="text-4xl text-[whitesmoke] phone:text-xl">
            Account Settings
          </p>
          <p className="text-sm text-[whitesmoke] phone:text-xs">
            You have full control to manage your own account setting.{" "}
          </p>
          <div className="w-full h-[10%] mt-8 phone:h-[5%]">
            <div className="w-full h-[100%]   flex gap-5 text-sm font-semibold ">
              <NavLink
                to={"profile"}
                className={({ isActive }) =>
                  !isActive
                    ? "transition-all w-16  hover:text-[#0238ac] text-[#fff] "
                    : "transition-all w-16 border-b-[#0238ac] border-b-2 text-[#0238ac] "
                }
              >
                <div className="w-24 h-[100%] cursor-pointer phone:text-sm ">
                  Personal
                </div>
              </NavLink>
              <NavLink
                to={"security"}
                className={({ isActive }) =>
                  !isActive
                    ? "transition-all hover:text-[#0238ac] text-[#fff]"
                    : "transition-all w-16 border-b-[#0238ac] border-b-2 text-[#0238ac] "
                }
              >
                <div className="w-24 h-full cursor-pointer phone:text-sm ">
                  Security
                </div>
              </NavLink>
            </div>
          </div>
          <div className="w-full  border-[#0238ac] border rounded-md overflow-auto h-[320px] pl-3 pr-3 pt-3 phone:h-[400px]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
