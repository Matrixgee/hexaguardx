import React from "react";

interface NotificationModalProps {
  message: string;
  visible: boolean;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  message,
  visible,
}) => {
  return (
    <div
      className={`fixed bottom-5 left-5 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="bg-blue-800 text-white px-4 py-8 rounded-md w-max h-max shadow-2xl"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
};

export default NotificationModal;
