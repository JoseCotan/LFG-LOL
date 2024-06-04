import React from 'react';

const ButtonColores = ({ children, color = 'blue', ...props }) => {
    const baseClasses = "inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25 transition mr-2";
    const colorClasses = {
        blue: `bg-blue-500 hover:bg-blue-600 focus:ring-blue-200 focus:border-blue-700`,
        red: `bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:border-red-700`,
        green: `bg-green-500 hover:bg-green-600 focus:ring-green-200 focus:border-green-700`,
        yellow: `bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-200 focus:border-yellow-700`,
    };

    return (
        <button className={`${baseClasses} ${colorClasses[color]}`} {...props}>
            {children}
        </button>
    );
};

export default ButtonColores;
