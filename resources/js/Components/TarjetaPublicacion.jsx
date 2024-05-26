import React from 'react';
import '../../css/TarjetaPublicacion.css';
import Button from './Button';

const TarjetaPublicacion = ({ publicacion }) => {
    console.log(publicacion.usuario.name)
    const convertirRango = (nombreRango) => {
        const rangos = {
            "Hierro": "IRON",
            "Bronce": "BRONZE",
            "Plata": "SILVER",
            "Oro": "GOLD",
            "Platino": "PLATINUM",
            "Esmeralda": "EMERALD",
            "Diamante": "DIAMOND",
            "Maestro": "MASTER",
            "Gran Maestro": "GRANDMASTER",
            "Aspirante": "CHALLENGER"
        };
        return rangos[nombreRango] || nombreRango;
    };

    const convertirRol = (nombreRol) => {
        const roles = {
            "Top": "TOP",
            "Jungla": "JUNGLE",
            "Medio": "MIDDLE",
            "ADC": "BOTTOM",
            "Soporte": "UTILITY",
        };
        return roles[nombreRol] || nombreRol;
    };

    const handlePerfilClick = () => {
        if (publicacion.usuario && publicacion.usuario.name) {
            window.location.href = `/users/${publicacion.usuario.name.trim()}`;
        }
    };


    return (
        <div className={`tarjeta`}>
            <div className="tarjeta-imagenes">
                <div className="tarjeta-imagen">
                    <img src={`/images/posiciones/${convertirRol(publicacion.rol.nombre)}.webp`} alt={`Posición ${publicacion.posicion}`} className="imagen-hechizo" />
                </div>
                <div className="tarjeta-imagen">
                    <img src={`/images/rangos/${convertirRango(publicacion.rango.nombre)}.png`} alt={`Posición ${publicacion.posicion}`} className="imagen-hechizo" />
                </div>
            </div>

            <div className="tarjeta-centro">
                <h2 className="text-lg font-bold mb-2">{publicacion.titulo}</h2>
                <div className="mb-2">Horario: {publicacion.hora_preferente_inicio} - {publicacion.hora_preferente_final}</div>
                <div className="mb-2">Modo: {publicacion.modo.nombre}</div>
                <Button
                    onClick={handlePerfilClick}
                >
                    Ver perfil
                </Button>
            </div>
        </div>
    );
};

export default TarjetaPublicacion;
