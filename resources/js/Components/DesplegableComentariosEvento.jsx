import React, { useState } from 'react';
import ListaComentariosEvento from './ListaComentariosEvento';
import Paginacion from './Paginacion';

const DesplegableComentariosEvento = ({ comentarios, totalComentarios, paginacion, handleEliminarComentario, auth, evento }) => {
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
                <img src="/images/arrow.svg" alt="Flecha abajo" className={`ml-2 transition-transform duration-300 transform ${visible ? 'rotate-180' : ''} h-8 w-8`} />
            </button>
            {visible && (
                <>
                    <ListaComentariosEvento
                        comentarios={comentarios}
                        handleEliminarComentario={handleEliminarComentario}
                        auth={auth}
                        evento={evento}
                    />
                    <Paginacion links={paginacion} />
                </>
            )}
        </div>
    );
};

export default DesplegableComentariosEvento;
