import React from 'react';
import { useForm } from '@inertiajs/react';
import Button from './Button';
import TextAreaPerfil from './TextAreaPerfil';
import InputLabel from './InputLabel';
import ButtonColores from './ButtonColores';

const Comentario = ({ userId }) => {
    const { data, setData, post, reset, errors } = useForm({
        descripcion: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('comentarios.store', { user: userId }), {
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

export default Comentario;
