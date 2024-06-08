// ListaComentarios.jsx
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import ImagenResponsive from '@/Components/ImagenResponsive';
import ButtonColores from './ButtonColores';

const ListaComentarios = ({ comentarios, handleEliminarComentario }) => {
    const { auth } = usePage().props;

    return (
        <div className="mt-4">
            {comentarios && comentarios.length > 0 && comentarios.map((comentario) => (
                <div key={comentario.id} className="border p-4 mb-4 rounded">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col mr-4">
                            <p className="text-gray-800 text-xl mb-2">{comentario.user.name}</p>
                            <p class="text-gray-500 text-lg max-w-44 break-words">{comentario.descripcion}</p>
                        </div>
                        <ImagenResponsive
                            srcPC={comentario.user.foto_perfil_PC}
                            srcTablet={comentario.user.foto_perfil_Tablet}
                            srcMobile={comentario.user.foto_perfil_Movil}
                            alt="Foto de perfil"
                            className="w-12 h-12 rounded-full"
                        />
                    </div>
                    {comentario.user_id === auth.user.id && (
                        <div className="mt-2">
                            <ButtonColores color="red" onClick={() => handleEliminarComentario(comentario.id)}>Eliminar</ButtonColores>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ListaComentarios;
