import React from 'react';

const InputAdmin = ({ value, onChange, placeholder, className }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="px-3 py-2 text-gray-950 border rounded-md"
            />
    );
};

export default InputAdmin;
