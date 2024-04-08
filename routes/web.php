<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RangoController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/google-auth/redirect', function () {
    return Socialite::driver('google')->redirect();
});

Route::get('/google-auth/callback', function () {
    // Se obtiene del usuario logueado con GMAIL
    $user_google = Socialite::driver('google')->user();

    // Verifica si el usuario existe en la base de datos utilizando el ID de Google
    $usuarioExiste = User::where('google_id', $user_google->id)->first();

    // Crea o actualiza el usuario en la base de datos
    $user = User::updateOrCreate([
        'google_id' => $user_google->id,
    ], [
        // Se obtiene un nombre aleatorio si el usuario no tiene nombre en la base de datos
        'name' => ($usuarioExiste && !empty($usuarioExiste->name)) ? $usuarioExiste->name : obtenerNombre(),
        'email' => $user_google->email,
    ]);

    Auth::login($user);

    return redirect('/');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('rangos', RangoController::class)
    ->middleware('auth');

require __DIR__.'/auth.php';
