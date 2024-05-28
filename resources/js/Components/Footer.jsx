import React, { useState } from 'react';
import VentanaInfo from './VentanaInfo';

function Footer() {
    const [isVentanaInfoOpen, setVentanaInfoOpen] = useState(false);

    return (
        <>
            <footer className="bg-gradient-to-b from-black to-sky-950 text-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm mb-4">&copy; 2024 LFG-LOL. Todos los derechos reservados.</p>
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            className="h-10 w-10 align-middle cursor-pointer"
                            src="/images/info.png"
                            alt="Icono de información"
                            onClick={() => setVentanaInfoOpen(true)}
                        />
                        <div className="flex justify-center space-x-4 flex-wrap">
                            <a href="#" className="text-white hover:text-gray-400 mt-2">Discord</a>
                            <a href="#" className="text-white hover:text-gray-400 mt-2">Contacto</a>
                            <a href="#" className="text-white hover:text-gray-400 mt-2">Sobre nosotros</a>
                            <a href="#" className="text-white hover:text-gray-400 mt-2">FAQ</a>
                            <a href="#" className="text-white hover:text-gray-400 mt-2">Sugerencias</a>
                            <a href="#" className="text-white hover:text-gray-400 mt-2">Términos y condiciones</a>
                        </div>
                    </div>
                </div>
            </footer>
            <VentanaInfo isOpen={isVentanaInfoOpen} onClose={() => setVentanaInfoOpen(false)}>
                <img src="/images/logo.png" alt="Logo de la aplicación" className="w-32 h-32 mx-auto"></img>
                <p className="p-4 text-center">LFG-LOL fue creado bajo la política "Sección de parloteo legal" de Riot Games utilizando recursos que son propiedad de Riot Games.
                    Riot Games no respalda ni patrocina este proyecto</p>
            </VentanaInfo>
        </>
    );
}

export default Footer;
