import { useForm } from '@inertiajs/react';
import Button from './Button';
import InputLabel from './InputLabel';

const EnviarMensajeForm = ({ destinatarioId }) => {
    const { data, setData, post, reset, errors } = useForm({
        mensaje: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('enviarMensaje', destinatarioId), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <InputLabel htmlFor="mensaje">Mensaje:</InputLabel>
                <textarea
                    id="mensaje"
                    value={data.mensaje}
                    onChange={(e) => setData('mensaje', e.target.value)}
                    style={{ color: 'black' }}
                ></textarea>
                {errors.mensaje && <div>{errors.mensaje}</div>}
            </div>
            <Button type="submit">Enviar Mensaje</Button>
        </form>
    );
};

export default EnviarMensajeForm;
