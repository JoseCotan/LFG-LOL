import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminIndex from './Index';
import ButtonColores from '@/Components/ButtonColores';

const Publicaciones = ({ publicaciones }) => {
    const handleDelete = (id) => {
        Inertia.delete(route('publicaciones.destroy', id));
    };

    return (
        <AdminIndex>
            <h2 className="text-2xl mb-4">Publicaciones</h2>
            <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-900 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Título</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Usuario</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                    {publicaciones.map((publicacion) => (
                        <tr key={publicacion.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{publicacion.titulo}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{publicacion.usuario.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link href={route('publicaciones.edit', publicacion.id)} className="text-green-500 hover:text-green-200">
                                    <ButtonColores color="green">
                                        Editar
                                    </ButtonColores>
                                </Link>
                                <ButtonColores color="red" onClick={() => handleDelete(publicacion.id)}>
                                    Eliminar
                                </ButtonColores>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminIndex>
    );
};

export default Publicaciones;
