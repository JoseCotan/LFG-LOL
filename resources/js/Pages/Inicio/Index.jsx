import React from 'react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import { usePage } from '@inertiajs/react';
import CarouselUsuarios from '@/Components/CarouselUsuarios';
import CarouselPublicaciones from '@/Components/CarouselPublicaciones';
import ButtonColores from '@/Components/ButtonColores';
import '../../../css/Spiegel.css';
import '../../../css/Beaufort.css';

const Inicio = () => {
    const { auth, ultimosUsuarios, ultimasPublicaciones } = usePage().props;

    return (
        <ControladorLayout>
            <div className="mx-auto px-6 py-6">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-blue-800" style={{ fontFamily: 'Beaufort' }}>¡Bienvenido a la comunidad LFG-LOL!</h1>
                    <p className="text-lg text-gray-700" style={{ fontFamily: 'Spiegel' }}>Aquí puedes compartir tus ideas, interactuar con otros usuarios y mucho más.</p>
                </div>
                {auth.user ? (
                    <>
                        <div className="mb-8" style={{ fontFamily: 'Spiegel' }}>
                            <p className="text-lg text-gray-700">Explora las publicaciones, equipos y eventos para participar activamente en nuestra comunidad.</p>
                            <div className="mt-4 flex flex-col space-y-4">
                                <div className="flex items-center space-x-4">
                                    <img src="/images/leesin.gif" alt="Lee Sin" className="w-32 h-16" />
                                    <ButtonColores color="blue">
                                        <a href="/publicaciones" className="text-white">Ir a Publicaciones</a>
                                    </ButtonColores>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <img src="/images/leesin.gif" alt="Lee Sin" className="w-32 h-16" />
                                    <ButtonColores color="blue">
                                        <a href="/equipos" className="text-white">Ir a Equipos</a>
                                    </ButtonColores>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <img src="/images/leesin.gif" alt="Lee Sin" className="w-32 h-16" />
                                    <ButtonColores color="blue">
                                        <a href="/eventos" className="text-white">Ir a Eventos</a>
                                    </ButtonColores>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8" style={{ fontFamily: 'Spiegel' }}>
                            <p className="text-lg text-gray-700 mb-4">Introduce tu nick de invocador para personalizar tu experiencia:</p>
                            <div className="inline-flex items-center mb-4 space-x-4">
                                <img src="/images/teemo.gif" alt="Teemo" className="w-16 h-16" />
                                <ButtonColores color="blue">
                                    <a href="/profile" className="text-white">Ir a tu perfil</a>
                                </ButtonColores>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="mb-8" style={{ fontFamily: 'Spiegel' }}>
                        <p className="text-lg text-gray-700 mb-4">Para disfrutar de todas las funciones, por favor</p>
                        <div className="inline-flex items-center mb-4 space-x-4">
                            <img src="/images/yone-lol.gif" alt="Yone" className="w-32 h-16" />
                            <ButtonColores color="blue">
                                <a href="/login" className="text-white">Inicie sesión</a>
                            </ButtonColores>
                        </div>
                        <p className="text-lg text-gray-700 mt-4 mb-4">O si no estás registrado:</p>
                        <div className="inline-flex items-center space-x-4">
                            <img src="/images/yone-lol.gif" alt="Yone" className="w-32 h-16" />
                            <ButtonColores color="blue">
                                <a href="/register" className="text-white">Registrarse</a>
                            </ButtonColores>
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
