import React from 'react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminIndex from './Index';
import ButtonColores from '@/Components/ButtonColores';

const Usuarios = ({ usuarios, panelAdmin = true }) => {
    const handleDelete = (id, usuarioNombre) => {
        if (confirm(`¿Estás seguro de que deseas eliminar el usuario "${usuarioNombre}"? Esta acción no se puede deshacer.`)) {
            Inertia.delete(route('usuarios.destroy', id), {
                data: { panelAdmin }
            });
        }
    };

    return (
        <AdminIndex>
            <h2 className="text-2xl mb-4">Usuarios</h2>
            <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-900 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Correo Electrónico</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{usuario.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{usuario.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">

                                <ButtonColores color="red" onClick={() => handleDelete(usuario.id, usuario.name)}>
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

export default Usuarios;
