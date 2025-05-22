import Logo from "../assets/skyBig.png";
import { BsFacebook, BsTwitter, BsLinkedin, BsInstagram } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  const footerLinks = [
    {
      title: "Customer Support",
      links: [
        { label: "Privacy Policy", url: "#" },
        { label: "Terms & Conditions", url: "#" },
        { label: "Contact Us", url: "#" },
      ],
    },
    {
      title: "Planning Service",
      links: [
        { label: "Planning Services", url: "#" },
        { label: "Assets Management", url: "#" },
        { label: "Alternative Investing", url: "#" },
        { label: "Retirement Planning", url: "#" },
        { label: "Private Wealth", url: "#" },
      ],
    },
    {
      title: "Investment Service",
      links: [
        { label: "Option Trading", url: "#" },
        { label: "Real Estate", url: "#" },
        { label: "Stock Market", url: "#" },
        { label: "Infrastructure", url: "#" },
        { label: "Forex Trading", url: "#" },
        { label: "Crypto Assets", url: "#" },
        { label: "Fixed Income", url: "#" },
        { label: "Agriculture", url: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <BsFacebook />, url: "#" },
    { icon: <BsTwitter />, url: "#" },
    { icon: <BsLinkedin />, url: "#" },
    { icon: <BsInstagram />, url: "#" },
    { icon: <FaTelegramPlane />, url: "#" },
  ];

  return (
    <footer className="bg-[#05060f] text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and Contact Info */}
          <div className="space-y-6">
            <div className="w-40 h-auto">
              <img
                src={Logo}
                alt="DeFi Sky-Space"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Location to HQ</h3>
              <p className="text-gray-400">23 Valley Lane, Austin</p>
              <a
                href="mailto:defiskyspace@gmail.com"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                defiskyspace@gmail.com
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-bold text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} DEFI SKY-SPACE, All rights reserved
          </p>

          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="text-gray-400 hover:text-blue-400 transition-colors text-xl"
                aria-label={`Follow us on ${social.icon.type.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
