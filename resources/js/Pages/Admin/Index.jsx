import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';

const AdminIndex = ({ children }) => {
    const { url } = usePage();

    const iconoUsuarios = "/images/user-solid-cyan.svg";
    const iconoPublicaciones = "/images/file-solid.svg";
    const iconoEquipos = "/images/teamspeak.svg";
    const iconoEventos = "/images/gamepad-solid.svg";

    return (
        <ControladorLayout>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 bg-gray-800 text-white">
                    <ul className="py-4">
                        <li className={`py-2 px-4 ${url.includes('/admin/usuarios') ? 'bg-gray-700' : ''}`}>
                            <Link href={route('admin.usuarios.index')} className="hover:text-gray-300 block">
                                <img src={iconoUsuarios} alt="Icono usuarios" className="inline-block w-6 h-6 mr-2" />
                                Usuarios
                            </Link>
                        </li>
                        <li className={`py-2 px-4 ${url.includes('/admin/publicaciones') ? 'bg-gray-700' : ''}`}>
                            <Link href={route('admin.publicaciones.index')} className="hover:text-gray-300 block">
                                <img src={iconoPublicaciones} alt="Icono publicaciones" className="inline-block w-6 h-6 mr-2" />
                                Publicaciones
                            </Link>
                        </li>
                        <li className={`py-2 px-4 ${url.includes('/admin/equipos') ? 'bg-gray-700' : ''}`}>
                            <Link href={route('admin.equipos.index')} className="hover:text-gray-300 block">
                                <img src={iconoEquipos} alt="Icono equipo" className="inline-block w-6 h-6 mr-2" />
                                Equipos
                            </Link>
                        </li>
                        <li className={`py-2 px-4 ${url.includes('/admin/eventos') ? 'bg-gray-700' : ''}`}>
                            <Link href={route('admin.eventos.index')} className="hover:text-gray-300 block">
                                <img src={iconoEventos} alt="Icono evento" className="inline-block w-6 h-6 mr-2" />
                                Eventos
                            </Link>
                        </li>
                    </ul>
                </div>
                <main className="flex-grow p-4 bg-gray-900 text-white">
                    {children}
                </main>
            </div>
        </ControladorLayout>
    );
};

export default AdminIndex;
