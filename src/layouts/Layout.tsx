// import { useState, useEffect } from "react";
// import { FaArrowUp, FaArrowDown } from "react-icons/fa";
// import { Link } from "react-scroll";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";

// const Arrow = () => {
//   const [scroll, setScroll] = useState(false);

//   const onScroll = () => {
//     // Debugging logs to check scroll behavior
//     // console.log('ScrollY:', window.scrollY);
//     // console.log('InnerHeight:', window.innerHeight);
//     // console.log('DocumentHeight:', document.documentElement.scrollHeight);

//     // Check if scroll position is past a certain point
//     if (window.scrollY >= 30) {
//       setScroll(true);
//     } else {
//       setScroll(false);
//     }
//   };
//   const oNcLIck = () => {
//     console.log("hello world");
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <div className="fix-arrow fixed bottom-24 z-20 right-4 w-[50px] h-[50px] rounded-lg bg-blue-500 text-white flex justify-center items-center cursor-pointer">
//       {!scroll ? (
//         <Link to="footer" smooth={true} duration={1000} onClick={oNcLIck}>
//           <FaArrowDown />
//         </Link>
//       ) : (
//         <Link to="home" smooth={true} duration={1000} onClick={oNcLIck}>
//           <FaArrowUp />
//         </Link>
//       )}
//     </div>
//   );
// };

const Layout = () => {
  return (
    <>
      {/* <Arrow /> */}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
