import React, { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import Select from '@/Components/Select';
import ButtonColores from '@/Components/ButtonColores';

const EquiposEdit = () => {
    const { auth, equipo, modos, rangos } = usePage().props;
    const { data, setData, put, processing, errors, setError, clearErrors } = useForm({
        nombre_equipo: equipo.nombre_equipo || '',
        rango_id: equipo.rango_id || '',
        modo_juego_preferente: equipo.modo_juego_preferente || '',
        privado: equipo.privado || false,
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
        } else if (data.nombre_equipo.length > 16) {
            setError('nombre_equipo', 'El nombre del equipo no puede exceder los 16 caracteres.');
        } else {
            clearErrors('nombre_equipo');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateNombreEquipo();
        if (!errors.nombre_equipo) {
            put(route('equipos.update', equipo.id));
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
                            value={data.nombre_equipo}
                            onChange={e => setData('nombre_equipo', e.target.value)}
                            onBlur={validateNombreEquipo}
                            maxLength={16}
                            required
                        />
                        {errors.nombre_equipo && <p className="text-red-600 text-sm mt-1">{errors.nombre_equipo}</p>}
                    </div>
                    <div className="mb-6">
                        <InputLabel value="Modo de juego preferente" />
                        <Select
                            id="modo_juego_preferente"
                            value={data.modo_juego_preferente}
                            onChange={e => setData('modo_juego_preferente', e.target.value)}
                            options={modos.map((modo) => ({
                                value: modo.id,
                                label: modo.nombre
                            }))}
                        />
                    </div>
                    <div className="mb-6">
                        <InputLabel htmlFor="rango_id" value="Rango del juego" />
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
                    <ButtonColores color="green" disabled={processing}>
                        Actualizar Equipo
                    </ButtonColores>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default EquiposEdit;
