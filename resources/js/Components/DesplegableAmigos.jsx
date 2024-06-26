import React, { useState } from 'react';
import ImagenResponsive from './ImagenResponsive';
import Paginacion from '@/Components/Paginacion';


const DesplegableAmigos = ({ amigos, user, paginacion }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <div className="relative mb-6">
            <button
                onClick={toggleVisible}
                className="text-blue-600 hover:underline focus:outline-none flex items-center"
            >
                Mostrar Amigos ({amigos.data.length})
                <img
                    src="/images/arrow.svg"
                    alt="Flecha abajo"
                    className={`ml-2 transition-transform duration-300 transform ${visible ? 'rotate-180' : ''
                        } h-8 w-8`}
                />
            </button>
            {visible && (
                <>
                <div className="grid gap-4 grid-cols-3 mb-6">
                    {amigos.data.map(amigo => (
                        <div key={amigo.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                            <ImagenResponsive
                                srcPC={amigo.usuario_id === user.id ? amigo.amigo_agregado.foto_perfil_Tablet : amigo.amigo_agregador.foto_perfil_Tablet}
                                srcTablet={amigo.usuario_id === user.id ? amigo.amigo_agregado.foto_perfil_Tablet : amigo.amigo_agregador.foto_perfil_Tablet}
                                srcMobile={amigo.usuario_id === user.id ? amigo.amigo_agregado.foto_perfil_Movil : amigo.amigo_agregador.foto_perfil_Movil}
                                alt="Foto de perfil"
                                className="h-25 w-15 rounded-full mb-2"
                            />
                            <span className="text-gray-800 text-center overflow-hidden overflow-ellipsis max-w-full">
                                {amigo.usuario_id === user.id ? amigo.amigo_agregado.name : amigo.amigo_agregador.name}
                            </span>
                        </div>
                    ))}
                </div>
                <Paginacion links={amigos.links} />
            </>
            )}
        </div>
    );
};

export default DesplegableAmigos;
