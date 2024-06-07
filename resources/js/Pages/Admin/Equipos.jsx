import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminIndex from './Index';
import ButtonColores from '@/Components/ButtonColores';

const Equipos = ({ equipos }) => {
    const handleDelete = (id) => {
        Inertia.delete(route('equipos.destroy', id));
    };

    return (
        <AdminIndex>
            <h2 className="text-2xl mb-4">Equipos</h2>
            <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-900 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Líder del equipo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre del equipo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                    {equipos.map((equipo) => (
                        <tr key={equipo.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{equipo.lider.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{equipo.nombre_equipo}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link href={route('equipos.edit', equipo.id)} className="text-green-500 hover:text-green-200">
                                    <ButtonColores color="green">
                                        Editar
                                    </ButtonColores>
                                </Link>
                                <ButtonColores color="red" onClick={() => handleDelete(equipo.id)}>
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

export default Equipos;
