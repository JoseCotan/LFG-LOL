import React, { useState } from 'react';
import Select from '@/Components/Select';
import InputLabel from '@/Components/InputLabel';
import ButtonColores from '@/Components/ButtonColores';

const FiltroEquipo = ({ modos, rangos, onFiltrar, onReset }) => {
    const [filtroModo, setFiltroModo] = useState('');
    const [filtroRango, setFiltroRango] = useState('');
    const [filtroPrivacidad, setFiltroPrivacidad] = useState('');

    const handleFiltrar = () => {
        onFiltrar(filtroModo, filtroRango, filtroPrivacidad);
    };

    const handleReset = () => {
        setFiltroModo('');
        setFiltroRango('');
        setFiltroPrivacidad('');
        onReset();
    };

    return (
        <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
            <InputLabel>Filtrar por Modo</InputLabel>
            <Select
                value={filtroModo}
                onChange={(e) => setFiltroModo(e.target.value)}
                options={[
                    { value: '', label: 'Todos' },
                    ...modos.map((modo) => ({ value: modo.id, label: modo.nombre }))
                ]}
                id="filtroModo"
            />

            <InputLabel className="mt-4">Filtrar por Rango</InputLabel>
            <Select
                value={filtroRango}
                onChange={(e) => setFiltroRango(e.target.value)}
                options={[
                    { value: '', label: 'Todos' },
                    ...rangos.map((rango) => ({ value: rango.id, label: rango.nombre }))
                ]}
                id="filtroRango"
            />

            <InputLabel className="mt-4">Filtrar por Privacidad</InputLabel>
            <Select
                value={filtroPrivacidad}
                onChange={(e) => setFiltroPrivacidad(e.target.value)}
                options={[
                    { value: '', label: 'Todos' },
                    { value: 'publico', label: 'Público' },
                    { value: 'privado', label: 'Privado' }
                ]}
                id="filtroPrivacidad"
            />

            <div className="flex justify-between mt-6">
                <ButtonColores color="green" onClick={handleFiltrar}>
                    Filtrar
                </ButtonColores>
                <ButtonColores color="red" onClick={handleReset}>
                    Resetear
                </ButtonColores>
            </div>
        </div>
    );
};

export default FiltroEquipo;
