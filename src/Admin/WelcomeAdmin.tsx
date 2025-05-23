import { useDispatch, useSelector } from "react-redux";
import { GiStarsStack } from "react-icons/gi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAdminData } from "../Function/Slice";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

const WelcomeAdmin = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Admin = useSelector((state: any) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);

  const url = "https://hexg.onrender.com/api/admin/AdminDashboard";

  const HandlegetDashboard = async () => {
    setloading(true);
    try {
      const response = await axios.get(url);
      dispatch(setAdminData(response.data));
      navigate("/admin/adminhome");
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex justify-center items-center">
      <div className="w-[40%] h-[50%] bg-white rounded-lg flex justify-around gap-6 flex-col items-center phone:w-[90%]">
        <div className="w-[100%] h-[30%] flex justify-center items-center">
          <p className="text-3xl font-semibold">Welcome {Admin.firstName}</p>
        </div>
        <div className="w-[100%] h-[25%] flex justify-center gap-2 items-center">
          <p className="text-lg text-gray-400">You are Logged in as Admin</p>
          <div className="w-[40px] h-[40px] bg-yellow-200 rounded-lg flex justify-center items-center">
            <GiStarsStack className="text-yellow-500" />
          </div>
        </div>
        <div className="w-[100%] h-[30%] flex justify-center items-center">
          {loading ? (
            <Oval color="#3B82F6" height={50} width={50} />
          ) : (
            <button
              className="w-[70%] h-[60%] rounded-md text-white font-semibold bg-blue-400"
              onClick={HandlegetDashboard}
            >
              Continue To Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeAdmin;
