import React from 'react';
import ImagenResponsive from '@/Components/ImagenResponsive';

const ListaComentariosEvento = ({ comentarios }) => {
    console.log(comentarios)
    return (
        <div className="mt-4">
            {comentarios.map((comentario) => (
                <div key={comentario.id} className="border p-4 mb-2 rounded flex items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-gray-800 text-xl mb-4">{comentario.user.name || 'Usuario desconocido'}</p>
                        <p className="text-gray-500 text-lg">- {comentario.descripcion}</p>
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
            ))}
        </div>
    );
};

export default ListaComentariosEvento;
