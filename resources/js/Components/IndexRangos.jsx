import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RangosList = () => {
    const [rangos, setRangos] = useState([]);

    useEffect(() => {
        fetchRangos();
    }, []);

    const fetchRangos = async () => {
        try {
            const response = await axios.get('/api/rangos');
            setRangos(response.data);
        } catch (error) {
            console.error('Error fetching rangos:', error);
        }
    };

    return (
        <div>
            <h1>Listado de Rangos</h1>
            <ul>
                {rangos.map(rango => (
                    <li key={rango.id}>{rango.nombre}</li>
                ))}
            </ul>
        </div>
    );
};

export default RangosList;
