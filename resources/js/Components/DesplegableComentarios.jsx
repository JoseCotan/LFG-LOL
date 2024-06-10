import React, { useState } from 'react';
import ListaComentarios from './ListaComentarios';
import Paginacion from '@/Components/Paginacion';

const DesplegableComentarios = ({ comentarios, totalComentarios, paginacion, handleEliminarComentario }) => {
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
                    <ListaComentarios comentarios={comentarios} handleEliminarComentario={handleEliminarComentario} />
                    {paginacion && (
                        <Paginacion links={paginacion} />
                    )}
                </>
            )}
        </div>
    );
};

export default DesplegableComentarios;
