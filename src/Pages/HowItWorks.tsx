import { GrFormCheckmark } from "react-icons/gr";
import { AiOutlineUser } from "react-icons/ai";
import { BsBank2 } from "react-icons/bs";
import { RxRocket } from "react-icons/rx";
import { FaSackDollar } from "react-icons/fa6";
import { BsCheck2Circle } from "react-icons/bs";
import { TbChartPie } from "react-icons/tb";
import { LiaDonateSolid } from "react-icons/lia";
import { MdMarkEmailRead } from "react-icons/md";
import { motion } from "framer-motion"




const HowItWorks = () => {

    type howItWorksItems = {
        img : any,
        todo : string,
        text : string
    }


    const theWorks : howItWorksItems[] = [
        { 
            img:  <AiOutlineUser className="w-12 h-12" />,
            todo: 'Register Account', 
            text: 'By Registering the website you will be able to start your operation' 
        },
        { 
            img:  <MdMarkEmailRead className="w-12 h-12" />,
            todo: 'Verify Email', 
            text: 'After creating the account user need to verify the email for account purpose' 
        },
        { 
            img:  <BsCheck2Circle className="w-12 h-12" />,
            todo: 'Account verificaton', 
            text: "User's account will be approved after validation"
        },
        { 
            img:  <BsBank2 className="w-12 h-12" />,
            todo: 'Deposit Money', 
            text: 'Users can deposit using any automatic or manual gateways' 
        },
        { 
            img:  <RxRocket className="w-12 h-12" />,
            todo: 'Invest in a Plan', 
            text: 'Users can invest to any the plan or schema to enjoy the profit which will add on profit wallet' 
        },
        { 
            img:  <TbChartPie className="w-12 h-12" />,
            todo: 'Transfer Money', 
            text: 'Users can transfer the fund to another user instantly' 
        },
        { 
            img:  <LiaDonateSolid className="w-12 h-12" />,
            todo: 'Refer to Friends', 
            text: 'For referring to any friends user can generate the bonus' 
        },
        { 
            img:  <FaSackDollar className="w-12 h-12" />,
            todo: 'Withdraw and Enjoy', 
            text: 'Withdraw can be performed in the main wallet and it will take a few time to complete' 
        },
      ];



  return (
    <>
    
        <motion.div 
            initial={{
                opacity: 0,
                y: 300,
            }}
            transition={{
                type: "spring",
                stiffness: 30,
                mass: 1.5,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{once: true }}
            className="w-full py-10 px-14 flex flex-col items-center gap-5 phone:px-10 ">
            <p className="text-xl font-medium bg-orange-400 p-4 rounded-md text-white phone:text-sm ">HOW IT WORKS</p>
            <h1 className="text-5xl font-bold text-blue-500 text-center leading-[65px] phone:text-3xl ">What do you need to start?</h1>
            <div className="w-full flex flex-wrap gap-9 phone:flex-col py-10 ">
                {
                    theWorks.map((e)=> (
                        <div className="w-[23%] flex flex-col items-center gap-3 phone:w-full transition-all ease-in-out hover:scale-110 ">
                    <div className="w-32 h-32 bg-blue-400 rounded-md relative flex justify-center items-center text-white ">
                        {e.img}
                        <div className="w-10 h-10 rounded-3xl bg-orange-400 absolute top-[-10px] left-[-10px] flex items-center justify-center "><GrFormCheckmark className="w-6 h-6" /></div>
                    </div>
                    <p className="text-orange-500 text-2xl font-medium ">{ e.todo }</p>
                    <p className="text-lg text-[grey] font-medium text-center">{ e.text }</p>
                </div>
                    ))
                }
            </div>
        </motion.div>
    
    </>
  )
}

export default HowItWorks
