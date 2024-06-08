import React from 'react';
import ImagenResponsive from '@/Components/ImagenResponsive';
import ButtonColores from '@/Components/ButtonColores';

const ListaComentariosEvento = ({ comentarios, handleEliminarComentario, auth, evento }) => {
    return (
        <div className="mt-4">
            {comentarios.map((comentario) => (
                <div key={comentario.id} className="border p-4 mb-2 rounded">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-gray-800 text-xl mb-4">{comentario.user.name || 'Usuario desconocido'}</p>
                            <p className="text-gray-500 text-lg xl:max-w-5xl lg:max-w-3xl md:max-w-lg sm:max-w-96 max-w-72 break-words">{comentario.descripcion}</p>
                        </div>
                        {comentario.user && (
                            <ImagenResponsive
                                srcPC={comentario.user.foto_perfil_PC}
                                srcTablet={comentario.user.foto_perfil_Tablet}
                                srcMobile={comentario.user.foto_perfil_Movil}
                                alt="Foto de perfil"
                                className="w-12 h-12 rounded-full"
                            />
                        )}
                    </div>
                    {(auth.user.id === comentario.user_id || auth.user.id === evento.creador.id || auth.user.admin) && (
                        <div className="flex justify-end mt-2">
                            <ButtonColores color="red" onClick={() => handleEliminarComentario(comentario.id)}>Eliminar</ButtonColores>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ListaComentariosEvento;
