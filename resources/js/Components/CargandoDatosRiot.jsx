import React, { useEffect, useState } from 'react';

const CargandoDatos = () => {
    const frases = [
        "Recuerda siempre colocar guardianes de visión. La visión gana partidas.",
        "Comunícate con tu equipo y planea tus movimientos estratégicamente.",
        "No olvides farmear eficientemente. El oro y la experiencia son clave para la victoria.",
        "Conoce las habilidades de tu campeón y sus enfriamientos para maximizar tu efectividad.",
        "Mantén un ojo en el minimapa y estate atento a los movimientos enemigos.",
        "No te sobreextiendas sin visión. Es mejor jugar seguro que morir por una emboscada.",
        "La coordinación con tu equipo en las peleas grupales puede decidir el juego.",
        "Ten siempre un plan de escape. No te quedes atrapado en situaciones peligrosas.",
        "Aprende a controlar las oleadas de súbditos para tener ventaja en tu carril.",
        "Ayuda a tu jungla asegurando los objetivos importantes como el Dragón y el Barón Nashor.",
        "Ten paciencia y espera el momento adecuado para iniciar una pelea.",
        "Adaptarte a las composiciones de equipo y ajusta tus estrategias en consecuencia.",
        "Mantén una mentalidad positiva y no te rindas. El juego puede cambiar con una sola pelea.",
        "Recuerda utilizar las señales de comunicación para coordinar con tu equipo.",
        "Practica diferentes campeones para ser versátil y adaptable en cualquier situación.",
        "No olvides comprar elixires y pociones para ganar ventaja en las peleas.",
        "Estudia las estrategias y builds de jugadores profesionales para mejorar tu juego.",
        "Protege a tu ADC y mago. Su daño es crucial en las peleas tardías.",
        "Divide y vencerás. A veces, dividir al equipo enemigo es la mejor táctica.",
        "Mantén la calma y juega con cabeza. No dejes que una derrota temprana te desanime."
    ];

    const [fraseAleatoria, setFraseAleatoria] = useState("");

    useEffect(() => {
        const frase = frases[Math.floor(Math.random() * frases.length)];
        setFraseAleatoria(frase);
    }, []);

    return (
        <div className="flex items-center justify-center h-full">
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative w-full h-40 bg-sky-100">
                    <img
                        src="/images/ezreal.gif"
                        alt="Cargando"
                        className="absolute top-0 left-0 w-full h-full object-contain"
                    />
                </div>
                <div className="px-6 py-4">
                    <p className="text-center text-gray-700 text-lg">Cargando datos...</p>
                    <p className="text-center text-gray-500 mt-2 text-lg">{fraseAleatoria}</p>
                </div>
            </div>
        </div>
    );
};

export default CargandoDatos;
