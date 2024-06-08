import React from 'react';
import { Link } from '@inertiajs/react';

const Paginacion = ({ links }) => {
    return (
        <div className="flex justify-center mt-4 overflow-x-auto">
            <nav className="flex flex-wrap justify-center space-x-1">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url}
                        preserveScroll
                        preserveState
                        className={`px-4 py-2 rounded-lg ${
                            link.active
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </nav>
        </div>
    );
};

export default Paginacion;
