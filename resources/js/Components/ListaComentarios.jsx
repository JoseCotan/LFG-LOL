import React from 'react';

const ComentariosList = ({ comentarios }) => {
    console.log(comentarios)
    return (
        <div className="mt-4">
            {comentarios.map((comentario) => (
                <div key={comentario.id} className="border p-4 mb-2 rounded">
                    <p className="text-gray-800">{comentario.descripcion}</p>
                    <p className="text-gray-500 text-sm">- {comentario.user.name}</p>
                </div>
            ))}
        </div>
    );
};

export default ComentariosList;
