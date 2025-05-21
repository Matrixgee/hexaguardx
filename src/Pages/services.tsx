// src/components/ServicesSection.tsx
import React from "react";
import {
  TrendingUp,
  Briefcase,
  Shield,
  LineChart,
  Users,
  BookOpen,
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg transition-all duration-300 hover:shadow-md">
      <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-900 dark:text-blue-300 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "Investment Strategy",
      description:
        "Tailored investment strategies designed to match your financial goals and risk tolerance.",
      icon: <TrendingUp size={24} />,
    },
    {
      title: "Portfolio Management",
      description:
        "Expert management of your investment portfolio with regular rebalancing and optimization.",
      icon: <Briefcase size={24} />,
    },
    {
      title: "Risk Management",
      description:
        "Sophisticated risk assessment and mitigation strategies to protect your investments.",
      icon: <Shield size={24} />,
    },
    {
      title: "Market Analysis",
      description:
        "In-depth market research and analysis to identify the best investment opportunities.",
      icon: <LineChart size={24} />,
    },
    {
      title: "Retirement Planning",
      description:
        "Comprehensive retirement planning services to ensure a secure financial future.",
      icon: <Users size={24} />,
    },
    {
      title: "Investment Education",
      description:
        "Resources and guidance to help you make informed investment decisions.",
      icon: <BookOpen size={24} />,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We offer a comprehensive range of investment services designed to
            help you achieve your financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
