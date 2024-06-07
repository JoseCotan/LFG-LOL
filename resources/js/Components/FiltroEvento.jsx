import React, { useState } from 'react';
import Select from '@/Components/Select';
import InputLabel from '@/Components/InputLabel';
import ButtonColores from '@/Components/ButtonColores';

const FiltroEvento = ({ onFiltrar, onReset }) => {
    const [filtroPublico, setFiltroPublico] = useState('');
    const [filtroAmigos, setFiltroAmigos] = useState('');
    const [filtroMiembrosEquipo, setFiltroMiembrosEquipo] = useState('');

    const handleFiltrar = () => {
        onFiltrar(filtroPublico, filtroAmigos, filtroMiembrosEquipo);
    };

    const handleReset = () => {
        setFiltroPublico('');
        setFiltroAmigos('');
        setFiltroMiembrosEquipo('');
        onReset();
    };

    return (
        <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
            <InputLabel>Acceso público</InputLabel>
            <Select
                value={filtroPublico}
                onChange={(e) => setFiltroPublico(e.target.value)}
                options={[
                    { value: '', label: 'Todos' },
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' }
                ]}
                id="filtroPublico"
            />

            <InputLabel className="mt-4">Acceso amigos</InputLabel>
            <Select
                value={filtroAmigos}
                onChange={(e) => setFiltroAmigos(e.target.value)}
                options={[
                    { value: '', label: 'Todos' },
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' }
                ]}
                id="filtroAmigos"
            />

            <InputLabel className="mt-4">Acceso miembros</InputLabel>
            <Select
                value={filtroMiembrosEquipo}
                onChange={(e) => setFiltroMiembrosEquipo(e.target.value)}
                options={[
                    { value: '', label: 'Todos' },
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' }
                ]}
                id="filtroMiembrosEquipo"
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

export default FiltroEvento;
