import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const InvestmentPlan = () => {
  const navigate = useNavigate();

  type MenuItem = {
    plan: string;
    daily: string;
    investment: string;
  };

  const investPlan: MenuItem[] = [
    { plan: 'Starter Plan', daily: '10% ROI', investment: '$1000 - $5000' },
    { plan: 'Basic Plan', daily: '20% ROI', investment: '$5000 - 15000' },
    { plan: 'Silver Plan', daily: '30% ROI', investment: '$15000 - $20000' },
    { plan: 'Platinum Plan', daily: '40% ROI', investment: '$20000 - $500000' },
    { plan: 'Master Plan', daily: '50% ROI', investment: '$50000 - $150000' },
    { plan: 'Ultimate Plan', daily: '60% ROI', investment: '$150000' },
  ];

  const handleInvestNow = () => {
    navigate('/login');
  };

  return (
    <div className="  w-[100%] h-[57rem] flex justify-around items-center flex-col phone:h-auto">
      <div className="w-[100%] h-[20%] phone:h-[8rem] flex justify-around items-center flex-col  phone:w-[90%]">
        <motion.div
          className="w-[20%] phone:w-[80%] phone:h-[50%] h-[30%] text-white font-bold text-xl justify-center items-center flex rounded-lg bg-yellow-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          OUR INVESTMENT PLAN
        </motion.div>
        <motion.p
          className="font-extrabold text-blue-500 text-5xl text-center phone:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          The plans we offer are specifically made for you.
        </motion.p>
      </div>
      <div className="  w-[96%] h-[85%]  flex justify-around flex-wrap items-center">
        {investPlan.map((plan, index) => (
          <motion.div
            key={index}
            className=" CardInvest w-[26%] m-2 h-[48%] rounded-[10px] bg-gray-900 transition-all ease-in-out border-blue-400 border-solid border-[3px] justify-around flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-[100%] h-[24%] flex justify-center items-center flex-col">
              <p className="text-white font-semibold text-[4vh] phone:text-[3.2vh]">{plan.plan}</p>
              <p className="text-orange-400 text-[3vh] phone:text-[2.5vh]">{plan.daily}</p>
            </div>
            <div className="w-[90%] h-[50%] flex flex-col justify-around">
              <div className="w-[100%] text-white h-[20%] flex justify-between px-2 items-center">
                <p>Investment</p>
                <p className="py-1 px-2 text-white text-base bg-slate-800 rounded-lg">{plan.investment}</p>
              </div>
              <div className="w-[100%] h-[20%] text-white flex justify-between px-2 items-center">
                <p>Capital Back</p>
                <p>yes</p>
              </div>
              <div className="w-[100%] h-[20%] text-white flex justify-between px-2 items-center">
                <p>Return Type</p>
                <p>Days</p>
              </div>
              <div className="w-[100%] h-[20%] text-white flex justify-between px-2 items-center">
                <p>Number of days</p>
                <p>30 days</p>
              </div>
            </div>
            <motion.div
              className="w-[90%] text-white text-lg font-semibold h-[13%] rounded-lg bg-blue-500 cursor-pointer flex justify-center items-center"
              whileHover={{ scale: 1.1 }}
              onClick={handleInvestNow}
            >
              INVEST NOW
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentPlan;
