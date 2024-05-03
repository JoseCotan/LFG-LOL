import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Button from '@/Components/Button';
import DangerButton from '@/Components/DangerButton';

const UserShow = ({ user, amistad }) => {
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="container text-white">
                <h1>Perfil de Usuario</h1>
                <p>Nombre: {user.name}</p>
                <p>Email: {user.email}</p>
                {auth.user.id !== user.id && (
                    !amistad ? (
                        <Button onClick={handleAnyadirAmigo}>Enviar Solicitud de Amistad</Button>
                    ) : amistad.estado === 'pendiente' && amistad.usuario_id === auth.user.id ? (
                        <DangerButton onClick={handleCancelarSolicitud}>Cancelar Solicitud</DangerButton>
                    ) : amistad.estado === 'pendiente' && amistad.amigo_id === auth.user.id ? (
                        <>
                            <Button onClick={handleAceptarSolicitud}>Aceptar Solicitud</Button>
                            <DangerButton onClick={handleRechazarSolicitud}>Rechazar Solicitud</DangerButton>
                        </>
                    ) : null
                )}
                <Link href="/">Volver al inicio</Link>
            </div>
        </AuthenticatedLayout>
    );

};

export default UserShow;
