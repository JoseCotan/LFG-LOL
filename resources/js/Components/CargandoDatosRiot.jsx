import React from 'react';

const CargandoDatos = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex justify-center items-center h-40 bg-sky-100">
                    <img src="/images/ezreal.gif" alt="Cargando" className="w-full h-full object-cover" />
                </div>
                <div className="px-6 py-4">
                    <p className="text-center text-gray-700">Cargando datos...</p>
                </div>
            </div>
        </div>
    );
};

export default CargandoDatos;
