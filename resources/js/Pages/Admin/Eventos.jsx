import React from 'react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminIndex from './Index';
import ButtonColores from '@/Components/ButtonColores';

const Eventos = ({ eventos, panelAdmin = true }) => {
    const handleDelete = (id) => {
        Inertia.delete(route('eventos.destroy', id), {
            data: { panelAdmin }
        });
    };
    return (
        <AdminIndex>
            <h2 className="text-2xl mb-4">Eventos</h2>
            <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-900 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Creador del evento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Título del evento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                    {eventos.map((evento) => (
                        <tr key={evento.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{evento.creador.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{evento.titulo}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link href={route('eventos.edit', evento.id)} className="text-green-500 hover:text-green-200">
                                    <ButtonColores color="green">
                                        Editar
                                    </ButtonColores>
                                </Link>
                                <ButtonColores color="red" onClick={() => handleDelete(evento.id)}>
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

export default Eventos;
