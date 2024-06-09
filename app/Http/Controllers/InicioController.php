<?php

namespace App\Http\Controllers;

use App\Models\Publicacion;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InicioController extends Controller
{
    public function index()
    {
        // Obtener los últimos cinco usuarios registrados con nombreLOL no nulo
        $ultimosUsuarios = User::whereNotNull('nombreLOL')->orderBy('created_at', 'desc')->limit(5)->get();

        // Obtener las últimas cinco publicaciones junto con los usuarios que las crearon
        $ultimasPublicaciones = Publicacion::with('usuario')->orderBy('created_at', 'desc')->limit(5)->get();

        return Inertia::render('Inicio/Index', [
            'ultimosUsuarios' => $ultimosUsuarios,
            'ultimasPublicaciones' => $ultimasPublicaciones,
            'flash' => session('flash'),
        ]);
    }
}
