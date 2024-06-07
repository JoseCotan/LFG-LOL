import React, { useState, useEffect } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import ButtonColores from '@/Components/ButtonColores';
import MensajeSuccess from '@/Components/MensajeSuccess';
import MensajeError from '@/Components/MensajeError';
import TarjetaPublicacion from '@/Components/TarjetaPublicacion';
import FiltroPublicaciones from '@/Components/FiltroPublicaciones';

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

    useEffect(() => {
        if (flash && flash.type === 'success') {
            setSuccess(flash.message);
            setError('');
        } else if (flash && flash.type === 'error') {
            setError(flash.message);
            setSuccess('');
        }
    }, [flash]);

    const applyFilters = () => {
        get(route('publicaciones.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setData({
            modo: '',
            rango: '',
            rol: '',
            hora_inicio: '',
            hora_fin: '',
        });
    };

    useEffect(() => {
        if (data.modo || data.rango || data.rol || data.hora_inicio || data.hora_fin) {
            applyFilters();
        }
    }, [data]);

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
                        }}
                        onReset={resetFilters}
                    />
                </div>
                <div className="w-full p-6">
                    <div className="ml-2 mb-4 flex justify-center sm:justify-start">
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
                    <div className="mt-6 flex flex-wrap justify-center sm:justify-start">
                        {publicaciones.data.map((publicacion) => (
                            <div key={publicacion.id} className="m-2">
                                <TarjetaPublicacion publicacion={publicacion} />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center space-x-1 mt-4">
                        {publicaciones.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                preserveScroll
                                preserveState
                                className={`px-4 py-2 ${link.active ? 'text-blue-500' : 'text-gray-500'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </ControladorLayout>
    );
};

export default PublicacionesIndex;
