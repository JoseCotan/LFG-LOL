import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import Busqueda from '@/Components/Busqueda';
import ImagenResponsive from '@/Components/ImagenResponsive';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import './../../css/imagenFondo.css'

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [hideNavLinks, setHideNavLinks] = useState(false);

    const handleVipClick = (e) => {
        e.preventDefault();
        window.open(route('vip'), '_blank', 'width=650,height=900');
    };

    return (
        <div className="relative">
            <div id="jinx-background"></div>
            <div id="garen-background"></div>
            <nav className="bg-gradient-to-b from-50% from-sky-950 to-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                            <div className="flex sm:hidden ml-8">
                                <Busqueda onToggle={setHideNavLinks} />
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <Busqueda onToggle={setHideNavLinks} />
                                {!hideNavLinks && (
                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink href={route('publicaciones.index')} active={route().current('publicaciones.index')}>
                                            Publicaciones
                                        </NavLink>
                                        <NavLink href={route('equipos.index')} active={route().current('equipos.index')}>
                                            Equipos
                                        </NavLink>
                                        <NavLink href={route('eventos.index')} active={route().current('eventos.index')}>
                                            Eventos
                                        </NavLink>
                                        <NavLink href={route('vip')} onClick={handleVipClick} active={route().current('vip')}>
                                            VIP
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <ImagenResponsive
                                            srcPC={user.foto_perfil_Tablet}
                                            srcTablet={user.foto_perfil_Tablet}
                                            srcMobile={user.foto_perfil_Movil}
                                            alt="Foto de perfil"
                                            className="h-10 w-10 cursor-pointer"
                                        />
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Cerrar sesión
                                        </Dropdown.Link>
                                        {user.admin && (
                                            <Dropdown.Link href={route('admin.index')}>Panel de administración</Dropdown.Link>
                                        )}
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('publicaciones.index')} active={route().current('publicaciones.index')}>
                            Publicaciones
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('equipos.index')} active={route().current('equipos.index')}>
                            Equipos
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('eventos.index')} active={route().current('eventos.index')}>
                            Eventos
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('vip')} onClick={handleVipClick} active={route().current('vip')}>
                            VIP
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4 py-2 bg-white bg-opacity-60 rounded-lg shadow-sm">
                            <div className="font-medium text-xl text-sky-900">{user.name}</div>
                            <div className="font-medium text-lg text-sky-700">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} as="button" className="flex items-center justify-between">
                                <span>Perfil</span>
                                <img src="/images/user-solid-white.svg" alt="Icono perfil" className="ml-2 w-7 h-7" />
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="flex items-center justify-between">
                                <span>Cerrar sesión</span>
                                <img src="/images/right-from-bracket-solid-white.svg" alt="Icono cerrar sesión" className="ml-2 w-7 h-7" />
                            </ResponsiveNavLink>
                            {user.admin && (
                                <ResponsiveNavLink href={route('admin.index')} as="button" className="flex items-center justify-between">
                                    <span>Panel de Administración</span>
                                    <img src="/images/user-admin-white.png" alt="Icono administrador" className="ml-2 w-7 h-7" />
                                </ResponsiveNavLink>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}
