import React from 'react';
import '../../css/TarjetaPartida.css';

const TarjetaPartida = ({ imagenCampeon, imagenesHechizos, estadisticas1, estadisticas2, estadisticas3, win, posicion }) => {
    const [kills, deaths, assists] = estadisticas1.split(' / ');

    return (
        <div className={`tarjeta ${win ? 'ganado' : 'perdido'}`}>
            <div className="tarjeta-imagenes">
                <img src={imagenCampeon} alt="Campeón"/>
                <div className="imagenes-hechizos">
                    {imagenesHechizos.map((img, index) => (
                        <img key={index} src={img} alt={`Hechizo ${index + 1}`} className="imagen-hechizo" />
                    ))}
                </div>
            </div>
            <div className="tarjeta-centro">
                <p>{kills} / <span className="deaths">{deaths}</span> / {assists}</p>
                <p>{estadisticas2}</p>
                <p>{estadisticas3}</p>
            </div>
            <div className="tarjeta-textos">
                <img src={`/images/posiciones/${posicion}.webp`} alt={posicion} className="position-image" />
            </div>
        </div>
    );
};

export default TarjetaPartida;
