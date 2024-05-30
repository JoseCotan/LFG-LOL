import React from 'react';
import '../../css/TarjetaPartida.css';

const TarjetaPartida = ({ imagenCampeon, imagenesHechizos, estadisticas1, estadisticas2, estadisticas3, win, posicion }) => {
    const [kills, deaths, assists] = estadisticas1.split(' / ');

    return (
        <div className={`flex w-full h-30 border rounded-lg overflow-hidden font-bold ${win ? 'bg-blue-100' : 'bg-red-100'} mx-2 my-1 tarjeta-partida`} style={{ maxWidth: '600px', fontFamily: 'Spiegel' }}>
            <div className="w-24 flex flex-col items-center">
                <img src={imagenCampeon} alt="Campeón" />
                <div className="flex">
                    {imagenesHechizos.map((img, index) => (
                        <img key={index} src={img} alt={`Hechizo ${index + 1}`} className={`h-7 ${index === 0 ? 'mx-1' : ''}`} />
                    ))}
                </div>
            </div>
            <div className="flex-grow flex flex-col justify-center items-center text-black">
                <p className="text-lg">{kills} / <span className="text-red-500">{deaths}</span> / {assists}</p>
                <p className="text-lg">{estadisticas2}</p>
                <p className="text-lg">{estadisticas3}</p>
            </div>
            <div className="w-32 flex flex-col justify-center items-center">
                <img src={`/images/posiciones/${posicion}.webp`} alt={posicion} className="h-24" />
            </div>
        </div>
    );
};

export default TarjetaPartida;
