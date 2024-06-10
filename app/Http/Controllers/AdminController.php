<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Evento;
use App\Models\Publicacion;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        if (Auth::check() && Auth::user()->admin) {
            return Inertia::render('Admin/Index');
        }
        Session::flash('flash', ['type' => 'error', 'message' => 'Acceso restringido.']);
        return Inertia::location(route(('inicio')));
    }

    public function publicaciones(Request $request)
    {
        if (Auth::check() && Auth::user()->admin) {
            $query = Publicacion::with('usuario');

            if ($request->filled('buscarTitulo')) {
                $query->where('titulo', 'ILIKE', '%' . $request->buscarTitulo . '%');
            }

            $publicaciones = $query->paginate(10);

            return Inertia::render('Admin/Publicaciones', [
                'publicaciones' => $publicaciones,
            ]);
        }
        Session::flash('flash', ['type' => 'error', 'message' => 'Acceso restringido.']);
        return Inertia::location(route(('inicio')));
    }


    public function equipos(Request $request)
    {
        if (Auth::check() && Auth::user()->admin) {
            $query = Equipo::with('lider');

            if ($request->filled('buscarEquipo')) {
                $query->where('nombre_equipo', 'ILIKE', '%' . $request->buscarEquipo . '%');
            }

            $equipos = $query->paginate(10);

            return Inertia::render('Admin/Equipos', [
                'equipos' => $equipos,
            ]);
        }
        Session::flash('flash', ['type' => 'error', 'message' => 'Acceso restringido.']);
        return Inertia::location(route(('inicio')));
    }

    public function eventos(Request $request)
    {
        if (Auth::check() && Auth::user()->admin) {
            $query = Evento::with('creador');

            if ($request->filled('buscarEvento')) {
                $query->where('titulo', 'ILIKE', '%' . $request->buscarEvento . '%');
            }

            $eventos = $query->paginate(10);

            return Inertia::render('Admin/Eventos', [
                'eventos' => $eventos,
            ]);
        }
        Session::flash('flash', ['type' => 'error', 'message' => 'Acceso restringido.']);
        return Inertia::location(route(('inicio')));
    }

    public function usuarios(Request $request)
    {
        if (Auth::check() && Auth::user()->admin) {
            $query = User::where('admin', false);

            if ($request->filled('buscarPalabra')) {
                $query->where(function ($query) use ($request) {
                    $query->where('name', 'ILIKE', '%' . $request->buscarPalabra . '%')
                        ->orWhere('email', 'ILIKE', '%' . $request->buscarPalabra . '%');
                });
            }

            $usuarios = $query->paginate(10);

            return Inertia::render('Admin/Usuarios', [
                'usuarios' => $usuarios,
            ]);
        }
        Session::flash('flash', ['type' => 'error', 'message' => 'Acceso restringido.']);
        return Inertia::location(route(('inicio')));
    }
}
