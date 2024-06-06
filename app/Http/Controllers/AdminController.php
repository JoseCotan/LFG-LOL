<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Evento;
use App\Models\Publicacion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Index');
    }

    public function publicaciones()
    {
        $publicaciones = Publicacion::with('usuario')->get();

        return Inertia::render('Admin/Publicaciones', [
            'publicaciones' => $publicaciones,
        ]);
    }

    public function equipos()
    {
    }

    public function eventos()
    {
    }
}
