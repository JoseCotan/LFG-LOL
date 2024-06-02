<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
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
            $respuesta = Http::withHeaders([
                'Origin' => 'http://localhost',
            ])->get($urlObtenerPuuidCORS);

            if ($respuesta->failed()) {
                throw new \Exception('No se pudieron recuperar los datos del invocador.');
            }

            $datosInvocadorAccount = $respuesta->json();
            Log::info("Riot API Respuesta: " . json_encode($datosInvocadorAccount));

            // Extraer el puuid
            $puuid = $datosInvocadorAccount['puuid'];
            Log::info("PUUID: {$puuid}");

            // ------------------------------- OBTENER ID DE LA CUENTA --------------------------------------- //
            $urlObtenerDatosInvocador = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{$puuid}?api_key={$apiKey}";
            $urlObtenerDatosInvocadorCORS = "http://cors-anywhere.herokuapp.com/{$urlObtenerDatosInvocador}";

            $respuesta = Http::withHeaders([
                'Origin' => 'http://localhost',
            ])->get($urlObtenerDatosInvocadorCORS);

            if ($respuesta->failed()) {
                throw new \Exception('No se pudieron recuperar los datos del invocador.');
            }

            $datosInvocadorSummonerv4 = $respuesta->json();
            $id = $datosInvocadorSummonerv4['id'];
            Log::info("Riot API Respuesta 2: " . json_encode($datosInvocadorSummonerv4));

            // ------------------------------- OBTENER DATOS DE RANKED SOLOQ --------------------------------- //
            $urlObtenerDatosRanked = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/{$id}?api_key={$apiKey}";
            $urlObtenerDatosRankedCORS = "http://cors-anywhere.herokuapp.com/{$urlObtenerDatosRanked}";

            $respuesta = Http::withHeaders([
                'Origin' => 'http://localhost',
            ])->get($urlObtenerDatosRankedCORS);

            if ($respuesta->failed()) {
                throw new \Exception('No se pudieron recuperar los datos del invocador.');
            }

            $datosInvocadorLeaguev4 = $respuesta->json();
            $rankedSoloQDatos = collect($datosInvocadorLeaguev4)->firstWhere('queueType', 'RANKED_SOLO_5x5');
            $rankedSoloFlexDatos = collect($datosInvocadorLeaguev4)->firstWhere('queueType', 'RANKED_FLEX_SR');

            // ------------------------------- OBTENER ID DE LAS ÚLTIMAS PARTIDAS ---------------------------- //
            $urlObtenerUltimasPartidas = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/{$puuid}/ids?start=0&count=20&api_key={$apiKey}";
            $urlObtenerUltimasPartidasCORS = "http://cors-anywhere.herokuapp.com/{$urlObtenerUltimasPartidas}";

            $respuesta = Http::withHeaders([
                'Origin' => 'http://localhost',
            ])->get($urlObtenerUltimasPartidasCORS);

            if ($respuesta->failed()) {
                throw new \Exception('No se pudieron recuperar los datos del invocador.');
            }

            $datosInvocadorMatchv5 = $respuesta->json();
            $primerasCincoPartidas = array_slice($datosInvocadorMatchv5, 0, 5);
            $partidasDetalles = [];

            // ------------------------------- OBTENER DATOS DE LAS PARTIDAS --------------------------------- //
            foreach ($primerasCincoPartidas as $partidaId) {
                $urlObtenerDatosPartida = "https://europe.api.riotgames.com/lol/match/v5/matches/{$partidaId}?api_key={$apiKey}";
                $urlObtenerDatosPartidaCORS = "http://cors-anywhere.herokuapp.com/{$urlObtenerDatosPartida}";

                $respuesta = Http::withHeaders([
                    'Origin' => 'http://localhost',
                ])->get($urlObtenerDatosPartidaCORS);

                if ($respuesta->failed()) {
                    throw new \Exception('No se pudieron recuperar los datos del invocador.');
                }

                $datosInvocadorMatchv5Partida = $respuesta->json();
                $queueId = $datosInvocadorMatchv5Partida['info']['queueId'];
                $participantes = $datosInvocadorMatchv5Partida['info']['participants'];
                $participante = collect($participantes)->firstWhere('puuid', $puuid);
                $teamId = $participante['teamId'];
                $coleccionParticipantes = collect($participantes);
                $participantesMismoEquipo = $coleccionParticipantes->filter(function ($item) use ($teamId) {
                    return $item['teamId'] === $teamId;
                });

                $sumaKills = $participantesMismoEquipo->sum('kills');
                $csTotal = $participante['neutralMinionsKilled'] + $participante['totalMinionsKilled'];
                $participacionKills = $sumaKills > 0 ? round(($participante['kills'] + $participante['assists']) / $sumaKills * 100) : 0;

                $timestampFinPartida = (int)($datosInvocadorMatchv5Partida['info']['gameEndTimestamp'] / 1000);
                $tiempoPartida = Carbon::createFromTimestamp($timestampFinPartida);
                $diferenciaTiempo = Carbon::now()->diffForHumans($tiempoPartida, true);

                log::info($participante);

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

            return response()->json([
                'datosInvocadorAccount' => $datosInvocadorAccount,
                'datosInvocadorSummonerv4' => $datosInvocadorSummonerv4,
                'rankedSoloQDatos' => $rankedSoloQDatos,
                'rankedSoloFlexDatos' => $rankedSoloFlexDatos,
                'partidasDetalles' => $partidasDetalles
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Un error ocurrió: ' . $e->getMessage()]);
        }
    }
}
