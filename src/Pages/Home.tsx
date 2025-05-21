import NotificationModal from "../Components/NotificationModal";
import { useState, useEffect } from "react";
import Hero from "./Hero";
import Hassel from "./Hassel";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";
import InvestmentPlan from "./InvestmentPlan";
import Testimonals from "./Testimonals";

const Cities = [
  "Texas",
  "Atlanta",
  "Ohio",
  "Arizona",
  "Austin",
  "Boston",
  "New York",
  "Chicago",
  "San Francisco",
  "Los Angeles",
  "Seattle",
  "Portland",
  "Vancouver",
  "San Diego",
  "Seattle",
  "Sacramento",
  "San Juan",
];

const Names = [
  "Barney",
  "Sarah",
  "Loretta",
  "Michael",
  "Otto",
  "Alice",
  "John",
  "Emma",
  "Daniel",
  "Sophia",
  "Rachel",
  "Jessica",
  "Grace",
  "Samantha",
  "Rebecca",
];

const Earnings = [1458, 3000, 4000, 2500, 3200, 2800, 3500, 2200, 3900, 2700];

const getRandomElement = (arr: string[] | number[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const generateMessages = (cities: string[]) => {
  return cities.map((city) => {
    const name = getRandomElement(Names);
    const earning = getRandomElement(Earnings);
    return `
<b>${name}</b> from ${city} just earned <b>$${earning}!</b>🎉`;
  });
};

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(
    generateMessages(Cities)[0]
  );
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMessageIndex(
          (prevIndex) => (prevIndex + 1) % generateMessages(Cities).length
        );
        setCurrentMessage(generateMessages(Cities)[messageIndex]);
        setVisible(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [messageIndex]);

  return (
    <div className="">
      <Hero />
      {/* <Hassel />
      <HowItWorks />
      <InvestmentPlan />
      <Testimonals/>
      <FAQ /> */}
      {/* <NotificationModal message={currentMessage} visible={visible} /> */}
    </div>
  );
};

export default Home;
