import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Button from '@/Components/Button';
import DangerButton from '@/Components/DangerButton';
import RiotData from '@/Components/RiotData';
import ImagenResponsive from '@/Components/ImagenResponsive';
import EnviarMensajeForm from '@/Components/EnviarMensajeForm';

const UserShow = ({ user, amistad, amigos, reputacion }) => {
    const { auth } = usePage().props;

    const handleAnyadirAmigo = () => {
        Inertia.post(route('amigos.enviar', { amistadId: user.id }));
    };

    const handleAceptarSolicitud = () => {
        Inertia.patch(route('amigos.aceptar', { amistadId: amistad.id }));
    };

    const handleCancelarSolicitud = () => {
        Inertia.delete(route('amigos.cancelar', { amistadId: amistad.id }));
    };

    const handleRechazarSolicitud = () => {
        Inertia.patch(route('amigos.rechazar', { amistadId: amistad.id }));
    };

    const handleEliminarAmigo = () => {
        Inertia.delete(route('amigos.eliminar', { amistadId: amistad.id }));
    };

    const handleLike = () => {
        Inertia.post(route('users.like', { id: user.id }));
    };

    const handleDislike = () => {
        Inertia.post(route('users.dislike', { id: user.id }));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="relative flex flex-col items-start justify-start lg:flex-row">
                <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md p-6 mt-6 mb-10">
                    <h1 className="text-2xl text-center text-blue-600 mb-4">Perfil de Usuario</h1>
                    <p className="text-lg text-center text-gray-800 mb-2">Nombre: {user.name}</p>
                    <p className="text-lg text-center text-gray-800 mb-2">Nick de invocador: {user.nombreLOL}</p>
                    <p className="text-lg text-center text-gray-800 mb-2">Reputación: {reputacion}</p>
                    {auth.user.id !== user.id && (
                        <div className="flex justify-center mt-4">
                            <Button onClick={handleLike} className="mr-2 bg-green-500 hover:bg-green-600 text-white">Like</Button>
                            <DangerButton onClick={handleDislike} className="bg-red-500 hover:bg-red-600 text-white">Dislike</DangerButton>
                        </div>
                    )}
                    <div className="mt-4 grid gap-4 grid-cols-3">
                        {amigos.map(amigo => (
                            <div key={amigo.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                                <ImagenResponsive
                                    srcPC={amigo.usuario_id === user.id ? amigo.amigo_agregado.foto_perfil_Tablet : amigo.amigo_agregador.foto_perfil_Tablet}
                                    srcTablet={amigo.usuario_id === user.id ? amigo.amigo_agregado.foto_perfil_Tablet : amigo.amigo_agregador.foto_perfil_Tablet}
                                    srcMobile={amigo.usuario_id === user.id ? amigo.amigo_agregado.foto_perfil_Movil : amigo.amigo_agregador.foto_perfil_Movil}
                                    alt="Foto de perfil"
                                    className="h-20 w-20 rounded-full mb-2"
                                />
                                <span className="text-gray-800 text-center overflow-hidden overflow-ellipsis max-w-full">
                                    {amigo.usuario_id === user.id ? amigo.amigo_agregado.name : amigo.amigo_agregador.name}
                                </span>
                            </div>
                        ))}
                    </div>
                    {auth.user.id !== user.id && (
                        !amistad ? (
                            <div className="mt-4 flex justify-center">
                                <Button onClick={handleAnyadirAmigo} className="bg-blue-500 hover:bg-blue-600 text-white">Enviar Solicitud de Amistad</Button>
                            </div>
                        ) : amistad.estado === 'aceptado' ? (
                            <div className="mt-4 flex justify-center">
                                <DangerButton onClick={handleEliminarAmigo} className="bg-red-500 hover:bg-red-600 text-white">Eliminar Amigo</DangerButton>
                            </div>
                        ) : amistad.estado === 'pendiente' && amistad.amigo_id === auth.user.id ? (
                            <div className="mt-4 flex justify-center">
                                <Button onClick={handleAceptarSolicitud} className="mr-2 bg-green-500 hover:bg-green-600 text-white">Aceptar Solicitud</Button>
                                <DangerButton onClick={handleRechazarSolicitud} className="bg-red-500 hover:bg-red-600 text-white">Rechazar Solicitud</DangerButton>
                            </div>
                        ) : amistad.estado === 'pendiente' && amistad.usuario_id === auth.user.id ? (
                            <div className="mt-4 flex justify-center">
                                <DangerButton onClick={handleCancelarSolicitud} className="bg-gray-500 hover:bg-gray-600 text-white">Cancelar Solicitud</DangerButton>
                            </div>
                        ) : null
                    )}
                    {auth.user.id !== user.id && (
                        <div className="mt-4 flex justify-center">
                            <EnviarMensajeForm destinatarioId={user.id} />
                        </div>
                    )}
                    <p className="text-center mt-4 text-gray-800"><Link href="/dashboard" className="text-blue-600">Volver al inicio</Link></p>
                </div>

                <div className="flex-grow flex justify-center lg:justify-center items-center p-4 lg:ml-56">
                    <RiotData />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserShow;
