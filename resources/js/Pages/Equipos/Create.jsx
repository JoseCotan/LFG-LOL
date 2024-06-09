import React, { useEffect, useState } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import Select from '@/Components/Select';
import ButtonColores from '@/Components/ButtonColores';

const EquiposCreate = () => {
    const { auth, modos, rangos } = usePage().props;
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        nombre_equipo: '',
        rango_id: '',
        modo_juego_preferente: '2',
        privado: false,
    });

    const [rangoDisabled, setRangoDisabled] = useState(false);

    useEffect(() => {
        if (data.modo_juego_preferente === '1' || data.modo_juego_preferente === '4') {
            setRangoDisabled(true);
            setData('rango_id', '12'); // ID 12 para "Sin rango"
        } else {
            setRangoDisabled(false);
        }
    }, [data.modo_juego_preferente]);

    const validateNombreEquipo = () => {
        if (!data.nombre_equipo) {
            setError('nombre_equipo', 'El nombre del equipo es obligatorio.');
        } else if (data.nombre_equipo.length > 30) {
            setError('nombre_equipo', 'El nombre del equipo no puede exceder los 30 caracteres.');
        } else {
            clearErrors('nombre_equipo');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
         // Validar antes de enviar
        validateNombreEquipo();
        if (!errors.nombre_equipo) {
            post(route('equipos.store'), data, {
                onSuccess: () => {
                    setData({
                        nombre_equipo: '',
                        modo_juego_preferente: '',
                        rango_id: '',
                        privado: false,
                    });
                }
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-4xl mx-auto p-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <InputLabel value="Nombre del Equipo" />
                        <TextInput
                            id="nombre_equipo"
                            type="text"
                            value={data.nombre_equipo}
                            onChange={(e) => setData('nombre_equipo', e.target.value)}
                            onBlur={validateNombreEquipo}
                            required
                        />
                        {errors.nombre_equipo && <p className="text-red-600 text-sm mt-1">{errors.nombre_equipo}</p>}
                    </div>
                    <div className="mb-6">
                        <InputLabel value="Modo de juego preferente" />
                        <Select
                            id="modo_juego_preferente"
                            value={data.modo_juego_preferente}
                            onChange={(e) => setData('modo_juego_preferente', e.target.value)}
                            options={modos.map((modo) => ({ value: modo.id, label: modo.nombre }))}
                        />
                    </div>
                    <div className="mb-6">
                        <InputLabel htmlFor="rango_id" value="Rango del juego preferente" />
                        <Select
                            value={data.rango_id}
                            onChange={(e) => setData('rango_id', e.target.value)}
                            options={rangos.map((rango) => ({ value: rango.id, label: rango.nombre }))}
                            id="rango_id"
                            disabled={rangoDisabled}
                        />
                    </div>
                    <div className="mb-6">
                        <InputLabel value="Equipo privado" />
                        <Checkbox
                            id="privado"
                            checked={data.privado}
                            onChange={(e) => setData('privado', e.target.checked)}
                        />
                        <span>Hacer equipo Privado</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <ButtonColores color="green" disabled={processing}>Crear Equipo</ButtonColores>
                        <Link href={route('equipos.index')}>
                            <ButtonColores color="blue">
                                Cancelar
                            </ButtonColores>
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default EquiposCreate;
