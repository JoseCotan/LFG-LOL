import React, { useState, useEffect } from 'react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import { Link, usePage } from '@inertiajs/react';
import Button from '@/Components/Button';
import TarjetaPublicacion from '@/Components/TarjetaPublicacion';
import MensajeError from '@/Components/MensajeError';
import Select from '@/Components/Select';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import ButtonColores from '@/Components/ButtonColores';


const PublicacionesIndex = () => {
    const { publicaciones, modos, roles, rangos, auth, flash } = usePage().props;
    const [filtroModo, setFiltroModo] = useState('');
    const [filtroRango, setFiltroRango] = useState('');
    const [filtroRol, setFiltroRol] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [error, setError] = useState('');

    const resetearFiltros = () => {
        setFiltroModo('');
        setFiltroRango('');
        setFiltroRol('');
        setHoraInicio('');
        setHoraFin('');
    };

    const publicacionesFiltradas = publicaciones.data.filter(p => {
        return (!filtroModo || p.modo.id.toString() === filtroModo) &&
            (!filtroRango || p.rango.id.toString() === filtroRango) &&
            (!filtroRol || p.rol.id.toString() === filtroRol) &&
            (!horaInicio || p.hora_preferente_inicio >= horaInicio) &&
            (!horaFin || p.hora_preferente_final <= horaFin);
    });

    useEffect(() => {
        if (flash) {
            setError(flash);
        }
    }, [flash]);

    return (
        <ControladorLayout>
            <div className="flex">
                <div className="p-4">
                    <div className="mb-4">
                        <InputLabel>Filtrar por Modo</InputLabel>
                        <Select
                            value={filtroModo}
                            onChange={(e) => setFiltroModo(e.target.value)}
                            options={modos.map((modo) => ({ value: modo.id, label: modo.nombre }))}
                            id="modo_id"
                        />
                    </div>
                    <div className="mb-4">
                        <InputLabel>Filtrar por Rango</InputLabel>
                        <Select
                            value={filtroRango}
                            onChange={(e) => setFiltroRango(e.target.value)}
                            options={rangos.map((rango) => ({ value: rango.id, label: rango.nombre }))}
                            id="rango_id"
                        />
                    </div>
                    <div className="mb-4">
                        <InputLabel>Filtrar por Rol</InputLabel>
                        <Select
                            value={filtroRol}
                            onChange={(e) => setFiltroRol(e.target.value)}
                            options={roles.map((rol) => ({ value: rol.id, label: rol.nombre }))}
                            id="rol_id"
                        />
                    </div>
                    <div className="mb-4">
                        <div>
                            <InputLabel htmlFor="horaInicio">Desde:</InputLabel>
                            <TextInput
                                type="time"
                                id="horaInicio"
                                value={horaInicio}
                                onChange={(e) => setHoraInicio(e.target.value)}
                            />
                            <InputLabel htmlFor="horaFin">Hasta:</InputLabel>
                            <TextInput
                                type="time"
                                id="horaFin"
                                value={horaFin}
                                onChange={(e) => setHoraFin(e.target.value)}
                            />
                        </div>
                    </div>
                    <ButtonColores color="blue" onClick={resetearFiltros}>
                        Resetear Filtros
                    </ButtonColores>
                </div>
                <div className="w-3/4 p-6 overflow-hidden sm:rounded-lg">
                    {error && (
                        <MensajeError message={error} onClose={() => setError('')} />
                    )}
                    <Link href={route('publicaciones.create')}>
                        <ButtonColores color="blue">
                            Crear Publicación
                        </ButtonColores>
                    </Link>
                    <div className="mt-6">
                        {publicacionesFiltradas.map((publicacion) => (
                            <TarjetaPublicacion key={publicacion.id} publicacion={publicacion} />
                        ))}
                    </div>
                    <div className="flex justify-center space-x-1">
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
