<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InicioController extends Controller
{
    //
    public function index()
    {
        /**
         * Display a listing of the resource.
         */
        $user = Auth::user();

        // Obtener la publicación del usuario actual
        $publicacion = $user ? $user->publicacion : null;

        // Obtener los últimos cinco usuarios registrados con nombreLOL no nulo
        $ultimosUsuarios = User::whereNotNull('nombreLOL')->orderBy('created_at', 'desc')->limit(5)->get();

        return Inertia::render('Inicio/Index', [
            'publicacion' => $publicacion,
            'ultimosUsuarios' => $ultimosUsuarios,
        ]);
    }
}
