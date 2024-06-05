import React from 'react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import { usePage } from '@inertiajs/react';
import CarouselUsuarios from '@/Components/CarouselUsuarios';
import CarouselPublicaciones from '@/Components/CarouselPublicaciones'; // Importa el nuevo componente

const Inicio = () => {
    const { ultimosUsuarios, ultimasPublicaciones } = usePage().props; // Asume que tienes `ultimasPublicaciones` en tus props

    return (
        <ControladorLayout>
            <div className="mx-auto px-6 py-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold mb-4">¡Bienvenido a la comunidad LFG-LOL!</h1>
                    <p className="text-lg text-gray-700">Aquí puedes compartir tus ideas, interactuar con otros usuarios y mucho más.</p>
                </div>
                <CarouselUsuarios usuarios={ultimosUsuarios} />
                <CarouselPublicaciones publicaciones={ultimasPublicaciones} />
            </div>
        </ControladorLayout>
    );
};

export default Inicio;
