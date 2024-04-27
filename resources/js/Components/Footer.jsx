import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-black to-green-950 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm mb-4">&copy; 2024 LFG-LOL. Todos los derechos reservados.</p>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="text-white hover:text-gray-400 mt-2">Discord</a>
                    <a href="#" className="text-white hover:text-gray-400 mt-2">Contacto</a>
                    <a href="#" className="text-white hover:text-gray-400 mt-2">Sobre nosotros</a>
                    <img className="h-10 w-10 align-middle" src="/images/info.png" alt="Icono de información" />
                    <a href="#" className="text-white hover:text-gray-400 mt-2">FAQ</a>
                    <a href="#" className="text-white hover:text-gray-400 mt-2">Sugerencias</a>
                    <a href="#" className="text-white hover:text-gray-400 mt-2">Términos y condiciones</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
