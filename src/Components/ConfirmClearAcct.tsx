import React from "react";
import ConfirmActionModal from "./ConfirmActionModal";

interface ConfirmClearAcctModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmClearAcct: React.FC<ConfirmClearAcctModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <ConfirmActionModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Clear  User Acct"
      message="Are you sure you want to clear the user balance?"
      confirmLabel="Clear Acct"
    />
  );
};

export default ConfirmClearAcct;
