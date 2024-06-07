import React, { useState } from 'react';
import Select from '@/Components/Select';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import ButtonColores from '@/Components/ButtonColores';

const FiltroPublicaciones = ({ modos, roles, rangos, onFiltrar, onReset }) => {
    const [filtroModo, setFiltroModo] = useState('');
    const [filtroRango, setFiltroRango] = useState('');
    const [filtroRol, setFiltroRol] = useState('');
    const [filtroHoraInicio, setFiltroHoraInicio] = useState('');
    const [filtroHoraFin, setFiltroHoraFin] = useState('');

    const handleFiltrar = () => {
        onFiltrar(filtroModo, filtroRango, filtroRol, filtroHoraInicio, filtroHoraFin);
    };

    const handleReset = () => {
        setFiltroModo('');
        setFiltroRango('');
        setFiltroRol('');
        setFiltroHoraInicio('');
        setFiltroHoraFin('');
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
                id="modo_id"
            />

            <InputLabel className="mt-4">Filtrar por Rango</InputLabel>
            <Select
                value={filtroRango}
                onChange={(e) => setFiltroRango(e.target.value)}
                options={[
                    { value: '', label: 'Todos' },
                    ...rangos.map((rango) => ({ value: rango.id, label: rango.nombre }))
                ]}
                id="rango_id"
            />

            <InputLabel className="mt-4">Filtrar por Rol</InputLabel>
            <Select
                value={filtroRol}
                onChange={(e) => setFiltroRol(e.target.value)}
                options={[
                    { value: '', label: 'Todos' },
                    ...roles.map((rol) => ({ value: rol.id, label: rol.nombre }))
                ]}
                id="rol_id"
            />

            <InputLabel htmlFor="horaInicio">Desde:</InputLabel>
            <TextInput
                type="time"
                id="horaInicio"
                value={filtroHoraInicio}
                onChange={(e) => setFiltroHoraInicio(e.target.value)}
            />
            <InputLabel htmlFor="horaFin">Hasta:</InputLabel>
            <TextInput
                type="time"
                id="horaFin"
                value={filtroHoraFin}
                onChange={(e) => setFiltroHoraFin(e.target.value)}
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

export default FiltroPublicaciones;
