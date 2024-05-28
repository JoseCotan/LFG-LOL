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
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
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

        $authUser = Auth::user();

        // Busca si existe una relación de amistad entre el usuario autenticado y el usuario cuyo perfil se está visitando.
        $amistad = Amigo::where(function ($query) use ($authUser, $user) {
            // Verifica si el usuario autenticado ha enviado una solicitud al usuario del perfil.
            $query->where('usuario_id', $authUser->id)->where('amigo_id', $user->id);
        })->orWhere(function ($query) use ($authUser, $user) {
            // Verifica si el usuario del perfil ha enviado una solicitud al usuario autenticado.
            $query->where('usuario_id', $user->id)->where('amigo_id', $authUser->id);
        })->first();

        // Obtiene una lista de todos los amigos del usuario cuyo perfil se está viendo, que se hayan "aceptado".
        $amigos = Amigo::with(['amigoAgregador', 'amigoAgregado'])
            ->where(function ($query) use ($user) {
                // Busca todas las amistades donde el usuario del perfil es el agregador o agregado.
                $query->where('usuario_id', $user->id)->orWhere('amigo_id', $user->id);
            })
            ->whereIn('estado', ['aceptado'])
            ->get();

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
            $nombreImagen = $request->nombre . '.' . $extension;

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
        $request->user()->save();

        return Inertia::location(route('profile.edit'));
    }
}
