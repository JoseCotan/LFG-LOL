import React from 'react';
import Slider from 'react-slick';
import ImagenResponsive from '@/Components/ImagenResponsive';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarouselUsuarios = ({ usuarios }) => {
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

    return (
        <div className="bg-gray-100 rounded-lg p-6 max-w-screen-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Últimos usuarios registrados</h2>
            <Slider {...settings}>
                {usuarios.map(usuario => (
                    <div key={usuario.id} className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between" style={{ fontFamily: 'Spiegel' }}>
                        <div className="flex items-center">
                            <div className="mr-4">
                                <ImagenResponsive
                                    srcPC={usuario.foto_perfil_PC}
                                    srcTablet={usuario.foto_perfil_Tablet}
                                    srcMobile={usuario.foto_perfil_Movil}
                                    alt="Foto de perfil"
                                    className="h-12 w-12 rounded-full"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-lg text-gray-800">{usuario.name}</p>
                                <p className="text-sm text-gray-600">{usuario.nombreLOL}</p>
                            </div>
                            <div className="ml-auto flex items-center">
                                <img
                                    src={`/images/rangos/${usuario.rankedSoloQ}.png`}
                                    alt={`${usuario.rankedSoloQ} rank`}
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

export default CarouselUsuarios;
