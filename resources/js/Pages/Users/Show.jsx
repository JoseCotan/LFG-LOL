import React, { useState, useEffect } from 'react'; ////////////////////////
import ControladorLayout from '@/Layouts/ControladorLayout';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import RiotData from '@/Components/RiotData';
import EnviarMensajeForm from '@/Components/EnviarMensajeForm';
import Comentario from '@/Components/Comentario';
import DesplegableComentarios from '@/Components/DesplegableComentarios';
import DesplegableAmigos from '@/Components/DesplegableAmigos';
import MensajeSuccess from '@/Components/MensajeSuccess';
import MensajeError from '@/Components/MensajeError';
import LikeButton from '@/Components/LikeButton';
import DislikeButton from '@/Components/DislikeButton';
import ButtonColores from '@/Components/ButtonColores';


const UserShow = ({ user, amistad, amigos, reputacion, comentarios, haComentado, haDadoLike, haDadoDislike, flash, totalComentarios, paginacion }) => {
    const { auth } = usePage().props;
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [listaComentarios, setListaComentarios] = useState(comentarios.data);

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

    const handleEliminarComentario = (comentarioId) => {
        const comentariosActualizados = listaComentarios.filter(comment => comment.id !== comentarioId);
        setListaComentarios(comentariosActualizados);
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
                    <p className="text-2xl text-center text-blue-700 mb-2">¡Valora al usuario!</p>
                    {auth.user && auth.user.id !== user.id && (
                        <div className="flex justify-center mt-4">
                            <LikeButton liked={haDadoLike} onClick={handleLike}></LikeButton>
                            <DislikeButton disliked={haDadoDislike} onClick={handleDislike}></DislikeButton>
                        </div>
                    )}

                    {auth.user && auth.user.id !== user.id && (
                        !amistad ? (
                            <div className="mt-4 flex justify-center">
                                <ButtonColores color="blue" onClick={handleAnyadirAmigo}>Enviar Solicitud de Amistad</ButtonColores>
                            </div>
                        ) : amistad.estado === 'aceptado' ? (
                            <div className="mt-4 flex justify-center">
                                <ButtonColores color="red" onClick={handleEliminarAmigo}>Eliminar Amigo</ButtonColores>
                            </div>
                        ) : amistad.estado === 'pendiente' && amistad.amigo_id === auth.user.id ? (
                            <div className="mt-4 flex justify-center">
                                <ButtonColores color="blue" onClick={handleAceptarSolicitud}>Aceptar Solicitud</ButtonColores>
                                <ButtonColores color="red" onClick={handleRechazarSolicitud}>Rechazar Solicitud</ButtonColores>
                            </div>
                        ) : amistad.estado === 'pendiente' && amistad.usuario_id === auth.user.id ? (
                            <div className="mt-4 flex justify-center">
                                <ButtonColores color="red" onClick={handleCancelarSolicitud}>Cancelar Solicitud</ButtonColores>
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
                            <div className="mt-4 mb-4 flex justify-center">
                                <EnviarMensajeForm destinatarioId={user.id} />
                            </div>
                            {!haComentado && (
                                <div className="flex justify-center mb-4">
                                    <Comentario userId={user.id} />
                                </div>
                            )}
                        </>
                    )}

                    <DesplegableAmigos
                        amigos={amigos}
                        user={user}
                        paginacion={amigos.links}/>
                    <DesplegableComentarios
                        comentarios={comentarios.data}
                        totalComentarios={totalComentarios}
                        paginacion={comentarios.links}
                        haComentado={haComentado}
                        authUser={auth.user}
                        handleEliminarComentario={handleEliminarComentario}
                    />
                </div>
                <div className="flex-grow flex justify-center items-center p-4 lg:justify-start lg:ml-56">
                    <RiotData />
                </div>
            </div>
        </ControladorLayout>
    );
};

export default UserShow;
