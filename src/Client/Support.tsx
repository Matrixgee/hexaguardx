

const Support = () => {


  return (

    <div className="w-full h-[88vh] flex justify-center items-center scroll scrollbar-thin scrollbar-track-transparent overflow-y-auto ">
      <div className="w-[70%] h-[90%] bg-[white] rounded-lg flex flex-col items-center pt-10 phone:w-[90%] phone:h-[70%]">
        <p className="text-2xl ">Defi-SkySpace Trading Platform  </p>
        <p className="text-lg mt-2 phone:text-[15px]">For inquiries, suggestions or complains. Mail us</p>
        <p className="text-2xl text-blue-500 cursor-pointer mt-3 underline-offset-8 phone:text-[18px]">support@Defi-SkySpace.com</p>
        <div className="w-[80%] h-[270px] mt-16 ">
          <p>Message<span className="text-red-500">*</span></p>
          <textarea className="w-full h-[60%] border-[2px] border-[black] rounded-[3px] mt-1 "></textarea>
          <button className="w-full h-[20%] bg-[#050C1B] text-[white] transition-all duration-150 rounded-[5px] mt-2 hover:bg-blue-400">Send</button>
        </div>
      </div>
    </div>
  )
}

export default Support