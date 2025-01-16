import React from 'react';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 text-2xl"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
