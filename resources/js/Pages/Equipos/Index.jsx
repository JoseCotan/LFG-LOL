import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DangerButton from '@/Components/DangerButton';

const EquiposIndex = () => {
    const { equipos, auth, esLider } = usePage().props;

    const handleDelete = (id) => {
        Inertia.delete(route('equipos.destroy', id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Nombre del Equipo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Líder
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Modo de Juego
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Privacidad
                                    </th>
                                    {esLider && (
                                    <>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Editar
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Eliminar
                                        </th>
                                    </>
                                )}
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                                {equipos.map((equipo) => (
                                    <tr key={equipo.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href={route('equipos.show', { id: equipo.id })} className="text-sm text-white hover:text-blue-300">
                                                {equipo.nombre_equipo}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">{equipo.lider.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">{equipo.modo.nombre}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">{equipo.privado ? 'Privado' : 'Público'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {auth.user.id === equipo.lider.id && (
                                                <Link href={route('equipos.edit', equipo.id)} className="text-indigo-600 hover:text-indigo-900">
                                                    Editar
                                                </Link>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {auth.user.id === equipo.lider.id && (
                                                <DangerButton onClick={() => handleDelete(equipo.id)} className="text-red-600 hover:text-red-400">
                                                    Eliminar
                                                </DangerButton>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-4 mb-4">
                            <Link href={route('equipos.create')} className="inline-flex items-center px-4 py-2 bg-green-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 disabled:opacity-25 transition">
                                Añadir Nuevo Equipo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EquiposIndex;
