import React, { useEffect } from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import Button from '@/Components/Button';

const CuentaNoEncontrada = () => {
    useEffect(() => {
        // Redirigir al perfil después de tres segundos
        const timeout = setTimeout(() => {
            window.location.href = '/profile'; // Redirigir al perfil
        }, 7000); // Esperar 7 segundos

        // Limpiar el temporizador cuando el componente se desmonta
        return () => clearTimeout(timeout);
    }, []); // Ejecutar solo una vez al cargar el componente

    const handleIrAlPerfil = () => {
        window.location.href = '/profile';
    };

    return (
        <AuthLayout>
            <div className="text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">¡La cuenta no existe!</h1>
                    <p className="text-lg mb-8">Lo sentimos, la cuenta de League of Legends que ingresaste no existe.</p>
                    <img src="/images/amumu_sad.png" alt="Amumu triste" className="w-1/2 mx-auto mb-8"/>
                    <Button
                        onClick={handleIrAlPerfil}
                    >
                        Volver al perfil
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
};

export default CuentaNoEncontrada;
