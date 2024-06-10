import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import RankedComponente from './RankedComponente';
import TarjetaPartida from './TarjetaPartida';
import CargandoDatos from './CargandoDatosRiot';

const DatosRiot = () => {
    const { props } = usePage();
    const { name, perfilNombreLOL } = props; // Obtiene el nombre de usuario y el nombre LOL del perfil de las props
    const [datosRiot, setDatosRiot] = useState(null); // Estado para los datos de Riot
    const [error, setError] = useState(null); // Estado para los errores

    useEffect(() => {
        const fetchDatosRiot = async () => {
            const claveLocalStorage = `datosRiot_${name}`; // Clave para el localStorage
            const datosLocalStorage = localStorage.getItem(claveLocalStorage); // Obtiene los datos del localStorage
            const duracionLocalStorage = 1000 * 60 * 60; // 1 hora en milisegundos
            const tiempoLocalStorage = localStorage.getItem(`${claveLocalStorage}_tiempo`); // Obtiene el tiempo del localStorage

            // Verifica si hay datos en el localStorage y si no han expirado
            if (datosLocalStorage && tiempoLocalStorage && (Date.now() - tiempoLocalStorage < duracionLocalStorage)) {
                const datosParseados = JSON.parse(datosLocalStorage); // Parsea los datos del localStorage
                const nombreCombinado = `${datosParseados.datosInvocadorAccount.gameName}#${datosParseados.datosInvocadorAccount.tagLine}`;
                if (nombreCombinado === perfilNombreLOL) {
                    setDatosRiot(datosParseados); // Si el nombre combinado coincide, establece los datos de Riot
                    return;
                } else {
                    localStorage.removeItem(claveLocalStorage); // Si no coincide, elimina los datos del LocalStorage
                    localStorage.removeItem(`${claveLocalStorage}_tiempo`);
                }
            }

            try {
                // Fetch para obtener los datos de Riot del servidor
                const response = await fetch(`/riot-data/${name}`);
                const datos = await response.json();
                if (response.ok) {
                    const nombreCombinado = `${datos.datosInvocadorAccount.gameName}#${datos.datosInvocadorAccount.tagLine}`;
                    if (nombreCombinado === perfilNombreLOL) {
                        localStorage.setItem(claveLocalStorage, JSON.stringify(datos)); // Almacena los datos en el localStorage
                        localStorage.setItem(`${claveLocalStorage}_tiempo`, Date.now());
                        setDatosRiot(datos); // Establece los datos de Riot
                    } else {
                        setError('Los datos de Riot no coinciden con el perfil.'); // Establece un error si los datos no coinciden
                    }
                } else {
                    setError(datos.error); // Establece un error si la respuesta no es OK
                }
            } catch (error) {
                setError('Se produjo un error al obtener datos.'); // Establece un error si ocurre una excepción
            }
        };

        fetchDatosRiot();
    }, [name, perfilNombreLOL]);

    if (error) {
        return <div className="text-red-500">{error}</div>; // Muestra el error en la interfaz de usuario
    }

    if (!datosRiot) {
        return (
            <CargandoDatos />
        );
    }

    const datosRankSoloQ = datosRiot.rankedSoloQDatos || { tier: 'Unranked', rank: '', lp: 0, wins: 0, losses: 0 };
    const datosRankFlexQ = datosRiot.rankedSoloFlexDatos || { tier: 'Unranked', rank: '', lp: 0, wins: 0, losses: 0 };

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col w-full max-w-md border rounded-lg overflow-hidden font-bold bg-blue-100 mx-auto ml-2 my-1">
                <h1 className="text-xl font-bold p-4">Información</h1>
                {datosRiot.datosInvocadorSummonerv4 && (
                    <div className="p-4">
                        <p className="text-lg">Nombre: {datosRiot.datosInvocadorAccount.gameName + "#" + datosRiot.datosInvocadorAccount.tagLine}</p>
                        <p className="text-lg">Nivel: {datosRiot.datosInvocadorSummonerv4.summonerLevel}</p>
                    </div>
                )}
            </div>

            <div className="w-full max-w-md">
                <RankedComponente rankData={datosRankSoloQ} />
            </div>
            <div className="w-full max-w-md">
                <RankedComponente rankData={datosRankFlexQ} />
            </div>

            <div className="tarjetas-partidas w-full max-w-md">
                {datosRiot.partidasDetalles.map((partida, index) => {
                    console.log(partida.participante.teamPosition)
                    const runasImagen = partida.participante.perks.styles[0]?.selections[0]?.perk
                    ? `/images/runas/${partida.participante.perks.styles[0].selections[0].perk}.webp`
                    : '/images/runas/arena.webp';

                    const hechizo1Id = partida.participante.summoner1Id && partida.participante.summoner1Id < 1000
                    ? partida.participante.summoner1Id
                    : 4;
                    const hechizo1Imagen = `/images/hechizos/${hechizo1Id}.webp`;

                    const hechizo2Id = partida.participante.summoner2Id && partida.participante.summoner2Id < 1000
                    ? partida.participante.summoner2Id
                    : 6;
                    const hechizo2Imagen = `/images/hechizos/${hechizo2Id}.webp`;

                    return (
                        <TarjetaPartida
                            key={index}
                            imagenCampeon={`/images/campeones/${partida.participante.championId}.webp`}
                            imagenesHechizos={[runasImagen, hechizo1Imagen, hechizo2Imagen]}
                            estadisticas1={`${partida.participante.kills} / ${partida.participante.deaths} / ${partida.participante.assists}`}
                            estadisticas2={`${partida.csTotal} CS - ${partida.participacionKills}% Kills P`}
                            estadisticas3={`Hace ${partida.diferenciaTiempo}`}
                            win={partida.participante.win}
                            posicion={partida.participante.teamPosition}
                        />
                    );
                })}
            </div>


        </div>
    );
};

export default DatosRiot;
