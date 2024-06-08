import React from 'react';
import Slider from 'react-slick';
import ImagenResponsive from '@/Components/ImagenResponsive';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarouselPublicaciones = ({ publicaciones }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const handlePublicacionClick = () => {
        window.location.href = `/publicaciones`;
    };

    const convertirRango = (nombreRango) => {
        const rangos = {
            "1": "IRON",
            "2": "BRONZE",
            "3": "SILVER",
            "4": "GOLD",
            "5": "PLATINUM",
            "6": "EMERALD",
            "7": "DIAMOND",
            "8": "MASTER",
            "9": "GRANDMASTER",
            "10": "CHALLENGER",
            "11": "UNRANKED",
            "12": "NORANK"
        };
        return rangos[nombreRango] || nombreRango;
    };

    console.log(convertirRango(publicaciones[0]))

    return (
        <div className="bg-gray-100 rounded-lg p-6 max-w-screen-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Últimas publicaciones</h2>
            <Slider {...settings}>
                {publicaciones.map(publicacion => (
                    <div key={publicacion.id} className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer" style={{ fontFamily: 'Spiegel' }} onClick={() => handlePublicacionClick(publicacion.id)}>
                        <div className="flex items-center">
                            <div className="mr-4">
                                <ImagenResponsive
                                    srcPC={publicacion.usuario.foto_perfil_PC}
                                    srcTablet={publicacion.usuario.foto_perfil_Tablet}
                                    srcMobile={publicacion.usuario.foto_perfil_Movil}
                                    alt="Imagen de perfil"
                                    className="h-12 w-12 rounded-full"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-lg text-gray-800 max-w-44 break-words">{publicacion.titulo}</p>
                                <p className="text-sm text-gray-600">{`${publicacion.hora_preferente_inicio} - ${publicacion.hora_preferente_final}`}</p>
                            </div>
                            <div className="ml-auto flex items-center">
                                <img
                                    src={`/images/rangos/${convertirRango(publicacion.rango_id)}.png`}
                                    alt={`${publicacion.rango_id} rank`}
                                    className="h-12 w-12"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CarouselPublicaciones;
