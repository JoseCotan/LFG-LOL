import React from 'react';
import { useForm } from '@inertiajs/react';
import ButtonColores from './ButtonColores';
import TextAreaPerfil from './TextAreaPerfil';
import InputLabel from './InputLabel';

const ComentarioEvento = ({ eventoId }) => {
    const { data, setData, post, reset, errors } = useForm({
        descripcion: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('eventos.comentarios.store', { evento: eventoId }), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <InputLabel htmlFor="descripcion">Escribe un comentario:</InputLabel>
            <TextAreaPerfil
                value={data.descripcion}
                onChange={(e) => setData('descripcion', e.target.value)}
                placeholderText="comentario"
            />
            <ButtonColores color="blue" type="submit">
                Enviar Comentario
            </ButtonColores>
        </form>
    );
};

export default ComentarioEvento;
