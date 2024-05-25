import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import Button from '@/Components/Button';


const PublicacionesIndex = () => {
    const { publicaciones, modos, roles, rangos, auth } = usePage().props;
    const [filtroModo, setFiltroModo] = useState('');
    const [filtroRango, setFiltroRango] = useState('');
    const [filtroRol, setFiltroRol] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');

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

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex">
                <div className="w-1/4 bg-white p-4">
                    <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">Filtrar por Modo</h3>
                        <select
                            className="block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={filtroModo}
                            onChange={(e) => setFiltroModo(e.target.value)}
                        >
                            <option value="">Modos</option>
                            {modos.map((modo) => (
                                <option key={modo.id} value={modo.id}>
                                    {modo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">Filtrar por Rango</h3>
                        <select
                            className="block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={filtroRango}
                            onChange={(e) => setFiltroRango(e.target.value)}
                        >
                            <option value="">Rangos</option>
                            {rangos.map((rango) => (
                                <option key={rango.id} value={rango.id}>
                                    {rango.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">Filtrar por Rol</h3>
                        <select
                            className="block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={filtroRol}
                            onChange={(e) => setFiltroRol(e.target.value)}
                        >
                            <option value="">Roles</option>
                            {roles.map((rol) => (
                                <option key={rol.id} value={rol.id}>
                                    {rol.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">Filtrar por Horario</h3>
                        <div>
                            <label htmlFor="horaInicio">Desde:</label>
                            <input
                                type="time"
                                id="horaInicio"
                                value={horaInicio}
                                onChange={(e) => setHoraInicio(e.target.value)}
                                className="mb-2 mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            <label htmlFor="horaFin">Hasta:</label>
                            <input
                                type="time"
                                id="horaFin"
                                value={horaFin}
                                onChange={(e) => setHoraFin(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <Button onClick={resetearFiltros}>
                        Resetear Filtros
                    </Button>
                </div>
                <div className="w-3/4 p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <Link href={route('publicaciones.create')} className="btn btn-primary">
                        Crear Publicación
                    </Link>
                    <div className="mt-6">
                        {publicacionesFiltradas.map((publicacion) => (
                            <div key={publicacion.id} className="mt-4">
                                <h2 className="text-lg font-bold">{publicacion.titulo}</h2>
                                <p>{publicacion.descripcion}</p>
                                <div>Horario: {publicacion.hora_preferente_inicio} - {publicacion.hora_preferente_final}</div>
                                <div>Modo: {publicacion.modo.nombre}</div>
                                <div>Rol: {publicacion.rol.nombre}</div>
                                <div>Rango: {publicacion.rango.nombre}</div>
                            </div>
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
        </AuthenticatedLayout>
    );
};

export default PublicacionesIndex;
