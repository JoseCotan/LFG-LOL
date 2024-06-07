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
import '../../../css/Spiegel.css'

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
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8 mb-4">
                {success && (
                    <MensajeSuccess message={success} onClose={() => setSuccess('')} />
                )}
                {error && (
                    <MensajeError message={error} onClose={() => setError('')} />
                )}
                <div className="bg-sky-950 ml-2 mr-2 shadow-lg rounded-xl p-6 space-y-6" style={{ fontFamily: 'Spiegel' }}>
                    <div className="bg-gradient-to-r from-gray-100 p-4 rounded-xl shadow-sm">
                        <h3 className="text-4xl font-semibold text-gray-800 mb-2">{equipo.nombre_equipo}</h3>
                        <div className="flex items-center space-x-4">
                            <ImagenResponsive
                                srcPC={equipo.lider.foto_perfil_PC}
                                srcTablet={equipo.lider.foto_perfil_Tablet}
                                srcMobile={equipo.lider.foto_perfil_Movil}
                                alt={equipo.lider.name}
                                className="h-12 w-12 rounded-full"
                            />
                            <div>
                                <h4 className="text-xl font-semibold text-black">Líder:</h4>
                                <p className="text-lg text-gray-900">{equipo.lider.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-100 p-4 rounded-xl shadow-sm">
                        <h4 className="text-xl font-semibold text-black">Modo de Juego:</h4>
                        <p className="text-lg text-gray-900">{equipo.modo.nombre}</p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-100 p-4 rounded-xl shadow-sm">
                        <h4 className="text-xl font-semibold text-black">Rango mínimo:</h4>
                        <img src={`/images/rangos/${convertirRango(equipo.rango.nombre)}.png`} alt={`Posición ${equipo.posicion}`} className="w-20 h-20" />
                    </div>
                    <div className="bg-gradient-to-r from-gray-100 p-4 rounded-xl shadow-sm">
                        <div className="flex items-center space-x-2">
                            <h4 className="text-xl font-semibold text-black">Privacidad:</h4>
                            <p className="text-lg text-gray-900">{equipo.privado ? 'Privado' : 'Público'}</p>
                            <img
                                src={`/images/${equipo.privado ? 'lock-solid-black.svg' : 'unlock-solid-black.svg'}`}
                                alt="Candado"
                                className="h-4 w-4"
                            />
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-100 p-4 rounded-xl shadow-sm space-y-4">
                        {[equipo.miembro1, equipo.miembro2, equipo.miembro3, equipo.miembro4, equipo.miembro5].map((miembro, index) => (
                            miembro && (
                                <div key={miembro.id} className="flex items-center space-x-4">
                                    <ImagenResponsive
                                        srcPC={miembro.foto_perfil_PC}
                                        srcTablet={miembro.foto_perfil_Tablet}
                                        srcMobile={miembro.foto_perfil_Movil}
                                        alt={miembro.name}
                                        className="h-12 w-12 rounded-full"
                                    />
                                    <div>
                                        <h4 className="text-xl font-semibold text-black">Miembro {index + 1}:</h4>
                                        <p className="text-lg text-gray-900">{miembro.name}</p>
                                    </div>
                                    {auth.user && (equipo.lider.id === auth.user.id || auth.user.admin) && (
                                        <>
                                            <ButtonColores color="blue" onClick={() => handleExpulsarMiembro(miembro.id)}>
                                                Expulsar
                                            </ButtonColores>
                                            {(miembro.id !== auth.user.id || auth.user.admin ) && miembro.id !== equipo.lider.id && (
                                                <ButtonColores color="blue" onClick={() => handleHacerLider(miembro.id)}>
                                                    Hacer Líder
                                                </ButtonColores>
                                            )}
                                        </>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                    <div className="bg-gradient-to-r from-gray-100 p-4 rounded-xl shadow-sm">
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
                        {auth.user && (auth.user?.id === equipo.lider.id || auth.user.admin) && (
                            <div className="flex space-x-4 mt-4">
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
            </div>
        </ControladorLayout>
    );
};

export default EquipoShow;
