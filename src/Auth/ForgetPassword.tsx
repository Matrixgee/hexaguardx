import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const userToken = useSelector((state:any)=>state.user.token)
  console.log(userToken);
  

  const url = 'https://sk-smoky.vercel.app/api/user/forgotPass';
  const headers = 
  {
    Authorization: `Bearer ${userToken}`
  }

  const forgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastloading = toast.loading('Please wait....');

    try {
      const response = await axios.post(url, { email },{headers});
      toast.dismiss(toastloading);
      toast.success(response.data.message || "Password reset link sent successfully");
      setEmail('');
    } catch (error: any) {
      toast.dismiss(toastloading);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full h-[100vh] bg-[#F8F9F9] flex justify-center items-center">
      <div className="w-[30%] h-[60%] bg-white rounded-md flex justify-around items-center flex-col phone:w-[90%] phone:h-[50%]">
        <div className="w-[100%] h-[20%] flex justify-center items-center">
          <p className="font-bold text-3xl text-blue-600">Password Reset</p>
        </div>
        <div className="w-[100%] h-[50%] flex justify-around items-center">
          <form className="w-[100%] h-[100%] flex justify-center flex-col items-center" onSubmit={forgetPassword}>
            <div className="w-[90%] h-[60%] gap-2 px-1 flex justify-center items-start flex-col">
              <label className="font-bold text-blue-500">Your Email <span className="text-red-600">*</span></label>
              <input 
                type="email" 
                placeholder="" 
                className="forgetinput py-3 outline-none border-2 px-16 rounded-md" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="w-full h-[40%] flex justify-center items-center">
              <button type="submit" className="py-3 transition-all duration-300 hover:bg-blue-500 text-white font-semibold px-6 rounded-md bg-blue-700">
                Email Password Reset Link
              </button>
            </div>
          </form>
        </div>
        <div className="w-full h-[25%] flex flex-col items-center justify-around px-6">
          <p>Repeat Login? <span className="text-slate-600 font-bold cursor-pointer" onClick={() => navigate('/login')}>Login</span></p>
          <p className="text-slate-400 phone:text-sm text-center">© Copyright 2024 DefiSkySpace All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
