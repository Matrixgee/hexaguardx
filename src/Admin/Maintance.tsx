import main from "../assets/Maintenance-bro.svg";
const Maintance = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[30%] h-[90%] bg-gray-100 shadow-lg rounded phone:w-[90%]">
        <div className="w-full h-[70%]  flex justify-center items-center">
          <img src={main} alt="" />
        </div>
        <div className="w-full h-[20%] flex justify-around items-center flex-col">
          <p className=" text-3xl font-semibold text-green-500 phone:text-center phone:text-xl">
            Site is Under Maintenance
          </p>
          <p className=" text-center text-gray-500">
            We will be performing scheduled maintenance on the platform to
            ensure continued reliability and performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Maintance;
