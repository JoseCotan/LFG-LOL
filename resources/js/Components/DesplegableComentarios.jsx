import React, { useState } from 'react';
import ListaComentarios from './ListaComentarios';
import { Link } from '@inertiajs/react';

const DesplegableComentarios = ({ comentarios, totalComentarios, paginacion }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleVisible}
                className="text-blue-600 hover:underline focus:outline-none flex items-center"
            >
                Mostrar Comentarios ({totalComentarios})
                <img
                    src="/images/arrow.svg"
                    alt="Flecha abajo"
                    className={`ml-2 transition-transform duration-300 transform ${visible ? 'rotate-180' : ''
                        } h-8 w-8`}
                />
            </button>
            {visible && (
                <>
                    <ListaComentarios comentarios={comentarios} />
                    {paginacion && (
                        <div className="flex justify-center space-x-1 mt-4">
                            {paginacion.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    preserveScroll
                                    preserveState
                                    className={`px-4 py-2 ${link.active ? 'text-blue-500' : 'text-gray-500'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default DesplegableComentarios;
