// src/components/FAQSection.tsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What investment options do you offer?",
      answer:
        "We offer a comprehensive range of investment options including stocks, bonds, ETFs, mutual funds, real estate investment trusts (REITs), and alternative investments. Our team will help you build a diversified portfolio based on your financial goals and risk tolerance.",
    },
    {
      question: "What is the minimum investment amount?",
      answer:
        "Our standard accounts start with a minimum investment of $5,000. However, we also offer beginner portfolios with a lower minimum of $1,000 to help new investors get started. For premium managed accounts, the minimum investment is $25,000.",
    },
    {
      question: "How do your fees work?",
      answer:
        "We operate on a transparent fee structure with an annual management fee of 0.75% to 1.25%, depending on your portfolio size and the services you choose. There are no hidden fees or commissions. As your investment grows beyond certain thresholds, your fee percentage may decrease.",
    },
    {
      question: "Can I withdraw my money at any time?",
      answer:
        "Yes, you can withdraw your funds at any time without any penalties from our side. However, please note that certain investments may have their own restrictions or tax implications for early withdrawal. Our advisors will always explain any potential implications before you invest.",
    },
    {
      question: "How do you manage investment risk?",
      answer:
        "Risk management is central to our investment philosophy. We use a multi-layered approach including portfolio diversification, regular rebalancing, stress testing, and continuous monitoring of market conditions. We also match investment strategies to your individual risk tolerance level.",
    },
    {
      question: "Do you offer tax-advantaged investment options?",
      answer:
        "Yes, we provide various tax-efficient investment strategies and can help you set up retirement accounts like IRAs, Roth IRAs, and 401(k) rollovers. Our advisors also implement tax-loss harvesting and other strategies to minimize your tax burden while maximizing growth.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our investment services and
            processes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0 last:pb-0"
            >
              <button
                className="flex justify-between items-center w-full text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <span className="ml-6 flex-shrink-0 text-gray-500 dark:text-gray-400">
                  {openIndex === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </span>
              </button>

              <div
                className={`mt-2 transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
