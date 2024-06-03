import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import ButtonColores from '@/Components/ButtonColores';
import ImagenResponsive from '@/Components/ImagenResponsive';

const EquiposIndex = () => {
    const { equipos, auth } = usePage().props;

    const handleDelete = (id) => {
        Inertia.delete(route('equipos.destroy', id));
    };

    return (
        <ControladorLayout>
            <div className="py-12 max-w-8xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 ml-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {equipos.map((equipo) => (
                        <div key={equipo.id} className="bg-gray-900 overflow-hidden shadow-sm rounded-lg sm:rounded-lg max-w-md">
                            <div className="p-6 h-full">
                                <h3 className="text-lg font-semibold text-white mb-2">{equipo.nombre_equipo}</h3>
                                <div className="flex items-center mb-2">
                                    <ImagenResponsive
                                        srcPC={equipo.lider.foto_perfil_PC}
                                        srcTablet={equipo.lider.foto_perfil_Tablet}
                                        srcMobile={equipo.lider.foto_perfil_Movil}
                                        alt="Foto de perfil"
                                        className="h-8 w-8 rounded-full mr-2"
                                    />
                                    <p className="text-sm text-white">{equipo.lider.name}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-400 mb-1">Modo de Juego:</p>
                                    <p className="text-sm text-white">{equipo.modo.nombre}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <p className="text-sm text-gray-400">Privacidad:</p>
                                    <p className="text-sm text-white ml-1">{equipo.privado ? 'Privado' : 'Público'}</p>
                                    <img
                                        src={`/images/${equipo.privado ? 'lock-solid.svg' : 'unlock-solid.svg'}`}
                                        alt="Candado"
                                        className="h-4 w-4 ml-2"
                                    />
                                </div>
                                <div className="flex">
                                    <Link href={route('equipos.show', equipo.id)}>
                                        <ButtonColores color="green">Mirar Equipo</ButtonColores>
                                    </Link>
                                    {auth.user && auth.user.id === equipo.lider.id && (
                                        <>
                                            <Link href={route('equipos.edit', equipo.id)}>
                                                <ButtonColores color="yellow">Editar</ButtonColores>
                                            </Link>
                                            <ButtonColores color="red" onClick={() => handleDelete(equipo.id)}>Eliminar</ButtonColores>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    <Link href={route('equipos.create')} className="inline-flex items-center px-4 py-2 bg-green-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-600 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 disabled:opacity-25 transition">
                        Añadir Nuevo Equipo
                    </Link>
                </div>
            </div>
        </ControladorLayout>
    );
};

export default EquiposIndex;
