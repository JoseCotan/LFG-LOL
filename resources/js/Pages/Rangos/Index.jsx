import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';

const RangosIndex = () => {
    const { rangos } = usePage().props;

    const handleDelete = (id) => {
        Inertia.delete(route('rangos.destroy', id));
    };

    return (
        <div className="relative overflow-x-auto w-full sm:w-5/6 mt-6 mx-auto shadow-md sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-900 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Imagen</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rango</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Editar rango</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Borrar rango</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 text-white divide-y divide-gray-200">
                    {rangos.map(rango => (
                        <tr key={rango.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <picture>
                                    <source srcSet={rango.imagenPC} media="(min-width: 1200px)" />
                                    <source srcSet={rango.imagenTablet} media="(min-width: 768px)" />
                                    <source srcSet={rango.imagenMovil} media="(max-width: 768px)" />
                                    <img src={rango.imagenPC} alt="Imagen del rango" className="h-16 w-16" />
                                </picture>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-white">{rango.nombre}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link href={route('rangos.edit', rango.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">Editar</Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <DangerButton onClick={() => handleDelete(rango.id)}>Eliminar</DangerButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4 mb-4">
                <Link href={route('rangos.create')} className="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                    Añadir Nuevo Rango
                </Link>
            </div>
        </div>
    );
};

export default RangosIndex;
