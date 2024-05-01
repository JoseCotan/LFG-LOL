import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DangerButton from '@/Components/DangerButton';
import ImagenResponsive from '@/Components/ImagenResponsive';


const RangosIndex = () => {
    const { rangos, auth } = usePage().props;

    const handleDelete = (id) => {
        Inertia.delete(route('rangos.destroy', id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Imagen</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rango</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Editar</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                                {rangos.map(rango => (
                                    <tr key={rango.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <ImagenResponsive
                                                srcPC={rango.imagenPC}
                                                srcTablet={rango.imagenTablet}
                                                srcMobile={rango.imagenMovil}
                                                alt="Imagen del rango"
                                                className="h-16 w-16"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">{rango.nombre}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link href={route('rangos.edit', rango.id)} className="text-green-500 hover:text-green-200">Editar</Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <DangerButton onClick={() => handleDelete(rango.id)} className="text-red-600 hover:text-red-400">Eliminar</DangerButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-4 mb-4">
                            <Link href={route('rangos.create')} className="inline-flex items-center px-4 py-2 bg-green-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 disabled:opacity-25 transition">
                                Añadir Nuevo Rango
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default RangosIndex;
