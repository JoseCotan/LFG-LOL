import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DangerButton from '@/Components/DangerButton';
import ImagenResponsive from '@/Components/ImagenResponsive';
import ButtonColores from '@/Components/ButtonColores';


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
                                    <th className="px-6 py-3 text-left text-xs
                                    font-medium text-white uppercase tracking-wider">
                                        Imagen
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs
                                    font-medium text-white uppercase tracking-wider">
                                        Rango
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs
                                    font-medium text-white uppercase tracking-wider">
                                        Editar
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs
                                    font-medium text-white uppercase tracking-wider">
                                        Eliminar
                                    </th>
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
                                            <Link href={route('rangos.edit', rango.id)}>
                                                <ButtonColores color="green">
                                                    Editar
                                                </ButtonColores>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <ButtonColores color="red" onClick={() => handleDelete(rango.id)}>
                                                Eliminar
                                            </ButtonColores>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-4 mb-4">
                            <Link href={route('rangos.create')}>
                                <ButtonColores color="green">
                                    Añadir Nuevo Rango
                                </ButtonColores>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default RangosIndex;
