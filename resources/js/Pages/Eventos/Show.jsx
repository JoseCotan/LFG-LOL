import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import ButtonColores from '@/Components/ButtonColores';
import ImagenResponsive from '@/Components/ImagenResponsive';
import MensajeSuccess from '@/Components/MensajeSuccess';
import MensajeError from '@/Components/MensajeError';
import '../../../css/Spiegel.css';
import DesplegableComentariosEvento from '@/Components/DesplegableComentariosEvento';
import ComentarioEvento from '@/Components/ComentarioEvento';

const EventoShow = () => {
    const { evento, auth, flash, comentarios, totalComentarios } = usePage().props;
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

    const handleExpulsarMiembro = (miembroId) => {
        Inertia.post(route('eventos.expulsarMiembro', { eventoId: evento.id, miembroId }));
    };

    const handleEliminarComentario = (comentarioId) => {
        Inertia.delete(route('comentarios.eliminar', { comentarioId }), {
            onSuccess: () => {
                setSuccess('Comentario eliminado correctamente.');
            },
            onError: () => {
                setError('No se pudo eliminar el comentario.');
            },
        });
    };

    return (
        <ControladorLayout>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8 mb-4">
                <div className="bg-sky-950 ml-2 mr-2 shadow-lg rounded-xl p-6 space-y-6" style={{ fontFamily: 'Spiegel' }}>
                    {success && (
                        <MensajeSuccess message={success} onClose={() => setSuccess('')} />
                    )}
                    {error && (
                        <MensajeError message={error} onClose={() => setError('')} />
                    )}

                    <div className="bg-gradient-to-r from-gray-100 p-4 rounded-xl shadow-sm">
                        <h3 className="text-4xl font-semibold text-gray-800 mb-2">{evento.titulo}</h3>
                        <div className="flex items-center space-x-4">
                            <ImagenResponsive
                                srcPC={evento.creador.foto_perfil_PC}
                                srcTablet={evento.creador.foto_perfil_Tablet}
                                srcMobile={evento.creador.foto_perfil_Movil}
                                alt={evento.creador.name}
                                className="h-12 w-12 rounded-full"
                            />
                            <div>
                                <h4 className="text-xl font-semibold text-black">Creador:</h4>
                                <p className="text-lg text-gray-900">{evento.creador.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-100 p-4 rounded-xl shadow-sm">
                        <h4 className="text-xl font-semibold text-black">Descripción:</h4>
                        <p className="text-lg text-gray-900">{evento.descripcion}</p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-100 p-4 rounded-xl shadow-sm">
                        <div className="flex items-center space-x-2">
                            <h4 className="text-xl font-semibold text-black">Acceso:</h4>
                            <p className="text-lg text-gray-900">
                                Público: {evento.acceso_publico ? 'Sí' : 'No'}<br />
                                Amigos: {evento.acceso_amigos ? 'Sí' : 'No'}<br />
                                Miembros del equipo: {evento.acceso_miembros_equipo ? 'Sí' : 'No'}
                            </p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-100 p-4 rounded-xl shadow-sm">
                        <h4 className="text-xl font-semibold text-black">Usuarios:</h4>
                        {evento.usuarios?.map((usuario, index) => (
                            <div key={usuario.id} className="flex items-center space-x-4">
                                <ImagenResponsive
                                    srcPC={usuario.foto_perfil_PC}
                                    srcTablet={usuario.foto_perfil_Tablet}
                                    srcMobile={usuario.foto_perfil_Movil}
                                    alt={usuario.name}
                                    className="h-12 w-12 rounded-full"
                                />
                                <div>
                                    <h4 className="text-xl font-semibold text-black">Miembro {index + 1}:</h4>
                                    <p className="text-lg text-gray-900">{usuario.name}</p>
                                </div>
                                {(auth.user?.id === evento.creador.id || auth.user?.admin) && (
                                    <ButtonColores color="blue" onClick={() => handleExpulsarMiembro(usuario.id)}>
                                        Expulsar
                                    </ButtonColores>
                                )}
                            </div>
                        ))}
                    </div>
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
                    {(auth.user?.id === evento.creador.id || auth.user?.admin) && (
                        <div className="flex mt-4 space-x-4">
                            <Link href={route('eventos.edit', evento.id)}>
                                <ButtonColores color="yellow">
                                    Editar
                                </ButtonColores>
                            </Link>
                            <ButtonColores color="red" onClick={() => handleDelete(evento.id)}>
                                Eliminar evento
                            </ButtonColores>
                        </div>
                    )}
                    <div className="bg-white p-4 rounded-xl shadow-lg">
                        {auth.user && <ComentarioEvento eventoId={evento.id} />}
                        <div className="mt-4">
                            <DesplegableComentariosEvento
                                comentarios={comentarios.data}
                                totalComentarios={totalComentarios}
                                paginacion={comentarios.links}
                                handleEliminarComentario={handleEliminarComentario}
                                auth={auth}
                                evento={evento}
                            />
                        </div>
                    </div>

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
