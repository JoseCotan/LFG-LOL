import React, { useState, useEffect } from 'react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Button from '@/Components/Button';
import DangerButton from '@/Components/DangerButton';
import RiotData from '@/Components/RiotData';
import InputLabel from '@/Components/InputLabel';
import ImagenResponsive from '@/Components/ImagenResponsive';
import EnviarMensajeForm from '@/Components/EnviarMensajeForm';
import Comentario from '@/Components/Comentario';
import ListaComentarios from '@/Components/ListaComentarios';
import DesplegableComentarios from '@/Components/DesplegableComentarios';
import DesplegableAmigos from '@/Components/DesplegableAmigos';
import MensajeSuccess from '@/Components/MensajeSuccess';
import MensajeError from '@/Components/MensajeError';
import LikeButton from '@/Components/LikeButton';
import DislikeButton from '@/Components/DislikeButton';




const UserShow = ({ user, amistad, amigos, reputacion, comentarios, haComentado, haDadoLike, haDadoDislike, flash }) => {
    const { auth } = usePage().props;
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');


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

    const handleEliminarComentario = () => {
        const comentarioId = comentarios.find(comment => comment.user_id === auth.user.id).id;
        Inertia.delete(route('comentarios.eliminar', { comentarioId }));
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


    return (
        <ControladorLayout>
            <div className="relative flex flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-start">
                <div className="max-w-xs w-full bg-white rounded-lg shadow-md p-6 mt-6 mb-10 lg:ml-10">
                    <h1 className="text-2xl text-center text-blue-600 mb-4">Perfil de Usuario</h1>
                    <p className="text-lg text-center text-gray-800 mb-2">Nombre: {user.name}</p>
                    <p className="text-lg text-center text-gray-800 mb-2">Nick de invocador: {user.nombreLOL}</p>
                    <p className="text-lg text-center text-gray-800 mb-2">Reputación: {reputacion}</p>
                    {auth.user && auth.user.id !== user.id && (
                        <div className="flex justify-center mt-4">
                            <LikeButton liked={haDadoLike} onClick={handleLike}></LikeButton>
                            <DislikeButton disliked={haDadoDislike} onClick={handleDislike}></DislikeButton>
                        </div>
                    )}

                    {auth.user && auth.user.id !== user.id && (
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

                    {success && (
                        <MensajeSuccess message={success} onClose={() => setSuccess('')} />
                    )}
                    {error && (
                        <MensajeError message={error} onClose={() => setError('')} />
                    )}
                    {auth.user && auth.user.id !== user.id && (
                        <>
                            <div className="mt-4 flex justify-center">
                                <EnviarMensajeForm destinatarioId={user.id} />
                            </div>
                            {!haComentado && (
                                <div className="flex justify-center mb-4">
                                    <Comentario userId={user.id} />
                                </div>
                            )}
                        </>
                    )}

                    {haComentado && (
                        <div className="max-w-xs w-full flex justify-center mt-6 mb-6">
                            <div className="bg-gray-100 p-4 rounded shadow-md text-center">
                                <p className="text-gray-800 mb-2">{comentarios.find(comment => comment.user_id === auth.user.id).descripcion}</p>
                                <DangerButton onClick={handleEliminarComentario}>
                                    Eliminar Comentario
                                </DangerButton>
                            </div>
                        </div>
                    )}


                    <DesplegableAmigos amigos={amigos} user={user} />
                    <DesplegableComentarios comentarios={comentarios} />
                    {/*<p className="text-center mt-4 text-gray-800 mb-4 "><Link href="/dashboard" className="text-blue-600">Volver al inicio</Link></p>*/}
                </div>
                <div className="flex-grow flex justify-center items-center p-4 lg:justify-start lg:ml-56">
                    <RiotData />
                </div>
            </div>
        </ControladorLayout>
    );
};

export default UserShow;
