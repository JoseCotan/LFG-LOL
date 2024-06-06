import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import ControladorLayout from '@/Layouts/ControladorLayout';

const AdminIndex = ({ children }) => {
    const { url } = usePage();

    return (
        <ControladorLayout>
            <div className="flex">
                <aside className="w-1/4 bg-gray-800 text-white">
                    <ul className="py-4">
                        <li className={`py-2 px-4 ${url.includes('/admin/publicaciones') ? 'bg-gray-700' : ''}`}>
                            <Link href={route('admin.publicaciones.index')} className="hover:text-gray-300">
                                Publicaciones
                            </Link>
                        </li>
                        <li className={`py-2 px-4 ${url.includes('/admin/equipos') ? 'bg-gray-700' : ''}`}>
                            <Link href={route('admin.equipos.index')} className="hover:text-gray-300">
                                Equipos
                            </Link>
                        </li>
                        <li className={`py-2 px-4 ${url.includes('/admin/eventos') ? 'bg-gray-700' : ''}`}>
                            <Link href={route('admin.eventos.index')} className="hover:text-gray-300">
                                Eventos
                            </Link>
                        </li>
                    </ul>
                </aside>
                <main className="w-3/4 p-4 bg-gray-900 text-white">
                    {children}
                </main>
            </div>
        </ControladorLayout>
    );
};

export default AdminIndex;
