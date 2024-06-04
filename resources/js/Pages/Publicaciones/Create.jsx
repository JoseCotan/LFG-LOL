import React, { useEffect, useState } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import InputError from '@/Components/InputError';

const CreatePublicacion = () => {
    const { auth, modos, roles, rangos } = usePage().props;
    const { data, setData, post, errors, setError } = useForm({
        titulo: '',
        modo_id: '',
        rol_id: '',
        rango_id: '12',
        hora_preferente_inicio: '',
        hora_preferente_final: ''
    });

    const [rangoDisabled, setRangoDisabled] = useState(true);
    const [rolDisabled, setRolDisabled] = useState(false);

    useEffect(() => {
        // Mapeo de los nombres de los rangos a sus IDs correspondientes
        const rangosMap = {
            'IRON': 1,
            'BRONZE': 2,
            'SILVER': 3,
            'GOLD': 4,
            'PLATINUM': 5,
            'EMERALD': 6,
            'DIAMOND': 7,
            'MASTER': 8,
            'GRANDMASTER': 9,
            'CHALLENGER': 10,
            'UNRANKED': 11,
        };

        // Si el usuario tiene un rango guardado en la base de datos, asigna automáticamente su ID correspondiente
        if (auth.user.rankedSoloQ && data.modo_id === '2') {
            setData('rango_id', rangosMap[auth.user.rankedSoloQ]);
            setRangoDisabled(true);
        } else if (auth.user.rankedFlex && data.modo_id === '3') {
            setData('rango_id', rangosMap[auth.user.rankedFlex]);
            setRangoDisabled(true);
        } else if (data.modo_id === '1' || data.modo_id === '4') {
            setRangoDisabled(true);
            setData('rango_id', '12');
        } else if ((!(auth.user.rankedSoloQ) && data.modo_id === '2')) {
            setRangoDisabled(false);
        } else if ((!(auth.user.rankedFlex) && data.modo_id === '3')) {
            setRangoDisabled(false);
        } else {
            setRangoDisabled(true);
        }

        // Para el rol
        if (data.modo_id === '4') { // Asumiendo que '4' es el ID para ARAM
            setData('rol_id', '6'); // Asumiendo que '6' es el ID para ARAM
            setRolDisabled(true);
        } else {
            setRolDisabled(false);
        }
    }, [data.modo_id, auth.user.rankedSoloQ, auth.user.rankedFlex]);

    let rangoOptions;
    if (!auth.user.rankedSoloQ && data.modo_id === '2') {
        rangoOptions = rangos.slice(0, -1).map((rango) => ({ value: rango.id, label: rango.nombre }));
    } else if (!auth.user.rankedFlex && data.modo_id === '3') {
        rangoOptions = rangos.slice(0, -1).map((rango) => ({ value: rango.id, label: rango.nombre }));
    } else {
        rangoOptions = rangos.map((rango) => ({ value: rango.id, label: rango.nombre }));
    }

    let rolOptions;
    if (data.modo_id === '4') { // Asumiendo que '4' es el ID para ARAM
        rolOptions = [{ value: '6', label: 'ARAM' }];
    } else {
        rolOptions = roles.slice(0, -1).map((rol) => ({ value: rol.id, label: rol.nombre }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('publicaciones.store'), data, {
            onSuccess: () => {
                setData({
                    titulo: '',
                    modo_id: '',
                    rol_id: '',
                    rango_id: '',
                    hora_preferente_inicio: '',
                    hora_preferente_final: ''
                });
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-4xl mx-auto p-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <InputLabel htmlFor="titulo" value="Título" />
                        <TextInput
                            id="titulo"
                            type="text"
                            value={data.titulo}
                            onChange={(e) => setData('titulo', e.target.value)}
                            className="mt-1 block w-full"
                            autoComplete="titulo"
                            required
                            onBlur={(e) => {
                                // Comprueba que el título no pueda estar vacío.
                                if (e.target.value === '') {
                                    setError('titulo', 'El título no puede estar vacío.');
                                } else {
                                    setError('titulo', '');
                                }
                            }}
                        />
                        <InputError message={errors.titulo} className="mt-2" />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="modo_id" value="Modo de juego" />
                        <Select
                            value={data.modo_id}
                            onChange={(e) => setData('modo_id', e.target.value)}
                            options={modos.map((modo) => ({ value: modo.id, label: modo.nombre }))}
                            id="modo_id"
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="rol_id" value="Rol del juego" />
                        <Select
                            value={data.rol_id}
                            onChange={(e) => setData('rol_id', e.target.value)}
                            options={rolOptions}
                            id="rol_id"
                            disabled={rolDisabled}
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="rango_id" value="Rango del juego" />
                        <Select
                            value={data.rango_id}
                            onChange={(e) => setData('rango_id', e.target.value)}
                            options={rangoOptions}
                            id="rango_id"
                            disabled={rangoDisabled}
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="hora_preferente_inicio" value="Hora preferente de inicio" />
                        <TextInput
                            id="hora_preferente_inicio"
                            type="time"
                            value={data.hora_preferente_inicio}
                            onChange={(e) => setData('hora_preferente_inicio', e.target.value)}
                            onBlur={() => {
                                // Comprueba si la hora de inicio es antes que la hora final.
                                if (data.hora_preferente_final && data.hora_preferente_inicio >= data.hora_preferente_final) {
                                    setError('hora_preferente_inicio', 'La hora de inicio debe ser menor que la hora final.');
                                } else {
                                    setError('hora_preferente_inicio', '');
                                }
                            }}
                            required
                        />
                        <InputError message={errors.hora_preferente_inicio} className="mt-2" />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="hora_preferente_final" value="Hora preferente final" />
                        <TextInput
                            id="hora_preferente_final"
                            type="time"
                            value={data.hora_preferente_final}
                            onChange={(e) => setData('hora_preferente_final', e.target.value)}
                            onBlur={() => {
                                // Comprueba si la hora final es antes que la hora de inicio.
                                if (data.hora_preferente_inicio && data.hora_preferente_inicio >= data.hora_preferente_final) {
                                    setError('hora_preferente_final', 'La hora final debe ser mayor que la hora de inicio.');
                                } else {
                                    setError('hora_preferente_final', '');
                                }
                            }}
                            required
                        />
                        <InputError message={errors.hora_preferente_final} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <PrimaryButton>Crear publicación</PrimaryButton>
                        <Link href={route('publicaciones.index')} className="text-sm text-blue-600 hover">Cancelar</Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreatePublicacion;
