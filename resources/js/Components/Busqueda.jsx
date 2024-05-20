import React, { useState, useRef, useEffect } from 'react';
import '../../css/Busqueda.css';

function Busqueda() {
    const [mostrarInput, setMostrarInput] = useState(false);
    const [nickBusqueda, setNickBusqueda] = useState('');
    const inputRef = useRef(null);
    const formularioRef = useRef(null);

    const alternarInput = () => {
        setMostrarInput(true);
    };

    const manejarBusqueda = (e) => {
        e.preventDefault();
        if (nickBusqueda.trim()) {
            window.location.href = `/users/${nickBusqueda.trim()}`;
        }
    };

    const manejarClickFuera = (e) => {
        if (formularioRef.current && !formularioRef.current.contains(e.target)) {
            setMostrarInput(false);
        }
    };

    useEffect(() => {
        if (mostrarInput) {
            inputRef.current.focus();
            document.addEventListener('mousedown', manejarClickFuera);
        }}, [mostrarInput]);

    return (
        <form ref={formularioRef} onSubmit={manejarBusqueda} className="formulario-busqueda">
            {!mostrarInput && (
                <div onClick={alternarInput} className="icono-busqueda">
                    <img src="/images/buscador.svg" alt="Buscador" className="h-6 w-6 mr-2" />
                </div>
            )}
            {mostrarInput && (
                <input
                    ref={inputRef}
                    type="text"
                    value={nickBusqueda}
                    onChange={(e) => setNickBusqueda(e.target.value)}
                    className="input-busqueda"
                />
            )}
        </form>
    );
}

export default Busqueda;
