import React from 'react';
import '../../css/RankedComponente.css';

const RankedComponente = ({ rankData }) => {
    const { queueType, tier, rank, leaguePoints, wins, losses } = rankData;

    const convertirTipoRanked = (tipoRanked) => {
        const rangos = {
            "RANKED_SOLO_5x5": "Ranked SoloQ",
            "RANKED_FLEX_SR": "Ranked Flex",
        };
        return rangos[tipoRanked] || tipoRanked;
    };

    return (
        <div className="flex w-350 h-150 border border-gray-300 rounded-lg overflow-hidden mx-2 my-2" style={{ maxWidth: '500px', fontFamily: 'Spiegel' }}>
            <div className="w-150 bg-gray-200">
                <img src={`/images/rangos/${tier.toUpperCase()}.png`} alt="Icono del rango" className="object-cover w-full h-full" />
            </div>
            <div className="flex-grow flex flex-col justify-center px-10 text-gray-900">
                <h1 className="text-3xl font-bold">{convertirTipoRanked(queueType)}</h1>
                <h2 className="text-2xl">{tier} {rank}</h2>
                <p>LP: {leaguePoints}</p>
                <p>Victorias: {wins} - Derrotas: {losses}</p>
            </div>
        </div>
    );
};

export default RankedComponente;
