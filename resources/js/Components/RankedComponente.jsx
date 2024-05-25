import React from 'react';
import '../../css/RankedComponente.css';

const RankedComponente = ({ rankData }) => {
    const { tier, rank, leaguePoints, wins, losses } = rankData;

    return (
        <div className="tarjeta">
            <div className="imagen-rango">
                <img src={`/images/rangos/${tier.toUpperCase()}.png`} alt="Icono del rango" />
            </div>
            <div className="tarjeta-info">
                <h2>{tier} {rank}</h2>
                <p>LP: {leaguePoints}</p>
                <p>Wins: {wins} - Losses: {losses}</p>
            </div>
        </div>
    );
};

export default RankedComponente;
