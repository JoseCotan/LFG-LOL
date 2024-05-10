import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';

const PublicacionesIndex = () => {
    const { publicaciones, auth } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <Link href={route('publicaciones.create')} className="btn btn-primary">
                            Crear Publicación
                        </Link>
                        <div className="mt-6">
                            {publicaciones.map((publicacion) => (
                                <div key={publicacion.id} className="mt-4">
                                    <h2 className="text-lg font-bold">{publicacion.titulo}</h2>
                                    <p>{publicacion.descripcion}</p>
                                    <div>Horario: {publicacion.hora_preferente_inicio} - {publicacion.hora_preferente_final}</div>
                                    <div>Modo: {publicacion.modo}</div>
                                    <div>Rol: {publicacion.rol}</div>
                                    <div>Rango: {publicacion.rango}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default PublicacionesIndex;
