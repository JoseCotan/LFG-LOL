import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import ButtonColores from '@/Components/ButtonColores';
import ImagenResponsive from '@/Components/ImagenResponsive';
import MensajeSuccess from '@/Components/MensajeSuccess';
import MensajeError from '@/Components/MensajeError';

const EventoShow = () => {
    const { evento, auth, flash } = usePage().props;
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const esMiembro = evento.usuarios.some(user => user.id === auth.user?.id) || false;

    useEffect(() => {
        if (flash && flash.type === 'success') {
            setSuccess(flash.message);
            setError('');
        } else if (flash && flash.type === 'error') {
            setError(flash.message);
            setSuccess('');
        }
    }, [flash]);

    const handleUnirseEvento = () => {
        Inertia.post(route('eventos.unirse', evento.id));
    };

    const handleAbandonarEvento = () => {
        Inertia.post(route('eventos.abandonar', evento.id));
    };

    const handleDelete = (id) => {
        Inertia.delete(route('eventos.destroy', id));
    };

    return (
        <ControladorLayout>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8 ml-4 mr-4 mb-4">
                {success && (
                    <MensajeSuccess message={success} onClose={() => setSuccess('')} />
                )}
                {error && (
                    <MensajeError message={error} onClose={() => setError('')} />
                )}
                <div className="bg-gray-900 overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-xl font-medium text-white mb-4">{evento.titulo}</h3>
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-300">Creador:</h4>
                        <div className="flex items-center">
                            <ImagenResponsive
                                srcPC={evento.creador.foto_perfil_PC}
                                srcTablet={evento.creador.foto_perfil_Tablet}
                                srcMobile={evento.creador.foto_perfil_Movil}
                                alt={evento.creador.name}
                                className="h-12 w-12 rounded-full mr-2"
                            />
                            <p className="text-sm text-white">{evento.creador.name}</p>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-300">Descripción:</h4>
                        <p className="text-sm text-white">{evento.descripcion}</p>
                    </div>
                    <hr className="my-4" />
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-300">Acceso:</h4>
                        <p className="text-sm text-white">
                            Público: {evento.acceso_publico ? 'Sí' : 'No'}<br />
                            Amigos: {evento.acceso_amigos ? 'Sí' : 'No'}<br />
                            Miembros del equipo: {evento.acceso_miembros_equipo ? 'Sí' : 'No'}
                        </p>
                    </div>
                    <hr className="my-4" />
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-300">Usuarios:</h4>
                        {evento.usuarios?.map((usuario, index) => (
                            <div key={usuario.id} className="flex items-center mb-2">
                                <ImagenResponsive
                                    srcPC={usuario.foto_perfil_PC}
                                    srcTablet={usuario.foto_perfil_Tablet}
                                    srcMobile={usuario.foto_perfil_Movil}
                                    alt={usuario.name}
                                    className="h-12 w-12 rounded-full mr-2"
                                />
                                <p className="text-sm text-white">{usuario.name}</p>
                                {auth.user && evento.creador && evento.creador.id === auth.user.id && (
                                    <ButtonColores color="red" onClick={() => handleAbandonarEvento(usuario.id)} className="ml-4">
                                        Expulsar
                                    </ButtonColores>
                                )}
                            </div>
                        ))}
                    </div>
                    <hr className="my-4" />
                    {!esMiembro && (
                        <ButtonColores color="blue" onClick={handleUnirseEvento}>
                            Unirse al Evento
                        </ButtonColores>
                    )}
                    {esMiembro && (
                        <ButtonColores color="red" onClick={handleAbandonarEvento}>
                            Abandonar Evento
                        </ButtonColores>
                    )}
                    {auth.user?.id === evento.creador.id && (
                        <div className="flex mt-4">
                            <Link href={route('eventos.edit', evento.id)}>
                                <ButtonColores color="yellow">
                                    Editar
                                </ButtonColores>
                            </Link>
                            <ButtonColores color="red" onClick={() => handleDelete(evento.id)}>
                                Eliminar
                            </ButtonColores>
                        </div>
                    )}
                    <div className="flex mt-4">
                        <Link href={route('eventos.index')}>
                            <ButtonColores color="blue">
                                Volver
                            </ButtonColores>
                        </Link>
                    </div>
                </div>
            </div>
        </ControladorLayout>
    );
};

export default EventoShow;
