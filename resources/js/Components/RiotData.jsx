import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

const RiotData = () => {
    const { props } = usePage();
    const { name } = props;
    const [riotData, setRiotData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRiotData = async () => {
            try {
                const response = await fetch(`/riot-data/${name}`);
                const data = await response.json();
                if (response.ok) {
                    setRiotData(data);
                } else {
                    setError(data.error);
                }
            } catch (error) {
                setError('An error occurred while fetching data.');
            }
        };

        fetchRiotData();
    }, [name]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!riotData) {
        return <div>Cargando datos...</div>;
    }

    return (
        <div>
            <h1>Información</h1>
            {riotData.datosInvocadorAccount && (
                <p>Nombre: {riotData.datosInvocadorAccount.gameName}</p>
            )}
            {riotData.datosInvocador && (
                <p>Nivel: {riotData.datosInvocador.summonerLevel}</p>
            )}
        </div>
    );

};

export default RiotData;
