import React from 'react';
import { useForm } from '@inertiajs/react';
import Button from './Button';
import InputLabel from './InputLabel';
import TextAreaPerfil from './TextAreaPerfil';

const EnviarMensajeForm = ({ destinatarioId }) => {
    const { data, setData, post, reset, errors } = useForm({
        mensaje: '',
    });

    const handleChange = (e) => {
        setData('mensaje', e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('enviarMensaje', destinatarioId), data, {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <InputLabel htmlFor="mensaje">Mensaje privado:</InputLabel>
                <TextAreaPerfil
                    value={data.mensaje}
                    onChange={handleChange}
                    placeholderText="mensaje"
                />
            </div>
            <Button type="submit">Enviar Mensaje</Button>
        </form>
    );
};

export default EnviarMensajeForm;
