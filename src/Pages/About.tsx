import  { useState } from 'react';
import aboutimg from '../assets/Crypto portfolio-pana.svg';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';

// Modal styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root'); // Set the root element for accessibility

const About = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === '0902') {
      window.open("https://i.ibb.co/yqn0skw/cert.jpg");
      closeModal();
    } else {
      toast.error("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="w-full h-auto flex gap-3 items-center flex-col">
      <Toaster />
      <div className="AboutHero w-full rounded-b-3xl h-[27rem] relative flex gap-5 justify-around flex-col items-center bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
        <div className="w-[20%] h-[30%] flex justify-center items-center phone:w-[50%]">
          <p className="text-4xl text-white font-semibold">About Us</p>
        </div>
      </div>
      <div className="w-[100%] h-[34rem] flex justify-around phone:flex-col gap-3 items-center phone:h-[50rem]">
        <div className="aboutimg w-[40%] h-[100%] flex justify-center items-center  phone:h-[30%] phone:w-[100%]">
          <img src={aboutimg} alt="" className="w-full h-full object-cover phone:object-contain" />
        </div>
        <div className="w-[55%] h-[100%] flex justify-center phone:justify-around items-start px-4 phone:w-[95%] flex-col phone:h-[78%]">
          <div className="w-[50%] px-4 h-[20%] flex justify-center flex-col items-start phone:w-[80%] phone:h-[10%]">
            <p className="font-semibold text-orange-400">WHO WE ARE ?</p>
            <p className="text-2xl">Our Company Story</p>
          </div>
          <div className="w-[95%] h-[60%] px-5  flex justify-center items-center phone:w-[100%] phone:h-[70%]">
            <p className="text-lg text-slate-400 phone:text-[12px]">
              DefiSkySpace, as an investment company, is committed to redefining the landscape of digital investments. At the core of our vision is the integration of cutting-edge technology, particularly AI, to optimize investment strategies and deliver exceptional results to our clients. With a focus on cryptocurrency and blockchain assets, we strive to provide a secure and profitable avenue for investors to participate in the dynamic world of digital finance. Our approach emphasizes transparency, data-driven insights, and tailored investment solutions, ensuring that our clients' financial goals are met while navigating the ever-evolving cryptocurrency markets. Join DefiSkySpace in embracing a future where innovative investment strategies pave the way for financial growth and prosperity.
            </p>
          </div>
          <div className="w-[40%] h-[15%] flex justify-start items-center phone:w-[90%] phone:h-[10%]">
            <button onClick={openModal} className="w-[60%] h-[70%] rounded-lg text-white font-semibold bg-orange-500">
              View Certification
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Enter Password"
      >
        <h2>Enter Password</h2>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="border border-gray-300 rounded p-2 mt-2 w-full"
        />
        <div className="flex justify-end mt-4">
          <button onClick={handlePasswordSubmit} className="bg-blue-500 text-white p-2 rounded mr-2">Submit</button>
          <button onClick={closeModal} className="bg-gray-300 p-2 rounded">Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default About;
