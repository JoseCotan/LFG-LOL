import React from 'react';

function VentanaInfo({ isOpen, children, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center px-4">
            <div className="w-1/2 min-h-1/4 max-h-3/4 bg-white p-4 rounded-lg shadow-lg relative overflow-auto text-justify">
                <button onClick={onClose} className="absolute top-0 right-0 p-2 text-2xl">
                    &times;
                </button>
                <div className="py-2">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default VentanaInfo;
