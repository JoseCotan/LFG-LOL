// DesplegableComentarios.jsx
import React, { useState } from 'react';
import ListaComentarios from './ListaComentarios';
import { Link } from '@inertiajs/react';
import Paginacion from '@/Components/Paginacion';
import ButtonColores from '@/Components/ButtonColores';

const DesplegableComentarios = ({ comentarios, totalComentarios, paginacion, haComentado, authUser, handleEliminarComentario }) => {
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
                    <ListaComentarios comentarios={comentarios} handleEliminarComentario={handleEliminarComentario} /> {/* Pasa la función de eliminación de comentarios */}
                    {paginacion && (
                        <Paginacion links={paginacion} />
                    )}
                </>
            )}
        </div>
    );
};

export default DesplegableComentarios;
