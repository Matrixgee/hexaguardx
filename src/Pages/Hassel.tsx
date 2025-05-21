
import Phone from '../assets/Trading-view-mockup-1-540x1024.png'
import { motion } from "framer-motion"


const Hassel = () => {

 

  const GetApp = ()=>{
    window.open("https://apps.apple.com/us/app/crypto-com-buy-bitcoin-eth/id1262148500")
  }

  return (
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
     
      className=" HasselBody w-[100%] h-[50rem] flex justify-center items-center mt-20 "
    >

        <div className="w-[90%] h-[90%] bg-white rounded-md flex phone:flex-col">
            <div className=" text-content w-[50%] h-[100%] bg-gray-50 rounded-md">
                <div className='BigHeadText w-[100%] h-[23%] px-2 text-left  flex justify-center items-center'>
                    <p className='text-[52px] text-blue-400 font-semibold'>Your hassle free crypto trading platform</p>
                </div>
                <div className='w-full h-[77%]  flex flex-col justify-around items-center phone:h-[70%]'>
                    <div className='w-[90%] h-[17%] flex justify-start items-center px-5 border-blue-400 rounded-md border-2'><p className='text-xl font-semibold text-blue-400'>Buy, Sell & Trade</p></div>
                    <div className='w-[90%] h-[17%] flex justify-start items-center px-5 border-blue-400 rounded-md border-2'><p className='text-xl font-semibold text-blue-400'>Safe and Secure</p></div>
                    <div className='w-[90%] h-[17%] flex justify-start items-center px-5 border-blue-400 rounded-md border-2'><p className='text-xl font-semibold text-blue-400'>Highly Regulated</p></div>
                    <div className='w-[90%] h-[17%] flex justify-start items-center px-5 border-blue-400 rounded-md border-2'><p className='text-xl font-semibold text-blue-400'>Trusted</p></div>
                    <div className='w-[90%] h-[14%] flex justify-start items-center'>
                    <button className='w-[26%] h-[60%] text-lg text-gray-100 bg-blue-600 rounded-md phone:w-[70%] phone:h-[70%]' onClick={GetApp}>Get App</button>
                    </div>
                </div>
            </div>
            <div className="w-[50%] h-[100%] flex justify-ceneter items-center phone:w-[100%] phone:h-[30%]">
                <img src={Phone} alt=" " className='w-[100%] h-[100%] object-contain' />
            </div>
        </div>

    </motion.div>

  )
}

export default Hassel