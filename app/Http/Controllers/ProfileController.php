<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
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
        $user = User::where('name', $name)->firstOrFail();
        return Inertia::render('Users/Show', ['user' => $user]);
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
}
