import React, { useState, useEffect } from 'react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import { Link, usePage } from '@inertiajs/react';
import CarouselUsuarios from '@/Components/CarouselUsuarios';
import CarouselPublicaciones from '@/Components/CarouselPublicaciones';
import ButtonColores from '@/Components/ButtonColores';
import MensajeSuccess from '@/Components/MensajeSuccess';
import MensajeError from '@/Components/MensajeError';
import '../../../css/Spiegel.css';
import '../../../css/Beaufort.css';

const Inicio = () => {
    const { auth, ultimosUsuarios, ultimasPublicaciones, flash } = usePage().props;

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

    return (
        <ControladorLayout>
            <div className="mx-auto px-6 py-6">
                {success && (
                    <MensajeSuccess message={success} onClose={() => setSuccess('')} />
                )}
                {error && (
                    <MensajeError message={error} onClose={() => setError('')} />
                )}
                <div className="mb-8">
                    <h1 className="text-5xl font-bold mb-4 text-blue-800" style={{ fontFamily: 'Beaufort' }}>¡Bienvenido a la comunidad LFG-LOL!</h1>
                    <p className="text-2xl text-gray-700" style={{ fontFamily: 'Spiegel' }}>Aquí puedes compartir tus ideas, interactuar con otros usuarios y mucho más.</p>
                </div>
                {auth.user ? (
                    <>
                        <div className="mb-8" style={{ fontFamily: 'Spiegel' }}>
                            <p className="text-xl text-gray-700">Explora las publicaciones, equipos y eventos para participar activamente en nuestra comunidad.</p>
                            <div className="mt-4 flex flex-col space-y-4">
                                <div className="flex items-center space-x-4">
                                    <img src="/images/leesin.gif" alt="Lee Sin" className="w-32 h-16" />
                                    <Link href="/publicaciones">
                                        <ButtonColores color="blue">
                                            <span className="text-white text-xl">Ir a Publicaciones</span>
                                        </ButtonColores>
                                    </Link>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <img src="/images/leesin.gif" alt="Lee Sin" className="w-32 h-16" />
                                    <Link href="/equipos">
                                        <ButtonColores color="blue">
                                            <span className="text-white text-xl">Ir a Equipos</span>
                                        </ButtonColores>
                                    </Link>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <img src="/images/leesin.gif" alt="Lee Sin" className="w-32 h-16" />
                                    <Link href="/eventos">
                                        <ButtonColores color="blue">
                                            <span className="text-white text-xl">Ir a Eventos</span>
                                        </ButtonColores>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8" style={{ fontFamily: 'Spiegel' }}>
                            <p className="text-xl text-gray-700 mb-4">Introduce tu nick de invocador para personalizar tu experiencia:</p>
                            <div className="inline-flex items-center mb-4">
                                <img src="/images/teemo.gif" alt="Teemo" className="w-16 h-16" />
                                <Link href="/profile">
                                    <ButtonColores color="blue">
                                        <span className="text-white text-xl">Ir a tu cuenta</span>
                                    </ButtonColores>
                                </Link>
                                <div className="ml-16 inline-flex items-center space-x-4">
                                    <img src="/images/teemo.gif" alt="Teemo" className="w-16 h-16" />
                                    <Link href={`/users/${auth.user.name}`}>
                                        <ButtonColores color="blue">
                                            <span className="text-white text-xl">Ir a tu perfil</span>
                                        </ButtonColores>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </>
                ) : (
                    <div className="mb-8" style={{ fontFamily: 'Spiegel' }}>
                        <p className="text-xl text-gray-700 mb-4">Para disfrutar de todas las funciones, por favor</p>
                        <div className="inline-flex items-center mb-4 space-x-4">
                            <img src="/images/yone-lol.gif" alt="Yone" className="w-32 h-16" />
                            <Link href="/login">
                                <ButtonColores color="blue">
                                    <span className="text-white text-xl">Iniciar sesión</span>
                                </ButtonColores>
                            </Link>
                        </div>
                        <p className="text-xl text-gray-700 mt-4 mb-4">O si no estás registrado:</p>
                        <div className="inline-flex items-center space-x-4">
                            <img src="/images/yone-lol.gif" alt="Yone" className="w-32 h-16" />
                            <Link href="/register">
                                <ButtonColores color="blue">
                                    <span className="text-white text-xl">Registrarse</span>
                                </ButtonColores>
                            </Link>
                        </div>
                    </div>
                )}
                <CarouselUsuarios usuarios={ultimosUsuarios} />
                <CarouselPublicaciones publicaciones={ultimasPublicaciones} />
            </div>
        </ControladorLayout>
    );
};

export default Inicio;
