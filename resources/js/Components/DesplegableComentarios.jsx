import React, { useState } from 'react';
import ListaComentarios from './ListaComentarios';

const DesplegableComentarios = ({ comentarios }) => {
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
                Mostrar Comentarios ({comentarios.length})
                <img
                    src="/images/arrow.svg"
                    alt="Flecha abajo"
                    className={`ml-2 transition-transform duration-300 transform ${visible ? 'rotate-180' : ''
                        } h-8 w-8`}
                />
            </button>
            {visible && (
                <ListaComentarios comentarios={comentarios}/>
            )}
        </div>
    );
};

export default DesplegableComentarios;
