<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Amigo;
use App\Models\Reputacion;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:users,name']
        ]);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function show($name)
    {
        // Encuentra al usuario por su nombre. Si no lo encuentra, lanza un error.
        $user = User::where('name', $name)->firstOrFail();

        // Obtiene una lista de todos los amigos del usuario cuyo perfil se está viendo, que se hayan "aceptado".
        $amigos = Amigo::with(['amigoAgregador', 'amigoAgregado'])
            ->where(function ($query) use ($user) {
                // Busca todas las amistades donde el usuario del perfil es el agregador o agregado.
                $query->where('usuario_id', $user->id)->orWhere('amigo_id', $user->id);
            })
            ->whereIn('estado', ['aceptado'])
            ->get();

        // Si el usuario está autenticado, se comprueba su interacción con el perfil del usuario visitado
        if (Auth::check()) {
            $authUser = Auth::user();

            // Busca si existe una relación de amistad entre el usuario autenticado y el usuario cuyo perfil se está visitando.
            $amistad = Amigo::where(function ($query) use ($authUser, $user) {
                // Verifica si el usuario autenticado ha enviado una solicitud al usuario del perfil.
                $query->where('usuario_id', $authUser->id)->where('amigo_id', $user->id);
            })->orWhere(function ($query) use ($authUser, $user) {
                // Verifica si el usuario del perfil ha enviado una solicitud al usuario autenticado.
                $query->where('usuario_id', $user->id)->where('amigo_id', $authUser->id);
            })->first();

            // Comprueba si el usuario autenticado ha comentado en el perfil del usuario visitado
            $haComentado = $user->comentarios()->where('user_id', $authUser->id)->exists();

            // Comprueba si el usuario autenticado ha dado like al perfil del usuario visitado
            $haDadoLike = Reputacion::where('usuario_id', $user->id)
                ->where('valorador_id', $authUser->id)
                ->where('valoracion', 'like')
                ->exists();

            // Comprueba si el usuario autenticado ha dado dislike al perfil del usuario visitado
            $haDadoDislike = Reputacion::where('usuario_id', $user->id)
                ->where('valorador_id', $authUser->id)
                ->where('valoracion', 'dislike')
                ->exists();
        } else {
            // Si no hay usuario autenticado, se establecen los valores por defecto para las variables de interacción
            $amistad = false;
            $haComentado = false;
            $haDadoLike = false;
            $haDadoDislike = false;
        }

        // Calcula la reputación del usuario
        $likes = Reputacion::where('usuario_id', $user->id)->where('valoracion', 'like')->count();
        $dislikes = Reputacion::where('usuario_id', $user->id)->where('valoracion', 'dislike')->count();
        $reputacion = $likes - $dislikes;

        return Inertia::render('Users/Show', [
            'user' => $user,
            'amistad' => $amistad,
            'amigos' => $amigos,
            'reputacion' => $reputacion,
            'name' => $user->name,
            'perfilNombreLOL' => $user->nombreLOL,
            'comentarios' => $user->comentarios()->with('user')->get(),
            'haComentado' => $haComentado,
            'haDadoLike' => $haDadoLike,
            'haDadoDislike' => $haDadoDislike,
            'flash' => session('flash'),
        ]);
    }


    public function updateProfilePhoto(Request $request)
    {
        $request->validate([
            'foto_perfil' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $user = $request->user();
        $rutaCarpeta = public_path('images/fotosPerfil');
        if (!File::isDirectory($rutaCarpeta)) {
            File::makeDirectory($rutaCarpeta);
        }

        if ($request->hasFile('foto_perfil')) {
            $manager = new ImageManager(new Driver());

            $extension = $request->foto_perfil->extension();
            $nombreImagen = $user->id . '_' . time() . '.' . $extension;

            // Ruta de almacenamiento para cada versión de la imagen
            $rutaPC = public_path('images/fotosPerfil/imagenPC_' . $nombreImagen);
            $rutaTablet = public_path('images/fotosPerfil/imagenTablet_' . $nombreImagen);
            $rutaMovil = public_path('images/fotosPerfil/imagenMovil_' . $nombreImagen);

            // Abrir la imagen con ImageManager
            $imagen = $manager->read($request->foto_perfil->path());

            // Redimensionar para PC
            $imagen->resize(800, 800);
            $imagen->save($rutaPC);

            // Redimensionar para Tablet
            $imagen->resize(600, 600);
            $imagen->save($rutaTablet);

            // Redimensionar para Móvil
            $imagen->resize(400, 400);
            $imagen->save($rutaMovil);

            // Actualizar las columnas de imagen en la base de datos
            $user->foto_perfil_PC = 'images/fotosPerfil/imagenPC_' . $nombreImagen;
            $user->foto_perfil_Tablet = 'images/fotosPerfil/imagenTablet_' . $nombreImagen;
            $user->foto_perfil_Movil = 'images/fotosPerfil/imagenMovil_' . $nombreImagen;
        }

        $user->save();
        return Inertia::location(route('profile.edit'));
    }

    public function like($id)
    {
        $user = User::findOrFail($id);
        $authUser = Auth::user();

        $existeValoracion = Reputacion::where('usuario_id', $user->id)
            ->where('valorador_id', $authUser->id)
            ->first();

        if ($existeValoracion) {
            if ($existeValoracion->valoracion === 'like') {
                Session::flash('flash', ['type' => 'error', 'message' => 'Ya le diste Like a ' . $user->name]);
                return Inertia::location(route('users.show', ['name' => $user->name]));
            } else {
                $existeValoracion->update(['valoracion' => 'like']);
            }
        } else {
            Reputacion::create([
                'usuario_id' => $user->id,
                'valorador_id' => $authUser->id,
                'valoracion' => 'like',
            ]);
        }

        Session::flash('flash', ['type' => 'success', 'message' => 'Le has dado Like a ' . $user->name]);
        return Inertia::location(route('users.show', ['name' => $user->name]));
    }

    public function dislike($id)
    {
        $user = User::findOrFail($id);
        $authUser = Auth::user();

        $existeValoracion = Reputacion::where('usuario_id', $user->id)
            ->where('valorador_id', $authUser->id)
            ->first();

        if ($existeValoracion) {
            if ($existeValoracion->valoracion === 'dislike') {
                Session::flash('flash', ['type' => 'error', 'message' => 'Ya le diste Dislike a ' . $user->name]);
                return Inertia::location(route('users.show', ['name' => $user->name]));
            } else {
                $existeValoracion->update(['valoracion' => 'dislike']);
            }
        } else {
            Reputacion::create([
                'usuario_id' => $user->id,
                'valorador_id' => $authUser->id,
                'valoracion' => 'dislike',
            ]);
        }
        Session::flash('flash', ['type' => 'success', 'message' => 'Le has dado Dislike a ' . $user->name]);
        return Inertia::location(route('users.show', ['name' => $user->name]));
    }

    public function updateLeagueOfLegendsNick(Request $request)
    {
        $request->validate([
            'nick' => 'required|string|max:30',
            'tag' => 'required|string|max:6',
        ]);

        $user = Auth::user();
        $user->nombreLOL = $request->nick . '#' . $request->tag;
        list($nombre, $tag) = explode('#', $user->nombreLOL);

        $apiKey = env('RIOT_API_KEY');
        $encodedNombre = urlencode($nombre);
        $encodedTag = urlencode($tag);
        $urlObtenerPuuid = "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{$encodedNombre}/{$encodedTag}?api_key={$apiKey}";
        $urlObtenerPuuidCORS = "http://cors-anywhere.herokuapp.com/{$urlObtenerPuuid}";


        try {
            // ------------------------------- OBTENER PUUID DE LA CUENTA ------------------------------------ //
            $respuesta = Http::withHeaders([
                'Origin' => 'http://localhost',
            ])->get($urlObtenerPuuidCORS);

            if ($respuesta->failed()) {
                $user->rankedSoloQ = null;
                $user->rankedFlex = null;
                $user->nombreLOL = null;
                $request->user()->save();

                return Inertia::render('CuentaNoEncontrada');
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

            if ($rankedSoloQDatos) {
                $user->rankedSoloQ = $rankedSoloQDatos['tier'];
            } else {
                $user->rankedSoloQ = "UNRANKED";
            }

            if ($rankedSoloFlexDatos) {
                $user->rankedFlex = $rankedSoloFlexDatos['tier'];
            } else {
                $user->rankedFlex = "UNRANKED";

            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Un error ocurrió: ' . $e->getMessage()]);
        }
        $request->user()->save();

        return Inertia::location(route('profile.edit'));
    }
}
