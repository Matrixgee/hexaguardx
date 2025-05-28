import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

const Account = () => {
  return (
    <>
      <div className="w-full h-[83vh] px-5 py-8 phone:px-4">
        <div className="flex flex-col gap-3">
          <p className="text-base text-[whitesmoke] phone:text-sm">
            My Account
          </p>
          <p className="text-4xl text-[whitesmoke] phone:text-xl">
            Account Settings
          </p>
          <p className="text-sm text-[whitesmoke] phone:text-xs">
            You have full control to manage your own account setting.
          </p>
        </div>

        <div className="mt-8">
          <div className="flex gap-5 text-sm font-semibold border-b border-[#2e2e2e]">
            {["profile", "security"].map((tab) => (
              <NavLink
                key={tab}
                to={tab}
                className={({ isActive }) =>
                  isActive
                    ? "pb-2 border-b-2 border-[#0238ac] text-[#0238ac]"
                    : "text-[#bfbfbf] hover:text-[#0238ac] transition-all"
                }
              >
                <div className="w-24 text-center cursor-pointer capitalize">
                  {tab}
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-5 w-full h-[320px] phone:h-[400px] bg-[#0e0e0e]/30 border border-[#0238ac50] rounded-xl backdrop-blur-md overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Account;
