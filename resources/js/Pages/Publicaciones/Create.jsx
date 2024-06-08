import React, { useEffect, useState } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import InputError from '@/Components/InputError';
import ButtonColores from '@/Components/ButtonColores';

const CreatePublicacion = () => {
    const { auth, modos, roles, rangos } = usePage().props;
    const { data, setData, post, errors, setError, clearErrors  } = useForm({
        titulo: '',
        modo_id: '',
        rol_id: '',
        rango_id: '12',
        hora_preferente_inicio: '',
        hora_preferente_final: ''
    });

    // Estado para controlar la deshabilitación de los campos
    const [rangoDisabled, setRangoDisabled] = useState(true);
    const [rolDisabled, setRolDisabled] = useState(false);

    // Efecto para manejar el cambio en el modo de juego
    useEffect(() => {
        // Mapeo de los rangos con sus IDs correspondientes
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

        // Si el usuario tiene un rango asignado para SoloQ o Flex, se deshabilita la selección
        if (auth.user.rankedSoloQ && data.modo_id === '2') {
            setData('rango_id', rangosMap[auth.user.rankedSoloQ]); // Asignar el ID del rango
            setRangoDisabled(true); // Deshabilitar la selección de rango
        } else if (auth.user.rankedFlex && data.modo_id === '3') {
            setData('rango_id', rangosMap[auth.user.rankedFlex]); // Asignar el ID del rango
            setRangoDisabled(true); // Deshabilitar la selección de rango
        } else if (data.modo_id === '1' || data.modo_id === '4') {
            setRangoDisabled(true); // Deshabilitar la selección de rango
            setData('rango_id', '12'); // Asignar un valor predeterminado para otros modos
        } else if (!(auth.user.rankedSoloQ) && data.modo_id === '2') {
            setRangoDisabled(false); // Habilitar la selección de rango
        } else if (!(auth.user.rankedFlex) && data.modo_id === '3') {
            setRangoDisabled(false); // Habilitar la selección de rango
        } else {
            setRangoDisabled(true); // Deshabilitar la selección de rango por defecto
        }

        // Si el modo de juego es ARAM (ID_modo 4), se deshabilita la selección de rol
        if (data.modo_id === '4') {
            setData('rol_id', '6'); // Asignar un valor predeterminado para ARAM
            setRolDisabled(true); // Deshabilitar la selección de rol
        } else {
            setRolDisabled(false); // Habilitar la selección de rol
        }
    }, [data.modo_id, auth.user.rankedSoloQ, auth.user.rankedFlex]);

    // Opciones de selección para el campo de rango
    let rangoOptions;
    if (!auth.user.rankedSoloQ && data.modo_id === '2') {
        rangoOptions = rangos.slice(0, -1).map((rango) => ({ value: rango.id, label: rango.nombre }));
    } else if (!auth.user.rankedFlex && data.modo_id === '3') {
        rangoOptions = rangos.slice(0, -1).map((rango) => ({ value: rango.id, label: rango.nombre }));
    } else {
        rangoOptions = rangos.map((rango) => ({ value: rango.id, label: rango.nombre }));
    }

    // Opciones de selección para el campo de rol
    let rolOptions;
    if (data.modo_id === '4') {
        rolOptions = [{ value: '6', label: 'ARAM' }]; // Opción predeterminada para ARAM
    } else {
        rolOptions = roles.slice(0, -1).map((rol) => ({ value: rol.id, label: rol.nombre }));
    }

    // Función para validar el campo de título
    const validateTitulo = () => {
        if (!data.titulo) {
            setError('titulo', 'El título no puede estar vacío.');
        } else if (data.titulo.length > 60) {
            setError('titulo', 'El título no puede exceder los 60 caracteres.');
        } else {
            clearErrors('titulo');
        }
    };

    // Función para validar el campo de hora preferente de inicio
    const validateHoraPreferenteInicio = () => {
        if (!data.hora_preferente_inicio) {
            setError('hora_preferente_inicio', 'La hora de inicio es obligatoria.');
        } else if (data.hora_preferente_final && data.hora_preferente_inicio >= data.hora_preferente_final) {
            setError('hora_preferente_inicio', 'La hora de inicio debe ser menor que la hora final.');
        } else {
            clearErrors('hora_preferente_inicio');
        }
    };

    // Función para validar el campo de hora preferente final
    const validateHoraPreferenteFinal = () => {
        if (!data.hora_preferente_final) {
            setError('hora_preferente_final', 'La hora final es obligatoria.');
        } else if (data.hora_preferente_inicio && data.hora_preferente_inicio >= data.hora_preferente_final) {
            setError('hora_preferente_final', 'La hora final debe ser mayor que la hora de inicio.');
        } else {
            clearErrors('hora_preferente_final');
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
         // Validar antes de enviar
        validateTitulo();
        validateHoraPreferenteInicio();
        validateHoraPreferenteFinal();
        if (!errors.titulo && !errors.hora_preferente_inicio && !errors.hora_preferente_final) {
            post(route('publicaciones.store'))}};

    return (
        <ControladorLayout user={auth.user}>
            <div className="max-w-4xl mx-auto p-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <InputLabel htmlFor="titulo" value="Título" />
                        <TextInput
                            id="titulo"
                            type="text"
                            value={data.titulo}
                            onChange={(e) => setData('titulo', e.target.value)}
                            autoComplete="titulo"
                            required
                            onBlur={validateTitulo}
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
                        <InputLabel htmlFor="rango_id" value="Rango del juego mínimo preferente" />
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
                            onBlur={validateHoraPreferenteInicio}
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
                            onBlur={validateHoraPreferenteFinal}
                            required
                        />
                        <InputError message={errors.hora_preferente_final} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <ButtonColores color="green">Crear publicación</ButtonColores>
                        <Link href={route('publicaciones.index')}>
                            <ButtonColores color="blue">
                                Cancelar
                            </ButtonColores>
                        </Link>
                    </div>
                </form>
            </div>
        </ControladorLayout>
    );
};

export default CreatePublicacion;
