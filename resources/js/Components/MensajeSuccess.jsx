import React from 'react';

const MensajeSuccess = ({ message, onClose }) => {
    return (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mt-4 rounded relative mb-4 max-w-xs" role="alert" style={{ maxWidth: '400px' }}>
            <div className="flex items-center justify-between">
                <span className="block sm:inline mr-4">{message}</span>
                <span className="cursor-pointer" onClick={onClose}>
                    <svg className="fill-current h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                    </svg>
                </span>
            </div>
        </div>
    );
};

export default MensajeSuccess;
