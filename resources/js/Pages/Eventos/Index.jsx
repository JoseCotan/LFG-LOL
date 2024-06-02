import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

const EventosIndex = () => {
    const { eventos, auth } = usePage().props;

    const handleDelete = (id) => {
        Inertia.delete(route('eventos.destroy', id));
    };

    const handleUnirse = (eventoId) => {
        Inertia.post(route('eventos.unirse', eventoId));
    };

    const handleAbandonar = (eventoId) => {
        Inertia.post(route('eventos.abandonar', eventoId));
    };

    return (
        <ControladorLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Título del Evento
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Descripción
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Acceso Público
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Acceso Amigos
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Acceso Miembros del Equipo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Creador del Evento
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Editar
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Eliminar
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Unirse/Abandonar
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                                {eventos.map((evento) => (
                                    <tr key={evento.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href={route('eventos.show', { id: evento.id })} className="text-sm text-white hover:text-blue-300">
                                                {evento.titulo}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">{evento.descripcion}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">{evento.acceso_publico ? 'Sí' : 'No'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">{evento.acceso_amigos ? 'Sí' : 'No'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">{evento.acceso_miembros_equipo ? 'Sí' : 'No'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">{evento.creador.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {auth.user.id === evento.creador_evento && (
                                                <Link href={route('eventos.edit', evento.id)} className="text-indigo-600 hover:text-indigo-900">
                                                    Editar
                                                </Link>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {auth.user.id === evento.creador_evento && (
                                                <DangerButton onClick={() => handleDelete(evento.id)}>
                                                    Eliminar
                                                </DangerButton>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {evento.usuarios.some(user => user.id === auth.user.id) ? (
                                                <DangerButton onClick={() => handleAbandonar(evento.id)}>
                                                    Abandonar
                                                </DangerButton>
                                            ) : (
                                                <PrimaryButton onClick={() => handleUnirse(evento.id)}>
                                                    Unirse
                                                </PrimaryButton>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-4 mb-4">
                            <Link href={route('eventos.create')} className="inline-flex items-center px-4 py-2 bg-green-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 disabled:opacity-25 transition">
                                Añadir Nuevo Evento
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ControladorLayout>
    );
};

export default EventosIndex;
