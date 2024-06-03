import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import DangerButton from '@/Components/DangerButton';
import ImagenResponsive from '@/Components/ImagenResponsive';
import Button from '@/Components/Button';

const EquipoShow = () => {
    const { equipo, auth } = usePage().props;

    const handleExpulsarMiembro = (miembroId) => {
        Inertia.post(route('equipos.expulsarMiembro', { equipoId: equipo.id, miembroId }));
    };

    const handleAbandonarEquipo = () => {
        Inertia.post(route('equipos.abandonarEquipo', equipo.id));
    };

    return (
        <ControladorLayout>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8">
                <div className="bg-gray-900 overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-xl font-medium text-white mb-4">{equipo.nombre_equipo}</h3>
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-300">Líder:</h4>
                        <div className="flex items-center">
                            <ImagenResponsive
                                srcPC={equipo.lider.foto_perfil_PC}
                                srcTablet={equipo.lider.foto_perfil_Tablet}
                                srcMobile={equipo.lider.foto_perfil_Movil}
                                alt={equipo.lider.name}
                                className="h-12 w-12 rounded-full mr-2"
                            />
                            <p className="text-sm text-white">{equipo.lider.name}</p>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-300">Modo de Juego:</h4>
                        <p className="text-sm text-white">{equipo.modo.nombre}</p>
                    </div>
                    <hr className="my-4" />
                    <div className="mb-4 flex items-center">
                        <h4 className="text-sm font-semibold text-gray-300 mr-2">Privacidad:</h4>
                        <p className="text-sm text-white">{equipo.privado ? 'Privado' : 'Público'}</p>
                        <img
                            src={`/images/${equipo.privado ? 'lock-solid.svg' : 'unlock-solid.svg'}`}
                            alt="Candado"
                            className="h-4 w-4 ml-2"
                        />
                    </div>
                    <hr className="my-4" />
                    {[equipo.miembro1, equipo.miembro2, equipo.miembro3, equipo.miembro4, equipo.miembro5].map((miembro, index) => (
                        miembro && (
                            <div key={miembro.id} className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-300">Miembro {index + 1}:</h4>
                                <div className="flex items-center">
                                    <ImagenResponsive
                                        srcPC={miembro.foto_perfil_PC}
                                        srcTablet={miembro.foto_perfil_Tablet}
                                        srcMobile={miembro.foto_perfil_Movil}
                                        alt={miembro.name}
                                        className="h-12 w-12 rounded-full mr-2"
                                    />
                                    <p className="text-sm text-white">{miembro.name}</p>
                                    {auth.user && equipo.lider && equipo.lider.id === auth.user.id && (
                                        <Button onClick={() => handleExpulsarMiembro(miembro.id)} className="ml-4">
                                            Expulsar
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )
                    ))}
                    <hr className="my-4" />
                    {!auth.user || auth.user.id !== equipo.lider?.id ? (
                        <div className="flex mt-4">
                            <Button onClick={handleAbandonarEquipo}>Abandonar Equipo</Button>
                        </div>
                    ) : (
                        <div className="flex mt-4">
                            <Link href={route('equipos.edit', equipo.id)} className="inline-flex items-center px-4 py-2 bg-yellow-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-600 focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200 disabled:opacity-25 transition mr-2">
                                Editar
                            </Link>
                            <DangerButton onClick={() => handleDelete(equipo.id)} className="inline-flex items-center px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-600 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">
                                Eliminar
                            </DangerButton>
                        </div>
                    )}
                    <br />
                    <Link href={route('equipos.index')} className="text-indigo-600 hover:text-indigo-900">
                        Volver
                    </Link>
                </div>
            </div>
        </ControladorLayout>
    );
};

export default EquipoShow;
