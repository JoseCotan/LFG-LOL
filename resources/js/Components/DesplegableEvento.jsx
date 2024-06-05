import React, { useState } from 'react';
import Select from '@/Components/Select';
import InputLabel from '@/Components/InputLabel';
import ButtonColores from '@/Components/ButtonColores';

const DesplegableEventos = ({ onFiltrar, onReset, setFiltroPublico, setFiltroAmigos, setFiltroMiembrosEquipo }) => {
    const [filtroPublicoLocal, setFiltroPublicoLocal] = useState('');
    const [filtroAmigosLocal, setFiltroAmigosLocal] = useState('');
    const [filtroMiembrosEquipoLocal, setFiltroMiembrosEquipoLocal] = useState('');

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
                value={filtroPublicoLocal}
                onChange={(e) => {
                    setFiltroPublicoLocal(e.target.value);
                    setFiltroPublico(e.target.value);
                }}
                options={[
                    { value: "", label: "Todos" },
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]}
                id="filtroPublico"
            />

            <InputLabel className="mt-4">Acceso amigos</InputLabel>
            <Select
                value={filtroAmigosLocal}
                onChange={(e) => {
                    setFiltroAmigosLocal(e.target.value);
                    setFiltroAmigos(e.target.value);
                }}
                options={[
                    { value: "", label: "Todos" },
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]}
                id="filtroAmigos"
            />

            <InputLabel className="mt-4">Acceso miembros</InputLabel>
            <Select
                value={filtroMiembrosEquipoLocal}
                onChange={(e) => {
                    setFiltroMiembrosEquipoLocal(e.target.value);
                    setFiltroMiembrosEquipo(e.target.value);
                }}
                options={[
                    { value: "", label: "Todos" },
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]}
                id="filtroMiembrosEquipo"
            />

            <div className="flex justify-between mt-6">
                <ButtonColores color="red" onClick={handleReset}>
                    Resetear
                </ButtonColores>
            </div>
        </div>
    );
};

export default DesplegableEventos;
