import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';

const UserShow = ({ user }) => {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
        user={auth.user}
    >
        <div className="container text-white">
            <h1>Perfil de Usuario</h1>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            <Link href="/">Volver al inicio</Link>
        </div>
        </AuthenticatedLayout>
    );
}

export default UserShow;
