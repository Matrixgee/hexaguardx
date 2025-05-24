/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Menu,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react";
import "./header.css";
import { clearUser } from "../Function/Slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface UserHeaderProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ active, setActive }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notifications] = useState(3); // Mock notification count
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mock user data - replace with your actual user selector
  const user = useSelector((state: any) => state.user.user.user);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleUserIconClick = () => {
    setIsModalVisible(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/auth/login");
    console.log("Logout clicked");
  };

  const handleMenubar = () => {
    setActive(!active);
  };

  const handleNavigation = (path: string) => {
    // navigate(path);
    console.log(`Navigate to: ${path}`);
  };

  const menuItems = [
    {
      label: "My Profile",
      icon: <User className="w-5 h-5" />,
      path: "account/profile",
    },
    {
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "account/security",
    },
    {
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      path: "/user/overview",
      mobileOnly: true,
    },
  ];

  return (
    <div className="header-container">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-purple-900/20 to-slate-900/95 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-20 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-4 right-32 w-12 h-12 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="header-content">
        {/* Left Section - Menu Button */}
        <div className="menu-section">
          <button className="menu-button" onClick={handleMenubar}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Center Section - Action Buttons (Desktop) */}
        <div className="action-buttons">
          <button
            className="fund-button"
            onClick={() => handleNavigation("/user/deposit")}
          >
            <div className="button-content">
              <ArrowDownToLine className="w-4 h-4" />
              <span>Fund Account</span>
            </div>
          </button>
          <button
            className="withdraw-button"
            onClick={() => handleNavigation("/user/withdraw")}
          >
            <div className="button-content">
              <ArrowUpFromLine className="w-4 h-4" />
              <span>Withdraw Funds</span>
            </div>
          </button>
        </div>

        {/* Right Section - User Controls */}
        <div className="user-section">
          <div className="user-controls">
            {/* Notifications (Desktop) */}
            <div className="notification-wrapper">
              <button className="notification-button">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="notification-badge">{notifications}</span>
                )}
              </button>
            </div>

            {/* User Profile */}
            <div className="user-profile">
              <button className="avatar-button" onClick={handleUserIconClick}>
                {userImage ? (
                  <img src={userImage} alt="User" className="avatar-image" />
                ) : (
                  <div className="avatar-placeholder">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />

              <div className="user-name">
                <span>{user?.firstName}</span>
              </div>

              <div className="dropdown-wrapper">
                <button className="dropdown-trigger" onClick={handleShowMenu}>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      showMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="dropdown-menu">
                    <div className="dropdown-content">
                      {menuItems.map((item, index) => (
                        <button
                          key={index}
                          className={`dropdown-item ${
                            item.mobileOnly ? "mobile-only" : ""
                          }`}
                          onClick={() => {
                            setShowMenu(false);
                            handleNavigation(item.path);
                          }}
                        >
                          <span className="dropdown-icon">{item.icon}</span>
                          <span className="dropdown-label">{item.label}</span>
                        </button>
                      ))}
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item logout-item"
                        onClick={handleLogout}
                      >
                        <span className="dropdown-icon">
                          <LogOut className="w-5 h-5" />
                        </span>
                        <span className="dropdown-label">Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Profile Image</h3>
            </div>
            <div className="modal-body">
              <p className="modal-text">Do you want to add a profile image?</p>
            </div>
            <div className="modal-footer">
              <button className="modal-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="modal-ok" onClick={handleOk}>
                Choose Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHeader;
