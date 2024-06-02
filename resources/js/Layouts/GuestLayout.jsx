import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import Busqueda from '@/Components/Busqueda';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import './../../css/imagenFondo.css'

export default function GuestLayout({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [hideNavLinks, setHideNavLinks] = useState(false);

    const handleVipClick = (e) => {
        e.preventDefault();
        window.open(route('vip'), '_blank', 'width=650,height=900');
    };

    return (
        <div className="relative">
            <div id="jinx-background"></div>
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
                            <div className="hidden space-x-6 sm:-my-px sm:ms-10 sm:flex">
                                <Busqueda onToggle={setHideNavLinks} />
                                {!hideNavLinks && (
                                    <div className="hidden space-x-6 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink href={route('publicaciones.index')} active={route().current('publicaciones.index')}>
                                            Publicaciones
                                        </NavLink>
                                        <NavLink href={route('equipos.index')} active={route().current('equipos.index')}>
                                            Equipos
                                        </NavLink>
                                        <NavLink href={route('eventos.index')} active={route().current('eventos.index')}>
                                            Eventos
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <div className="inline-flex rounded-md space-x-4">
                                    <NavLink href={route('login')} active={route().current('login')}>
                                        Log in
                                    </NavLink>
                                    <NavLink href={route('register')} active={route().current('register')}>
                                        Registrarse
                                    </NavLink>
                                </div>
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
                        <div className="px-4">
                            <Link
                                href={route('login')}
                                className="block rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="block rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Registrarse
                            </Link>
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
