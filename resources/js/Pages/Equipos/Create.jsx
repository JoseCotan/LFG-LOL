import React, { useEffect, useState } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import Select from '@/Components/Select';
import ButtonColores from '@/Components/ButtonColores';

const EquiposCreate = () => {
    const { auth, modos, rangos } = usePage().props;
    const { data, setData, post, processing } = useForm({
        nombre_equipo: '',
        rango_id: '',
        modo_juego_preferente: '2',
        privado: false,
    });

    // Estado para controlar la deshabilitación del campo de rango
    const [rangoDisabled, setRangoDisabled] = useState(false);

    // Efecto para ajustar el rango automáticamente y bloquear la selección
    useEffect(() => {
        // Si el modo de juego preferente es "Draft Pick" o "Aram", deshabilita el campo de rango
        if (data.modo_juego_preferente === '1' || data.modo_juego_preferente === '4') {
            setRangoDisabled(true);
            setData('rango_id', '12'); // ID 12 para "Sin rango"
        } else {
            setRangoDisabled(false);
        }
    }, [data.modo_juego_preferente]);

    const handleSubmit = (e) => {
        e.preventDefault();
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
                            required
                        />
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
                    <div className="flex items-center justify-between">
                        <ButtonColores color="green" disabled={processing}>Crear Equipo</ButtonColores>
                        <Link href={route('equipos.index')}>
                            <ButtonColores color="blue">
                                Cancelar
                            </ButtonColores>
                        </Link>
                    </div>
                </form>
            </div >
        </AuthenticatedLayout >
    );
};

export default EquiposCreate;
