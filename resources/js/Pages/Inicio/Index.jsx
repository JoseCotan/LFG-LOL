import React from 'react';
import ControladorLayout from '@/Layouts/ControladorLayout';
import { usePage } from '@inertiajs/react';
import CarouselInicio from '@/Components/CarouselInicio';

const Inicio = () => {
    const { ultimosUsuarios } = usePage().props;

    return (
        <ControladorLayout>
            <div className="mx-auto px-6 py-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold mb-4">¡Bienvenido a la comunidad LFG-LOL!</h1>
                    <p className="text-lg text-gray-700">Aquí puedes compartir tus ideas, interactuar con otros usuarios y mucho más.</p>
                </div>
                <CarouselInicio usuarios={ultimosUsuarios} />
            </div>
        </ControladorLayout>
    );
};

export default Inicio;
