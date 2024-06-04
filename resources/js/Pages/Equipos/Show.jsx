import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import DangerButton from '@/Components/DangerButton';
import ImagenResponsive from '@/Components/ImagenResponsive';
import Button from '@/Components/Button';
import ButtonColores from '@/Components/ButtonColores';
import MensajeSuccess from '@/Components/MensajeSuccess';
import MensajeError from '@/Components/MensajeError';

const EquipoShow = () => {
    const { equipo, auth, flash } = usePage().props;
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const esMiembro = [
        equipo.miembro1?.id,
        equipo.miembro2?.id,
        equipo.miembro3?.id,
        equipo.miembro4?.id,
        equipo.miembro5?.id
    ].includes(auth.user?.id);

    // Verifica si todos los puestos del equipo están ocupados
    const equipoLleno = [
        equipo.miembro1,
        equipo.miembro2,
        equipo.miembro3,
        equipo.miembro4,
        equipo.miembro5
    ].every(miembro => miembro !== null && miembro !== undefined);

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


    const handleUnirseEquipo = () => {
        Inertia.post(route('equipos.unirse', equipo.id));
    };

    const handleExpulsarMiembro = (miembroId) => {
        Inertia.post(route('equipos.expulsarMiembro', { equipoId: equipo.id, miembroId }));
    };

    const handleAbandonarEquipo = () => {
        Inertia.post(route('equipos.abandonarEquipo', equipo.id));
    };

    const handleDelete = (id) => {
        Inertia.delete(route('equipos.destroy', id));
    };

    const handleHacerLider = (miembroId) => {
        Inertia.post(route('equipos.hacerLider', { equipoId: equipo.id, miembroId }));
    };

    return (
        <ControladorLayout>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8 ml-4 mr-4 mb-4">
                {success && (
                    <MensajeSuccess message={success} onClose={() => setSuccess('')} />
                )}
                {error && (
                    <MensajeError message={error} onClose={() => setError('')} />
                )}
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
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-300">Rango mínimo:</h4>
                        <img src={`/images/rangos/${convertirRango(equipo.rango.nombre)}.png`} alt={`Posición ${equipo.posicion}`} className="w-20 h-20" />
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
                                        <>
                                            <Button onClick={() => handleExpulsarMiembro(miembro.id)} className="ml-4">
                                                Expulsar
                                            </Button>
                                            {miembro.id !== auth.user.id && (
                                                <Button onClick={() => handleHacerLider(miembro.id)} className="ml-4">
                                                    Hacer Líder
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    ))}
                    <hr className="my-4" />
                    {/* Muestra el botón solo si el equipo no está lleno y el usuario no es miembro */}
                    {!esMiembro && !equipoLleno && (
                        <ButtonColores color="blue" onClick={handleUnirseEquipo}>
                            Unirse al Equipo
                        </ButtonColores>
                    )}
                    {auth.user && auth.user?.id !== equipo.lider.id && esMiembro && (
                        <ButtonColores color="red" onClick={handleAbandonarEquipo}>
                            Abandonar Equipo
                        </ButtonColores>
                    )}
                    {auth.user?.id === equipo.lider.id && (
                        <div className="flex mt-4">
                            <Link href={route('equipos.edit', equipo.id)}>
                                <ButtonColores color="yellow">
                                    Editar
                                </ButtonColores>
                            </Link>
                            <ButtonColores color="red" onClick={() => handleDelete(equipo.id)}>
                                Eliminar
                            </ButtonColores>
                        </div>
                    )}
                    <div className="flex mt-4">
                        <Link href={route('equipos.index')}>
                            <ButtonColores color="blue">
                                Volver
                            </ButtonColores>
                        </Link>
                    </div>
                </div>
            </div>
        </ControladorLayout>
    );
};

export default EquipoShow;
