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
        $equipos = Equipo::with('lider')->get();

        return Inertia::render('Admin/Equipos', [
            'equipos' => $equipos,
        ]);
    }

    public function eventos()
    {
        $eventos = Evento::with('creador')->get();

        return Inertia::render('Admin/Eventos', [
            'eventos' => $eventos,
        ]);
    }
}
