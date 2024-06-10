import React from 'react';
import ImagenResponsive from '@/Components/ImagenResponsive';
import { Link, usePage } from '@inertiajs/react';
import ButtonColores from './ButtonColores';
import '../../css/Spiegel.css';


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
                    <img src={`/images/rangos/${convertirRango(publicacion.rango.nombre)}.png`} alt={`Posición ${publicacion.posicion}`} className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="flex flex-col justify-center p-2 text-sm overflow-hidden pr-16" style={{ fontFamily: 'Spiegel' }}>
                <h2 className="text-xl text-blue-900 font-bold max-w-44 break-words mb-4">{publicacion.titulo}</h2>
                <div className="flex items-center mb-2">
                    <ImagenResponsive
                        srcPC={publicacion.usuario.foto_perfil_PC}
                        srcTablet={publicacion.usuario.foto_perfil_Tablet}
                        srcMobile={publicacion.usuario.foto_perfil_Movil}
                        alt="Foto de perfil"
                        className="h-16 w-16 rounded-full mr-2"
                    />
                    <span className="text-xl mr-2">{publicacion.usuario.name}</span>

                </div>
                <div className="text-lg mb-2">Horario:</div>
                <div className="text-lg mb-2"> {publicacion.hora_preferente_inicio} - {publicacion.hora_preferente_final}</div>
                <div className="text-lg mb-2">Modo: {publicacion.modo.nombre}</div>
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
