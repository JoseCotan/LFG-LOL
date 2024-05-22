<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class RiotController extends Controller
{
    public function getRiotData($name)
    {
        // Obtener el usuario por nombre
        $user = User::where('name', $name)->first();
        $nombreLOL = $user->nombreLOL;

        // Verificar si el usuario tiene un nombre de usuario de League of Legends guardado
        if (!$nombreLOL) {
            return response()->json(['error' => 'EL usuario no tiene guardado su nombre de invocador.']);
        }

        // Separar el nombre y la etiqueta del usuario de League of Legends
        list($nombre, $tag) = explode('#', $nombreLOL);

        // Clave de API y endpoints de la API de Riot Games
        $apiKey = 'RGAPI-4df7a0f3-d785-4a8d-bb71-37bd821ddd9f';
        $encodedNombre = urlencode($nombre);
        $encodedTag = urlencode($tag);
        $urlObtenerPuuid = "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{$encodedNombre}/{$encodedTag}?api_key={$apiKey}";

        // URL del proxy para CORS
        $urlObtenerPuuidCORS = "http://cors-anywhere.herokuapp.com/{$urlObtenerPuuid}";

        Log::info("URL: {$urlObtenerPuuid}");
        Log::info("URL usando CORS: {$urlObtenerPuuidCORS}");

        try {
            // Realizar la solicitud GET a la API de Riot Games a través del proxy
            $respuesta = Http::withHeaders([
                'Origin' => 'http://localhost', // Especificar un encabezado de origen
            ])->get($urlObtenerPuuidCORS);
            $datosInvocadorAccount = $respuesta->json();

            Log::info("Riot API Estado: {$respuesta->status()}");
            Log::info("Riot API Respuesta: " . json_encode($datosInvocadorAccount));

            // Verificar si la solicitud fue exitosa
            if ($respuesta->failed()) {
                return response()->json(['error' => 'No se pudieron recuperar los datos del invocador.', 'info' => $datosInvocadorAccount], $respuesta->status());
            }

            // Extraer el puuid
            $puuid = $datosInvocadorAccount['puuid'];


            Log::info("PUUID: {$puuid}");

            $urlObtenerDatosInvocador = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{$puuid}?api_key={$apiKey}";

            $urlObtenerDatosInvocadorCORS = "http://cors-anywhere.herokuapp.com/{$urlObtenerDatosInvocador}";

            $respuesta = Http::withHeaders([
                'Origin' => 'http://localhost', // Especificar un encabezado de origen
            ])->get($urlObtenerDatosInvocadorCORS);
            $datosInvocador = $respuesta->json();

            Log::info("Riot API Estado 2: {$respuesta->status()}");
            Log::info("Riot API Respuesta 2: " . json_encode($datosInvocador));

            // Verificar si la segunda solicitud fue exitosa
            if ($respuesta->failed()) {
                return response()->json(['error' => 'No se pudieron recuperar los datos del invocador mediantel el PUUID.', 'info' => $datosInvocador], $respuesta->status());
            }

            // Retornar los datos del invocador como respuesta
            return response()->json(['datosInvocadorAccount' => $datosInvocadorAccount, 'datosInvocador' => $datosInvocador]);
        } catch (\Exception $e) {
            // Manejar errores de excepción y registrarlos en los logs
            return response()->json(['error' => 'Un error ocurrió: ' . $e->getMessage()]);
        }
    }
}
