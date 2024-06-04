import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import ButtonColores from '@/Components/ButtonColores';
import ImagenResponsive from '@/Components/ImagenResponsive';
import MensajeSuccess from '@/Components/MensajeSuccess';
import MensajeError from '@/Components/MensajeError';

const EquiposIndex = () => {
    const { equipos, auth, flash } = usePage().props;
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleDelete = (id) => {
        Inertia.delete(route('equipos.destroy', id));
    };

    const convertirRango = (nombreRango) => {
        const rangos = {
            "Hierro": "IRON",
            "Bronce": "BRONZE",
            "Plata": "SILVER",
            "Oro": "GOLD",
            "Platino": "PLATINUM",
            "Esmeralda": "EMERALD",
            "Diamante": "DIAMOND",
            "Maestro": "MASTER",
            "Gran Maestro": "GRANDMASTER",
            "Aspirante": "CHALLENGER",
            "Sin clasificar": "UNRANKED",
            "Sin rango": "NORANK"
        };
        return rangos[nombreRango] || nombreRango;
    };

    useEffect(() => {
        if (flash && flash.type === 'success') {
            setSuccess(flash.message);
            setError('');
        } else if (flash && flash.type === 'error') {
            setError(flash.message);
            setSuccess('');
        }
    }, [flash]);

    return (
        <ControladorLayout>
            <div className="py-12 max-w-8xl mx-auto sm:px-6 lg:px-8">
                <div className="ml-4">
                    {success && (
                        <MensajeSuccess message={success} onClose={() => setSuccess('')} />
                    )}
                    {error && (
                        <MensajeError message={error} onClose={() => setError('')} />
                    )}
                </div>
                <div className="grid grid-cols-1 ml-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {equipos.map((equipo) => (
                        <div key={equipo.id} className="bg-gray-900 overflow-hidden shadow-sm rounded-lg sm:rounded-lg max-w-md relative">
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
                                            <ButtonColores color="red" onClick={() => handleDelete(equipo.id)}>
                                                Eliminar
                                            </ButtonColores>
                                        </>
                                    )}
                                </div>
                            </div>
                            <img src={`/images/rangos/${convertirRango(equipo.rango.nombre)}.png`} alt={`Posición ${equipo.posicion}`} className="absolute top-6 right-6 w-20 h-20" />
                        </div>
                    ))}
                </div>
                <div className="flex justify-left mt-4 ml-4">
                    <Link href={route('equipos.create')}>
                        <ButtonColores color="green">
                            Añadir Nuevo Equipo
                        </ButtonColores>
                    </Link>
                </div>
            </div>
        </ControladorLayout>
    );
};

export default EquiposIndex;
