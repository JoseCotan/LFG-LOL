import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import RankedComponente from './RankedComponente';
import TarjetaPartida from './TarjetaPartida';

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
                setError('Se produjo un error al obtener datos.');
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

    const soloQRankData = riotData.rankedSoloQDatos || { tier: 'Unranked', rank: '', lp: 0, wins: 0, losses: 0 };
    const soloFlexRankData = riotData.rankedSoloFlexDatos || { tier: 'Unranked', rank: '', lp: 0, wins: 0, losses: 0 };
    return (
        <div>
            <h1>Información</h1>
            {riotData.datosInvocadorSummonerv4 && (
                <div>
                    <p>Nombre: {riotData.datosInvocadorAccount.gameName}</p>
                    <p>Nivel: {riotData.datosInvocadorSummonerv4.summonerLevel}</p>
                </div>
            )}
            <RankedComponente rankData={soloQRankData} />
            <RankedComponente rankData={soloFlexRankData} />

            <div className="tarjetas-partidas">
                {riotData.partidasDetalles.map((partida, index) => (
                    <TarjetaPartida
                        key={index}
                        imagenCampeon={`/images/campeones/${partida.participante.championId}.webp`}
                        imagenesHechizos={[
                            `/images/runas/${partida.participante.perks.styles[0].selections[0].perk}.webp`,
                            `/images/hechizos/${partida.participante.summoner1Id}.webp`,
                            `/images/hechizos/${partida.participante.summoner2Id}.webp`
                        ]}
                        estadisticas1={`${partida.participante.kills} / ${partida.participante.deaths} / ${partida.participante.assists}`}
                        estadisticas2={`${partida.csTotal} CS - ${partida.participacionKills}% Kills P`}
                        estadisticas3={`Hace ${partida.diferenciaTiempo}`}
                        win={partida.participante.win}
                        posicion={partida.participante.teamPosition}
                    />
                ))}
            </div>
        </div>
    );
};

export default RiotData;
