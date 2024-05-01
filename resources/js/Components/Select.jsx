import React from 'react';

const Select = ({ label, value, onChange, options, id, className, disabled = false }) => {
    return (
        <div className={className}>
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
            <select
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
