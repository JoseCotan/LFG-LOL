import React, { useState, useEffect } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import ButtonColores from '@/Components/ButtonColores';
import MensajeSuccess from '@/Components/MensajeSuccess';
import MensajeError from '@/Components/MensajeError';
import TarjetaPublicacion from '@/Components/TarjetaPublicacion';
import FiltroPublicaciones from '@/Components/FiltroPublicaciones';
import Paginacion from '@/Components/Paginacion';
import '../../../css/Spiegel.css';


const PublicacionesIndex = () => {
    const { publicaciones, modos, roles, rangos, auth, flash, filtros } = usePage().props;
    const { data, setData, get } = useForm({
        modo: filtros.modo || '',
        rango: filtros.rango || '',
        rol: filtros.rol || '',
        hora_inicio: filtros.hora_inicio || '',
        hora_fin: filtros.hora_fin || '',
    });

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [filtrosCambiados, setFiltrosCambiados] = useState(false);

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
        get(route('publicaciones.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetearFiltros = () => {
        setData({
            modo: '',
            rango: '',
            rol: '',
            hora_inicio: '',
            hora_fin: '',
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
                    <FiltroPublicaciones
                        modos={modos}
                        roles={roles}
                        rangos={rangos}
                        onFiltrar={(modo, rango, rol, horaInicio, horaFin) => {
                            setData({ modo, rango, rol, hora_inicio: horaInicio, hora_fin: horaFin });
                            setFiltrosCambiados(true);
                        }}
                        onReset={() => {
                            resetearFiltros();
                            aplicarFiltros();
                        }}
                    />
                </div>
                <div className="w-full mt-2 p-6">
                    <div className="ml-2 flex justify-center sm:justify-start">
                        {success && (
                            <MensajeSuccess message={success} onClose={() => setSuccess('')} />
                        )}
                        {error && (
                            <MensajeError message={error} onClose={() => setError('')} />
                        )}
                    </div>
                    <div className="flex justify-center sm:justify-start">
                        <Link href={route('publicaciones.create')}>
                            <ButtonColores color="blue">
                                Añadir nueva publicación
                            </ButtonColores>
                        </Link>
                    </div>
                    <div className="mt-2 flex flex-wrap justify-center sm:justify-start">
                        {publicaciones.data.map((publicacion) => (
                            <div key={publicacion.id} className="m-2">
                                <TarjetaPublicacion publicacion={publicacion} />
                            </div>
                        ))}
                    </div>
                    <Paginacion links={publicaciones.links} />
                </div>
            </div>
        </ControladorLayout>
    );
};

export default PublicacionesIndex;
