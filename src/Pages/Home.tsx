import React, { useState, useEffect, useCallback } from "react";
import NotificationModal from "../Components/NotificationModal";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";
// import InvestmentPlan from "./InvestmentPlan";
import Testimonials from "./Testimonals";
import Services from "./services";

// Enhanced data with more variety
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
  "Sacramento",
  "San Juan",
  "Miami",
  "Denver",
  "Nashville",
  "Philadelphia",
  "Detroit",
  "Las Vegas",
  "Phoenix",
  "Charlotte",
  "Minneapolis",
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
  "David",
  "Lisa",
  "Robert",
  "Jennifer",
  "William",
  "Linda",
  "James",
  "Patricia",
  "Charles",
  "Barbara",
  "Christopher",
  "Susan",
  "Matthew",
  "Dorothy",
];

const Earnings = [
  1458, 3000, 4000, 2500, 3200, 2800, 3500, 2200, 3900, 2700, 4200, 1890, 5100,
  3650, 2950, 4750, 1750, 5500, 3100, 2650, 4400, 3850, 2150, 4950, 3450,
];

// Investment types for more variety
const InvestmentTypes = [
  "stock investment",
  "crypto trade",
  "forex position",
  "portfolio gain",
  "dividend payout",
  "bond maturity",
  "real estate profit",
  "ETF return",
];

const getRandomElement = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const generateMessage = (): string => {
  const name = getRandomElement(Names);
  const city = getRandomElement(Cities);
  const earning = getRandomElement(Earnings);
  const investmentType = getRandomElement(InvestmentTypes);

  return `<b>${name}</b> from ${city} just earned <b>$${earning}</b> from ${investmentType}!🎉`;
};

const Home: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(generateMessage());
  const [notificationQueue, setNotificationQueue] = useState<string[]>([]);

  // Generate a queue of messages
  const generateNotificationQueue = useCallback(() => {
    const queue: string[] = [];
    for (let i = 0; i < 20; i++) {
      queue.push(generateMessage());
    }
    return queue;
  }, []);

  useEffect(() => {
    // Initialize the queue
    setNotificationQueue(generateNotificationQueue());

    // Show first notification after a delay
    const initialTimeout = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(initialTimeout);
  }, [generateNotificationQueue]);

  useEffect(() => {
    if (notificationQueue.length === 0) return;

    const showNotification = () => {
      setVisible(false);

      setTimeout(() => {
        // Get next message from queue
        setCurrentMessage(notificationQueue[0]);
        setNotificationQueue((prev) => {
          const newQueue = [...prev.slice(1)];
          // Add a new message to the end to keep the queue going
          newQueue.push(generateMessage());
          return newQueue;
        });
        setVisible(true);
      }, 500); // Small delay for smooth transition
    };

    // Show notification initially
    if (visible) {
      const intervalId = setInterval(showNotification, 6000); // Show every 6 seconds
      return () => clearInterval(intervalId);
    }
  }, [visible, notificationQueue]);

  const handleCloseNotification = () => {
    setVisible(false);
  };

  return (
    <div className="relative">
      {/* Main content */}
      <main>
        <Hero />
        <HowItWorks />
        {/* <InvestmentPlan /> */}
        <Services />
        <Testimonials />
        <FAQ />
      </main>

      {/* Enhanced Notification System */}
      <NotificationModal
        message={currentMessage}
        visible={visible}
        onClose={handleCloseNotification}
      />

      {/* Optional: Multiple notifications for high activity periods */}
      {/* You can uncomment this for special events or high-traffic periods */}
      {/* 
      <NotificationModal 
        message={generateMessage()} 
        visible={Math.random() > 0.8} // Show randomly
        style={{ bottom: '120px' }} // Position above the main notification
      />
      */}
    </div>
  );
};

export default Home;
