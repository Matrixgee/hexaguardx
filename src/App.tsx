import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import logo from "./assets/singlelogo.png";
import { MainRoutes } from "./Routes/MainRoutes";

const App = () => {
  const [loading, setLoading] = useState(true);
  const baseUrl = "https://hexg.onrender.com/api";

  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await fetch(baseUrl);
        console.log("Server awakened");
      } catch (error) {
        console.error("Error waking up server:", error);
      }
    };

    wakeUpServer();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <img
            src={logo}
            alt="Loading..."
            className="mx-auto w-32 sm:w-40 md:w-60 lg:w-56 animate-fade-in-out"
            style={{
              animation: "fadeInOut 2s ease-in-out infinite",
            }}
          />
        </div>
        <style>{`
          @keyframes fadeInOut {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }

  return <RouterProvider router={MainRoutes} />;
};

export default App;
