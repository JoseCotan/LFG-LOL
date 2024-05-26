<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use App\Models\User;
use Carbon\Carbon;

class RiotController extends Controller
{
    public function getRiotData($name)
    {
        // Obtener el usuario por nombre
        $user = User::where('name', $name)->first();
        $nombreLOL = $user->nombreLOL;

        // Verificar si el usuario tiene un nombre de usuario de League of Legends guardado
        if (!$nombreLOL) {
            return response()->json(['error' => 'El usuario no tiene guardado su nombre de invocador.']);
        }

        // Separar el nombre y la etiqueta del usuario de League of Legends
        list($nombre, $tag) = explode('#', $nombreLOL);

        // Clave de API y endpoints de la API de Riot Games
        $apiKey = env('RIOT_API_KEY');
        $encodedNombre = urlencode($nombre);
        $encodedTag = urlencode($tag);
        $urlObtenerPuuid = "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{$encodedNombre}/{$encodedTag}?api_key={$apiKey}";

        // URL del proxy para CORS
        $urlObtenerPuuidCORS = "http://cors-anywhere.herokuapp.com/{$urlObtenerPuuid}";

        Log::info("URL: {$urlObtenerPuuid}");
        Log::info("URL usando CORS: {$urlObtenerPuuidCORS}");

        try {
            // ------------------------------- OBTENER PUUID DE LA CUENTA ------------------------------------ //
            $cacheKeyPuuid = "puuid_{$nombreLOL}";
            $datosInvocadorAccount = Cache::remember($cacheKeyPuuid, 6000, function () use ($urlObtenerPuuidCORS) {
                $respuesta = Http::withHeaders([
                    'Origin' => 'http://localhost',
                ])->get($urlObtenerPuuidCORS);

                if ($respuesta->failed()) {
                    throw new \Exception('No se pudieron recuperar los datos del invocador.');
                }

                return $respuesta->json();
            });

            Log::info("Riot API Respuesta: " . json_encode($datosInvocadorAccount));

            // Extraer el puuid
            $puuid = $datosInvocadorAccount['puuid'];
            Log::info("PUUID: {$puuid}");

            // ------------------------------- OBTENER ID DE LA CUENTA --------------------------------------- //
            $cacheKeySummonerV4 = "summonerv4_{$puuid}";
            $datosInvocadorSummonerv4 = Cache::remember($cacheKeySummonerV4, 6000, function () use ($puuid, $apiKey) {
                $urlObtenerDatosInvocador = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{$puuid}?api_key={$apiKey}";
                $urlObtenerDatosInvocadorCORS = "http://cors-anywhere.herokuapp.com/{$urlObtenerDatosInvocador}";

                $respuesta = Http::withHeaders([
                    'Origin' => 'http://localhost',
                ])->get($urlObtenerDatosInvocadorCORS);

                if ($respuesta->failed()) {
                    throw new \Exception('No se pudieron recuperar los datos del invocador.');
                }

                return $respuesta->json();
            });

            $id = $datosInvocadorSummonerv4['id'];
            Log::info("Riot API Respuesta 2: " . json_encode($datosInvocadorSummonerv4));

            // ------------------------------- OBTENER DATOS DE RANKED SOLOQ --------------------------------- //
            $cacheKeyRankedSoloQ = "rankedSoloQ_{$id}";
            $datosInvocadorLeaguev4 = Cache::remember($cacheKeyRankedSoloQ, 6000, function () use ($id, $apiKey) {
                $urlObtenerDatosRanked = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/{$id}?api_key={$apiKey}";
                $urlObtenerDatosRankedCORS = "http://cors-anywhere.herokuapp.com/{$urlObtenerDatosRanked}";

                $respuesta = Http::withHeaders([
                    'Origin' => 'http://localhost',
                ])->get($urlObtenerDatosRankedCORS);

                if ($respuesta->failed()) {
                    throw new \Exception('No se pudieron recuperar los datos del invocador.');
                }

                return $respuesta->json();
            });

            $rankedSoloQDatos = collect($datosInvocadorLeaguev4)->firstWhere('queueType', 'RANKED_SOLO_5x5');

            // ------------------------------- OBTENER DATOS DE RANKED FLEX ---------------------------------- //
            $rankedSoloFlexDatos = collect($datosInvocadorLeaguev4)->firstWhere('queueType', 'RANKED_FLEX_SR');

            // ------------------------------- OBTENER ID DE LAS ÚLTIMAS PARTIDAS ---------------------------- //
            $cacheKeyUltimasPartidas = "ultimasPartidas_{$puuid}";
            $datosInvocadorMatchv5 = Cache::remember($cacheKeyUltimasPartidas, 6000, function () use ($puuid, $apiKey) {
                $urlObtenerUltimasPartidas = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/{$puuid}/ids?start=0&count=20&api_key={$apiKey}";
                $urlObtenerUltimasPartidasCORS = "http://cors-anywhere.herokuapp.com/{$urlObtenerUltimasPartidas}";

                $respuesta = Http::withHeaders([
                    'Origin' => 'http://localhost',
                ])->get($urlObtenerUltimasPartidasCORS);

                if ($respuesta->failed()) {
                    throw new \Exception('No se pudieron recuperar los datos del invocador.');
                }

                return $respuesta->json();
            });

            $primerasCincoPartidas = array_slice($datosInvocadorMatchv5, 0, 5);
            $partidasDetalles = [];

            // ------------------------------- OBTENER DATOS DE LAS PARTIDAS --------------------------------- //
            foreach ($primerasCincoPartidas as $partidaId) {
                // Clave de caché para esta partida
                $cacheKeyPartida = "partida_{$partidaId}";
                $datosInvocadorMatchv5Partida = Cache::remember($cacheKeyPartida, 6000, function () use ($partidaId, $apiKey) {
                    $urlObtenerDatosPartida = "https://europe.api.riotgames.com/lol/match/v5/matches/{$partidaId}?api_key={$apiKey}";
                    $urlObtenerDatosPartidaCORS = "http://cors-anywhere.herokuapp.com/{$urlObtenerDatosPartida}";

                    $respuesta = Http::withHeaders([
                        'Origin' => 'http://localhost',
                    ])->get($urlObtenerDatosPartidaCORS);

                    if ($respuesta->failed()) {
                        throw new \Exception('No se pudieron recuperar los datos del invocador.');
                    }

                    return $respuesta->json();
                });

                // Dice el tipo de cola (420 --> soloq, 440 --> flex, 450 --> aram)
                $queueId = $datosInvocadorMatchv5Partida['info']['queueId'];

                // Información de todos los participantes de la partida
                $participantes = $datosInvocadorMatchv5Partida['info']['participants'];

                // Información del participante del perfil que se ha visitado
                $participante = collect($participantes)->firstWhere('puuid', $puuid);

                // Guarda el identificador del equipo
                $teamId = $participante['teamId'];

                // Crear una colección de los participantes
                $coleccionParticipantes = collect($participantes);

                // Filtrar los participantes por el mismo teamId
                $participantesMismoEquipo = $coleccionParticipantes->filter(function ($item) use ($teamId) {
                    return $item['teamId'] === $teamId;
                });

                // Suma de las kills del equipo
                $sumaKills = $participantesMismoEquipo->sum('kills');

                // Calcular el CS total y el porcentaje de participación en kills
                $csTotal = $participante['neutralMinionsKilled'] + $participante['totalMinionsKilled'];
                $participacionKills = $sumaKills > 0 ? round(($participante['kills'] + $participante['assists']) / $sumaKills * 100) : 0;

                // Calcular hace cuánto tiempo fue la partida
                $timestampFinPartida = (int)($datosInvocadorMatchv5Partida['info']['gameEndTimestamp'] / 1000);
                $tiempoPartida = Carbon::createFromTimestamp($timestampFinPartida);
                $diferenciaTiempo = Carbon::now()->diffForHumans($tiempoPartida, true);

                log::info($diferenciaTiempo);
                // Añadir los datos de la partida a la lista
                $partidasDetalles[] = [
                    'queueId' => $queueId,
                    'participante' => $participante,
                    'csTotal' => $csTotal,
                    'participacionKills' => $participacionKills,
                    'sumaKills' => $sumaKills,
                    'diferenciaTiempo' => $diferenciaTiempo,
                ];
            }

            log::info($participantes);
            // `/images/runas/${partida.participante.perks.styles[0].selections[0].perks}.webp`,
            // $participante['assists'] --> asistencias
            // $participante['deaths'] --> deaths (muertes)
            // $participante['kills'] --> kills
            // $participante['win'] --> booleano que te devuelve si has ganado o no
            // $participante['teamPosition'] --> posición, por ej. Jungla
            // $participante['neutralMinionsKilled'] + $participante['totalMinionsKilled'] --> cs total
            // $participante['summoner1Id'] --> summoner de la D
            // $participante['summoner2Id'] --> summoner de la F
            // summoner 4 --> probablemente FLASH
            // summoner 11 --> probablemente SMITE
            // $datosInvocadorMatchv5Partida['info']['gameEndTimestamp'] --> timestamp de cuando acabó la partida (quitar las tres últimas cifras)
            // ($participante['kills'] + $participante['assists']) / $sumaKills * 100)


            // Retornar los datos del invocador como respuesta
            return response()->json([
                'datosInvocadorAccount' => $datosInvocadorAccount,
                'datosInvocadorSummonerv4' => $datosInvocadorSummonerv4,
                'rankedSoloQDatos' => $rankedSoloQDatos,
                'rankedSoloFlexDatos' => $rankedSoloFlexDatos,
                'partidasDetalles' => $partidasDetalles
            ]);
        } catch (\Exception $e) {
            // Manejar errores de excepción y registrarlos en los logs
            return response()->json(['error' => 'Un error ocurrió: ' . $e->getMessage()]);
        }
    }
}
