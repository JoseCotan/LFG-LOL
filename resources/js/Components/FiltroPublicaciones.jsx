import React, { useState } from 'react';
import Select from '@/Components/Select';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import ButtonColores from '@/Components/ButtonColores';

const FiltroPublicaciones = ({ modos, roles, rangos, onReset, setFiltroModo, setFiltroRango, setFiltroRol, setFiltroHoraInicio, setFiltroHoraFin }) => {
    const [filtroModo, setFiltroModoLocal] = useState('');
    const [filtroRango, setFiltroRangoLocal] = useState('');
    const [filtroRol, setFiltroRolLocal] = useState('');
    const [filtroHoraInicio, setFiltroHoraInicioLocal] = useState('');
    const [filtroHoraFin, setFiltroHoraFinLocal] = useState('');

    const handleReset = () => {
        setFiltroModo('');
        setFiltroRango('');
        setFiltroRol('');
        setFiltroHoraInicio('');
        setFiltroHoraFin('');
        setFiltroModoLocal('');
        setFiltroRangoLocal('');
        setFiltroRolLocal('');
        setFiltroHoraInicioLocal('');
        setFiltroHoraFinLocal('');
        onReset();
    };

    return (
        <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
            <InputLabel>Filtrar por Modo</InputLabel>
            <Select
                value={filtroModo}
                onChange={(e) => {
                    setFiltroModoLocal(e.target.value);
                    setFiltroModo(e.target.value);
                }}
                options={[
                    { value: '', label: 'Todos' },
                    ...modos.map((modo) => ({ value: modo.id, label: modo.nombre }))
                ]}
                id="modo_id"
            />

            <InputLabel className="mt-4">Filtrar por Rango</InputLabel>
            <Select
                value={filtroRango}
                onChange={(e) => {
                    setFiltroRangoLocal(e.target.value);
                    setFiltroRango(e.target.value);
                }}
                options={[
                    { value: '', label: 'Todos' },
                    ...rangos.map((rango) => ({ value: rango.id, label: rango.nombre }))
                ]}
                id="rango_id"
            />

            <InputLabel className="mt-4">Filtrar por Rol</InputLabel>
            <Select
                value={filtroRol}
                onChange={(e) => {
                    setFiltroRolLocal(e.target.value);
                    setFiltroRol(e.target.value);
                }}
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
                onChange={(e) => {
                    setFiltroHoraInicioLocal(e.target.value);
                    setFiltroHoraInicio(e.target.value);
                }}
            />
            <InputLabel htmlFor="horaFin">Hasta:</InputLabel>
            <TextInput
                type="time"
                id="horaFin"
                value={filtroHoraFin}
                onChange={(e) => {
                    setFiltroHoraFinLocal(e.target.value);
                    setFiltroHoraFin(e.target.value);
                }}            />
            <div className="flex justify-between mt-6">
                <ButtonColores color="red" onClick={handleReset}>
                    Resetear
                </ButtonColores>
            </div>
        </div>
    );
};

export default FiltroPublicaciones;
