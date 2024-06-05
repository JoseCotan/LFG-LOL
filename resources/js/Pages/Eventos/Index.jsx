import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import ButtonColores from '@/Components/ButtonColores';
import Select from '@/Components/Select';
import InputLabel from '@/Components/InputLabel';
import ImagenResponsive from '@/Components/ImagenResponsive';
import MensajeError from '@/Components/MensajeError';
import MensajeSuccess from '@/Components/MensajeSuccess';


const EventosIndex = () => {
    const { eventos, auth, flash } = usePage().props;
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [filtroPublico, setFiltroPublico] = useState('');
    const [filtroAmigos, setFiltroAmigos] = useState('');
    const [filtroMiembrosEquipo, setFiltroMiembrosEquipo] = useState('');

    const handleUnirse = (eventoId) => {
        Inertia.post(route('eventos.unirse', eventoId));
    };

    const handleAbandonar = (eventoId) => {
        Inertia.post(route('eventos.abandonar', eventoId));
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

    const eventosFiltrados = eventos.filter(evento => {
        const accesoPublico = Boolean(evento.acceso_publico);
        const accesoAmigos = Boolean(evento.acceso_amigos);
        const accesoMiembrosEquipo = Boolean(evento.acceso_miembros_equipo);

        return (!filtroPublico || (filtroPublico === "si" && accesoPublico) || (filtroPublico === "no" && !accesoPublico)) &&
            (!filtroAmigos || (filtroAmigos === "si" && accesoAmigos) || (filtroAmigos === "no" && !accesoAmigos)) &&
            (!filtroMiembrosEquipo || (filtroMiembrosEquipo === "si" && accesoMiembrosEquipo) || (filtroMiembrosEquipo === "no" && !accesoMiembrosEquipo));
    });

    const resetearFiltros = () => {
        setFiltroPublico('');
        setFiltroAmigos('');
        setFiltroMiembrosEquipo('');
    };

    return (
        <ControladorLayout>
            <div className="flex">
                <div className="p-4">
                    <div className="mb-4">
                        <InputLabel>Acceso público</InputLabel>
                        <Select
                            value={filtroPublico}
                            onChange={(e) => setFiltroPublico(e.target.value)}
                            options={[
                                { value: "", label: "Todos" },
                                { value: "si", label: "Sí" },
                                { value: "no", label: "No" }
                            ]}
                            id="filtroPublico"
                        />
                    </div>
                    <div className="mb-4">
                        <InputLabel>Acceso amigos</InputLabel>
                        <Select
                            value={filtroAmigos}
                            onChange={(e) => setFiltroAmigos(e.target.value)}
                            options={[
                                { value: "", label: "Todos" },
                                { value: "si", label: "Sí" },
                                { value: "no", label: "No" }
                            ]}
                            id="filtroAmigos"
                        />
                    </div>
                    <div className="mb-4">
                        <InputLabel>Acceso miembros</InputLabel>
                        <Select
                            value={filtroMiembrosEquipo}
                            onChange={(e) => setFiltroMiembrosEquipo(e.target.value)}
                            options={[
                                { value: "", label: "Todos" },
                                { value: "si", label: "Sí" },
                                { value: "no", label: "No" }
                            ]}
                            id="filtroMiembrosEquipo"
                        />
                    </div>
                    <div className="mb-4">
                        <ButtonColores color="blue" onClick={resetearFiltros}>
                            Resetear Filtros
                        </ButtonColores>
                    </div>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {eventosFiltrados.map(evento => (
                            <div key={evento.id} className="bg-gray-900 overflow-hidden shadow-sm rounded-lg sm:rounded-lg w-full max-w-xs relative">
                                <div className="p-6 h-full">
                                    <h3 className="text-lg font-semibold text-white mb-2">{evento.titulo}</h3>
                                    <div className="flex items-center mb-4">
                                        <p className="text-sm text-gray-400">Creador:</p>
                                        <p className="text-sm text-white ml-2 m">{evento.creador.name}</p>
                                        <ImagenResponsive
                                            srcPC={evento.creador.foto_perfil_PC}
                                            srcTablet={evento.creador.foto_perfil_Tablet}
                                            srcMobile={evento.creador.foto_perfil_Movil}
                                            alt="Foto de perfil"
                                            className="h-8 w-8 rounded-full mr-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-400 mb-1">Descripción:</p>
                                        <p className="text-sm text-white">{evento.descripcion}</p>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <p className="text-sm text-gray-400">Acceso Público:</p>
                                        <p className="text-sm text-white ml-1">{evento.acceso_publico ? 'Sí' : 'No'}</p>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <p className="text-sm text-gray-400">Acceso Amigos:</p>
                                        <p className="text-sm text-white ml-1">{evento.acceso_amigos ? 'Sí' : 'No'}</p>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <p className="text-sm text-gray-400">Acceso Miembros Equipo:</p>
                                        <p className="text-sm text-white ml-1">{evento.acceso_miembros_equipo ? 'Sí' : 'No'}</p>
                                    </div>
                                    <div className="flex">
                                        <Link href={route('eventos.show', evento.id)}>
                                            <ButtonColores color="green">Mirar Evento</ButtonColores>
                                        </Link>
                                        {auth.user && auth.user.id === evento.creador_evento && (
                                            <Link href={route('eventos.edit', evento.id)}>
                                                <ButtonColores color="yellow">Editar</ButtonColores>
                                            </Link>
                                        )}
                                        {evento.usuarios.some(user => user.id === auth.user.id) ? (
                                            <ButtonColores color="red" onClick={() => handleAbandonar(evento.id)}>
                                                Abandonar
                                            </ButtonColores>
                                        ) : (
                                            <ButtonColores color="blue" onClick={() => handleUnirse(evento.id)}>
                                                Unirse
                                            </ButtonColores>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-left mt-4 mb-4">
                        <Link href={route('eventos.create')} className="inline-flex items-center px-4 py-2 bg-green-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 disabled:opacity-25 transition">
                            Añadir Nuevo Evento
                        </Link>
                    </div>
                </div>
            </div>
        </ControladorLayout>
    );
};

export default EventosIndex;
