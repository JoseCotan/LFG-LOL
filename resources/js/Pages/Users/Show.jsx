import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const UserShow = ({ user }) => {
    const { auth } = usePage().props;

    const handleAddFriend = () => {
        Inertia.post(route('amigos.enviar', user.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="container text-white">
                <h1>Perfil de Usuario</h1>
                <p>Nombre: {user.name}</p>
                <p>Email: {user.email}</p>
                {auth.user.id !== user.id && (
                    <button onClick={handleAddFriend} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Enviar Solicitud de Amistad
                    </button>
                )}
                <Link href="/">Volver al inicio</Link>
            </div>
        </AuthenticatedLayout>
    );
}

export default UserShow;
