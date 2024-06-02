import React from 'react';

const DescripcionTextarea = ({ value, onChange, placeholderText }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={`Escribe un ${placeholderText}...`}
            className="mt-1 block w-full bg-gray-50 bg-gray-900 border border-gray-300 text-white text-xl rounded-lg focus:ring-blue-500 focus:border-sky-500 p-2.5"></textarea>
    );
};

export default DescripcionTextarea;
