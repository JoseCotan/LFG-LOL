import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import ButtonColores from '@/Components/ButtonColores';
import ImagenResponsive from '@/Components/ImagenResponsive';
import MensajeSuccess from '@/Components/MensajeSuccess';
import MensajeError from '@/Components/MensajeError';
import Select from '@/Components/Select';
import InputLabel from '@/Components/InputLabel';

const EquiposIndex = () => {
    const { equipos, modos, rangos, auth, flash } = usePage().props;
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [filtroModo, setFiltroModo] = useState('');
    const [filtroRango, setFiltroRango] = useState('');
    const [filtroPrivacidad, setFiltroPrivacidad] = useState('');

    const convertirRango = (nombreRango) => {
        const rangos = {
            "Hierro": "IRON",
            "Bronce": "BRONZE",
            "Plata": "SILVER",
            "Oro": "GOLD",
            "Platino": "PLATINUM",
            "Esmeralda": "EMERALD",
            "Diamante": "DIAMOND",
            "Maestro": "MASTER",
            "Gran Maestro": "GRANDMASTER",
            "Aspirante": "CHALLENGER",
            "Sin clasificar": "UNRANKED",
            "Sin rango": "NORANK"
        };
        return rangos[nombreRango] || nombreRango;
    };

    useEffect(() => {
        if (flash && flash.type === 'success') {
            setSuccess(flash.message);
            setError('');
        } else if (flash && flash.type === 'error') {
            setError(flash.message);
            setSuccess('');
        }
    }, [flash]);

    const resetearFiltros = () => {
        setFiltroModo('');
        setFiltroRango('');
        setFiltroPrivacidad('');
    };

    const equiposFiltrados = equipos.filter(e => {
        return (!filtroModo || e.modo.id.toString() === filtroModo) &&
            (!filtroRango || e.rango.id.toString() === filtroRango) &&
            (!filtroPrivacidad || (filtroPrivacidad === 'publico' && !e.privado) || (filtroPrivacidad === 'privado' && e.privado));
    });

    return (
        <ControladorLayout>
            <div className="flex">
                <div className="p-4">
                    <div className="mb-4">
                        <InputLabel>Filtrar por Modo</InputLabel>
                        <Select
                            value={filtroModo}
                            onChange={(e) => setFiltroModo(e.target.value)}
                            options={modos.map((modo) => ({ value: modo.id, label: modo.nombre }))}
                            id="modo_id"
                        />
                    </div>
                    <div className="mb-4">
                        <InputLabel>Filtrar por Rango</InputLabel>
                        <Select
                            value={filtroRango}
                            onChange={(e) => setFiltroRango(e.target.value)}
                            options={rangos.map((rango) => ({ value: rango.id, label: rango.nombre }))}
                            id="rango_id"
                        />
                    </div>
                    <div className="mb-4">
                        <InputLabel>Filtrar por Privacidad</InputLabel>
                        <Select
                            value={filtroPrivacidad}
                            onChange={(e) => setFiltroPrivacidad(e.target.value)}
                            options={[
                                { value: "publico", label: "Público" },
                                { value: "privado", label: "Privado" }
                            ]}
                            id="privacidad"
                        />
                    </div>
                    <ButtonColores color="blue" onClick={resetearFiltros}>
                        Resetear Filtros
                    </ButtonColores>
                </div>

                <div className="w-11/12 p-6 overflow-hidden sm:rounded-lg">
                    <div className="ml-4 mb-4">
                        {success && (
                            <MensajeSuccess message={success} onClose={() => setSuccess('')} />
                        )}
                        {error && (
                            <MensajeError message={error} onClose={() => setError('')} />
                        )}
                    </div>
                    <div className="grid grid-cols-1 ml-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {equiposFiltrados.map((equipo) => (
                            <div key={equipo.id} className="bg-gray-900 overflow-hidden shadow-sm rounded-lg sm:rounded-lg w-full max-w-xs relative">
                                <div className="p-6 h-full">
                                    <h3 className="text-lg font-semibold text-white mb-2">{equipo.nombre_equipo}</h3>
                                    <img src={`/images/rangos/${convertirRango(equipo.rango.nombre)}.png`} alt={`Posición ${equipo.posicion}`} className="absolute top-0 right-6 w-20 h-20" />
                                    <div className="flex items-center mb-2">
                                        <ImagenResponsive
                                            srcPC={equipo.lider.foto_perfil_PC}
                                            srcTablet={equipo.lider.foto_perfil_Tablet}
                                            srcMobile={equipo.lider.foto_perfil_Movil}
                                            alt="Foto de perfil"
                                            className="h-8 w-8 rounded-full mr-2"
                                        />
                                        <p className="text-sm text-white">{equipo.lider.name}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-400 mb-1">Modo de Juego:</p>
                                        <p className="text-sm text-white">{equipo.modo.nombre}</p>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <p className="text-sm text-gray-400">Privacidad:</p>
                                        <p className="text-sm text-white ml-1">{equipo.privado ? 'Privado' : 'Público'}</p>
                                        <img
                                            src={`/images/${equipo.privado ? 'lock-solid.svg' : 'unlock-solid.svg'}`}
                                            alt="Candado"
                                            className="h-4 w-4 ml-2"
                                        />
                                    </div>
                                    <div className="flex">
                                        <Link href={route('equipos.show', equipo.id)}>
                                            <ButtonColores color="green">Mirar Equipo</ButtonColores>
                                        </Link>
                                        {auth.user && auth.user.id === equipo.lider.id && (
                                            <>
                                                <Link href={route('equipos.edit', equipo.id)}>
                                                    <ButtonColores color="yellow">Editar</ButtonColores>
                                                </Link>
                                                {/*<ButtonColores color="red" onClick={() => handleDelete(equipo.id)}>
                                                    Eliminar
                                        </ButtonColores>*/}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-left mt-4 ml-4">
                        <Link href={route('equipos.create')}>
                            <ButtonColores color="green">
                                Añadir Nuevo Equipo
                            </ButtonColores>
                        </Link>
                    </div>
                </div>
            </div>
        </ControladorLayout>
    );
};

export default EquiposIndex;
