import React, { useState, useEffect } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import ButtonColores from '@/Components/ButtonColores';
import FiltroEvento from '@/Components/FiltroEvento';
import ImagenResponsive from '@/Components/ImagenResponsive';
import MensajeError from '@/Components/MensajeError';
import MensajeSuccess from '@/Components/MensajeSuccess';

const EventosIndex = () => {
    const { eventos, auth, flash, filtros } = usePage().props;
    const { data, setData, get } = useForm({
        publico: filtros.publico || '',
        amigos: filtros.amigos || '',
        miembros_equipo: filtros.miembros_equipo || '',
    });

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (flash && flash.type === 'success') {
            setSuccess(flash.message);
            setError('');
        } else if (flash && flash.type === 'error') {
            setError(flash.message);
            setSuccess('');
        }
    }, [flash]);

    const aplicarFiltros = () => {
        get(route('eventos.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setData({
            publico: '',
            amigos: '',
            miembros_equipo: '',
        });
    };

    useEffect(() => {
        if (data.publico || data.amigos || data.miembros_equipo) {
            aplicarFiltros();
        }
    }, [data]);

    return (
        <ControladorLayout>
            <div className="flex flex-col sm:flex-row">
                <div className="p-4 2xl:w-96 xl:w-96 lg:w-96 md:w-96 sm:w-96">
                    <FiltroEvento
                        onFiltrar={(publico, amigos, miembros_equipo) => {
                            setData({ publico, amigos, miembros_equipo });
                        }}
                        onReset={resetFilters}
                    />
                </div>

                <div className="w-full lg:w-3/4 p-4">
                    <div className="ml-4 mb-4">
                        {success && (
                            <MensajeSuccess message={success} onClose={() => setSuccess('')} />
                        )}
                        {error && (
                            <MensajeError message={error} onClose={() => setError('')} />
                        )}
                    </div>
                    <div className="flex justify-center sm:justify-start mb-4 ml-2">
                        <Link href={route('eventos.create')}>
                            <ButtonColores color="blue">
                                Añadir Nuevo Evento
                            </ButtonColores>
                        </Link>
                    </div>
                    <div className="flex gap-4 flex-wrap justify-center sm:justify-start ml-4">
                        {eventos.data.map(evento => (
                            <div key={evento.id} className="bg-gray-900 overflow-hidden shadow-sm rounded-lg sm:rounded-lg w-full max-w-sm relative mb-4">
                                <div className="p-6">
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
                                        {auth.user && (auth.user.id === evento.creador_evento || auth.user.admin) && (
                                            <Link href={route('eventos.edit', evento.id)}>
                                                <ButtonColores color="yellow">Editar</ButtonColores>
                                            </Link>
                                        )}
                                        {evento.usuarios.some(user => user.id === auth.user?.id) ? (
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
                    <div className="flex justify-center space-x-1 mt-4">
                        {eventos.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                preserveScroll
                                preserveState
                                className={`px-4 py-2 ${link.active ? 'text-blue-500' : 'text-gray-500'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </ControladorLayout>
    );
};

export default EventosIndex;
