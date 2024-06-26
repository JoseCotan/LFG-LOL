import React, { useState, useEffect } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import ButtonColores from '@/Components/ButtonColores';
import MensajeSuccess from '@/Components/MensajeSuccess';
import MensajeError from '@/Components/MensajeError';
import FiltroEquipo from '@/Components/FiltroEquipo';
import ImagenResponsive from '@/Components/ImagenResponsive';
import Paginacion from '@/Components/Paginacion';
import '../../../css/Spiegel.css';

const EquiposIndex = () => {
    const { equipos, modos, rangos, auth, flash, filtros } = usePage().props;
    const { data, setData, get } = useForm({
        modo: filtros.modo || '',
        rango: filtros.rango || '',
        privacidad: filtros.privacidad || '',
    });

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [filtrosCambiados, setFiltrosCambiados] = useState(false);

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

    const aplicarFiltros = () => {
        get(route('equipos.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetearFiltros = () => {
        setData({
            modo: '',
            rango: '',
            privacidad: '',
        });
        setFiltrosCambiados(true);
    };

    useEffect(() => {
        if (filtrosCambiados) {
            aplicarFiltros();
            setFiltrosCambiados(false);
        }
    }, [data, filtrosCambiados]);

    return (
        <ControladorLayout>
            <div className="flex flex-col sm:flex-row">
                <div className="p-4 2xl:w-96 xl:w-96 lg:w-96 md:w-96 sm:w-96">
                    <FiltroEquipo
                        modos={modos}
                        rangos={rangos}
                        onFiltrar={(modo, rango, privacidad) => {
                            setData({ modo, rango, privacidad });
                            setFiltrosCambiados(true);
                        }}
                        onReset={() => {
                            resetearFiltros();
                            aplicarFiltros();
                        }}
                    />
                </div>
                <div className="w-full lg:w-3/4 p-4 mt-4">
                    <div className="ml-4 flex justify-center sm:justify-start">
                        {success && (
                            <MensajeSuccess message={success} onClose={() => setSuccess('')} />
                        )}
                        {error && (
                            <MensajeError message={error} onClose={() => setError('')} />
                        )}
                    </div>
                    <div className="flex justify-center sm:justify-start mb-4 ml-2">
                        <Link href={route('equipos.create')}>
                            <ButtonColores color="blue">
                                Añadir Nuevo Equipo
                            </ButtonColores>
                        </Link>
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-start ml-4" style={{ fontFamily: 'Spiegel' }}>
                        {equipos.data.map((equipo) => (
                            <div key={equipo.id} className={`bg-gray-900 overflow-hidden shadow-sm rounded-lg
                                sm:rounded-lg w-full max-w-xs relative mb-4 mr-4 ${auth.user &&
                                    (auth.user.id === equipo.lider.id ||
                                    auth.user.id === equipo.miembro_1 || auth.user.id === equipo.miembro_2 ||
                                    auth.user.id === equipo.miembro_3 || auth.user.id === equipo.miembro_4 ||
                                    auth.user.id === equipo.miembro_5) ? 'border border-blue-500 bg-sky-950' : ''}`}>
                                <div className="p-6">
                                    <h3 className={`text-xl font-semibold ${auth.user &&
                                            (auth.user.id === equipo.lider.id ||
                                            auth.user.id === equipo.miembro_1 ||
                                            auth.user.id === equipo.miembro_2 ||
                                            auth.user.id === equipo.miembro_3 ||
                                            auth.user.id === equipo.miembro_4 ||
                                            auth.user.id === equipo.miembro_5) ? 'text-blue-100' : 'text-white'}
                                            max-w-44 break-words mb-2`}>{equipo.nombre_equipo}</h3>
                                    <img src={`/images/rangos/${convertirRango(equipo.rango.nombre)}.png`}
                                    alt={`Posición ${equipo.posicion}`} className="absolute top-0 right-6 w-20 h-20" />
                                    <div className="flex items-center mb-2">
                                        <ImagenResponsive
                                            srcPC={equipo.lider.foto_perfil_PC}
                                            srcTablet={equipo.lider.foto_perfil_Tablet}
                                            srcMobile={equipo.lider.foto_perfil_Movil}
                                            alt="Foto de perfil"
                                            className="h-16 w-16 rounded-full mr-2"
                                        />
                                        <p className="text-xl text-white">{equipo.lider.name}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-lg text-gray-400 mb-1">Modo de Juego:</p>
                                        <p className="text-lg text-white">{equipo.modo.nombre}</p>
                                    </div>

                                    <div className="flex items-center mb-4">
                                        <p className="text-lg text-gray-400">Privacidad:</p>
                                        <p className="text-lg text-white ml-1">{equipo.privado ? 'Privado' : 'Público'}</p>
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
                                        {auth.user && (auth.user.id === equipo.lider.id || auth.user.admin) && (
                                            <>
                                                <Link href={route('equipos.edit', equipo.id)}>
                                                    <ButtonColores color="yellow">Editar</ButtonColores>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <Paginacion links={equipos.links} />
                </div>
            </div>
        </ControladorLayout>
    );
};

export default EquiposIndex;
