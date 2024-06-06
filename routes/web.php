<?php

use App\Http\Controllers\AmigoController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\InicioController;
use App\Http\Controllers\MensajeController;
use App\Http\Controllers\PaypalController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicacionController;
use App\Http\Controllers\RangoController;
use App\Http\Controllers\RiotController;
use App\Models\Evento;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;


Route::get('/', [InicioController::class, 'index'])->name('inicio');


Route::get('/google-auth/redirect', function () {
    return Socialite::driver('google')->redirect();
});

Route::get('/google-auth/callback', function () {
    // Se obtiene del usuario logueado con GMAIL
    $user_google = Socialite::driver('google')->stateless()->user();

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/photo', [ProfileController::class, 'updateProfilePhoto'])->name('profile.photo');
    Route::post('/profile', [ProfileController::class, 'updateLeagueOfLegendsNick'])->name('profile.updateLeagueOfLegendsNick');
    Route::post('/users/{id}/like', [ProfileController::class, 'like'])->name('users.like');
    Route::post('/users/{id}/dislike', [ProfileController::class, 'dislike'])->name('users.dislike');
});

Route::get('/users/{name}', [ProfileController::class, 'show'])->name('users.show');
Route::post('/users/{user}/comentarios', [ComentarioController::class, 'store'])->name('comentarios.store');


Route::post('/amigos/enviar/{amistadId}', [AmigoController::class, 'enviarSolicitud'])->name('amigos.enviar');
Route::patch('/amigos/aceptar/{amistadId}', [AmigoController::class, 'aceptarSolicitud'])->name('amigos.aceptar');
Route::patch('/amigos/rechazar/{amistadId}', [AmigoController::class, 'rechazarSolicitud'])->name('amigos.rechazar');
Route::delete('/amigos/cancelar/{amistadId}', [AmigoController::class, 'cancelarSolicitud'])->name('amigos.cancelar');
Route::delete('/amigos/eliminar/{amistadId}', [AmigoController::class, 'eliminarAmistad'])->name('amigos.eliminar');

Route::resource('rangos', RangoController::class)
    ->middleware('auth');

Route::resource('eventos', EventoController::class);
Route::get('/eventos/create', [EventoController::class, 'create'])->name('eventos.create')->middleware('auth');
Route::post('eventos/{evento}/unirse', [EventoController::class, 'unirse'])->name('eventos.unirse')->middleware('auth');
Route::post('eventos/{evento}/abandonar', [EventoController::class, 'abandonar'])->name('eventos.abandonar')->middleware('auth');



Route::resource('equipos', EquipoController::class);
Route::get('/equipos/create', [EquipoController::class, 'create'])->name('equipos.create')->middleware('auth');
Route::post('/equipos/unirse/{id}', [EquipoController::class, 'unirse'])->name('equipos.unirse')->middleware('auth');
Route::post('/equipos/{equipoId}/expulsar/{miembroId}', [EquipoController::class, 'expulsarMiembro'])->name('equipos.expulsarMiembro')->middleware('auth');
Route::post('/equipos/{equipoId}/hacer-lider/{miembroId}', [EquipoController::class, 'hacerLider'])->name('equipos.hacerLider')->middleware('auth');
Route::post('/equipos/{id}/abandonar', [EquipoController::class, 'abandonarEquipo'])->name('equipos.abandonarEquipo')->middleware('auth');


Route::resource('publicaciones', PublicacionController::class)->parameters([
    'publicaciones' => 'publicacion'
]);
Route::get('/publicaciones/create', [PublicacionController::class, 'create'])->name('publicaciones.create')->middleware('auth');


Route::post('/enviarMensaje/{destinatarioId}', [MensajeController::class, 'enviarMensaje'])->name('enviarMensaje');

Route::get('/riot-data/{name}', [RiotController::class, 'getRiotData']);

Route::delete('/comentarios/{comentarioId}', [ComentarioController::class, 'destroy'])->name('comentarios.eliminar');


Route::get('/vip', [PaypalController::class, 'index'])->name('vip')->middleware('auth');
Route::post('/paypal', [PaypalController::class, 'paypal'])->name('paypal');
Route::get('/success', [PaypalController::class, 'success'])->name('success');
Route::get('/cancel', [PaypalController::class, 'cancel'])->name('cancel');
require __DIR__ . '/auth.php';
