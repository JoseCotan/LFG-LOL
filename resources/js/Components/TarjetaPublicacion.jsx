import React from 'react';
import Button from './Button';
import { Link, usePage } from '@inertiajs/react';
import ButtonColores from './ButtonColores';

const TarjetaPublicacion = ({ publicacion }) => {
    const { auth } = usePage().props;

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
            "Aspirante": "CHALLENGER",
            "Sin clasificar": "UNRANKED",
            "Sin rango": "NORANK"
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

    // Si el usuario no está logeado, devolverá false.
    const creador = auth.user && auth.user.id === publicacion.usuario_id;
    const fondoVIP = publicacion.usuario.VIP ? 'bg-amber-100' : 'bg-blue-100';

    return (
        <div className={`flex w-96 h-38 border border-gray-300 rounded-lg overflow-hidden font-bold mb-5 ${fondoVIP} relative`} style={{ maxWidth: '400px' }}>
            <div className="w-24 h-full flex flex-col items-center p-2 border-r border-gray-300">
            <div className="w-20 h-1/2">
                <img src={`/images/posiciones/${convertirRol(publicacion.rol.nombre)}.webp`} alt={`Posición ${publicacion.posicion}`} className="w-full h-full object-cover" />
            </div>
            <div className="w-20 h-1/2">
                <img src={`/images/rangos/${convertirRango(publicacion.rango.nombre)}.png`} alt={`Posición ${publicacion.posicion}`} title="aaaaaa" className="w-full h-full object-cover" />
            </div>
        </div>
            <div className="flex flex-col justify-center p-2 text-sm overflow-hidden pr-16">
                <h2 className="text-lg font-bold max-w-44 break-words mb-8">{publicacion.titulo}</h2>
                <div className="mb-2">Horario: {publicacion.hora_preferente_inicio} - {publicacion.hora_preferente_final}</div>
                <div className="mb-2">Modo: {publicacion.modo.nombre}</div>
                <ButtonColores color="green" onClick={handlePerfilClick}>
                    Ver perfil
                </ButtonColores>
            </div>
            {publicacion.reputacion_img && (
                <img
                    src="/images/rammus_okay.png"
                    alt="Reputación positiva"
                    className="w-16 h-16 mt-2 absolute right-2"
                />
            )}
            {auth.user && (creador || auth.user.admin) && (
                <Link href={route('publicaciones.edit', publicacion.id)}>
                    <img
                        src="/images/edit.svg"
                        alt="Editar publicación"
                        className="w-12 h-12 mb-2 absolute bottom-2 right-2 cursor-pointer"
                    />
                </Link>
            )}

        </div>
    );
};

export default TarjetaPublicacion;
