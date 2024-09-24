import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import Header from "@/components/Header";
import { X } from "lucide-react";

type Props = PropsWithChildren & {
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

const Modal: React.FC<Props> = ({ name, isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary">
        <Header
          name={name}
          buttonComponent={
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600"
            >
              <X size={18} />
            </button>
          }
          isSmallText
        />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
