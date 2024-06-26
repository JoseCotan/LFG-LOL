<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePublicacionRequest;
use App\Http\Requests\UpdatePublicacionRequest;
use App\Models\Modo;
use App\Models\Publicacion;
use App\Models\Rango;
use App\Models\Reputacion;
use App\Models\Rol;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class PublicacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Publicacion::with(['modo', 'rango', 'rol', 'usuario'])
            ->join('users', 'publicaciones.usuario_id', '=', 'users.id')
            ->orderBy('users.VIP', 'DESC')
            ->orderBy('publicaciones.created_at', 'DESC')
            ->select('publicaciones.*');

        if ($request->filled('modo')) {
            $query->where('publicaciones.modo_id', $request->modo);
        }
        if ($request->filled('rango')) {
            $query->where('publicaciones.rango_id', $request->rango);
        }
        if ($request->filled('rol')) {
            $query->where('publicaciones.rol_id', $request->rol);
        }
        if ($request->filled('hora_inicio')) {
            $query->where('publicaciones.hora_preferente_inicio', '>=', $request->hora_inicio);
        }
        if ($request->filled('hora_fin')) {
            $query->where('publicaciones.hora_preferente_final', '<=', $request->hora_fin);
        }

        $publicaciones = $query->paginate(12);

        // Verifica la reputación del usuario y obtiene la imagen correspondiente
        foreach ($publicaciones as $publicacion) {
            $user = $publicacion->usuario;
            $likes = Reputacion::where('usuario_id', $user->id)->where('valoracion', 'like')->count();
            $dislikes = Reputacion::where('usuario_id', $user->id)->where('valoracion', 'dislike')->count();
            $reputacion = $likes - $dislikes;

            // Agrega una propiedad reputacion_img al objeto de la publicación
            $publicacion->reputacion_img = $reputacion > 0;
        }

        $existePublicacion = false;
        if (Auth::check()) {
            $existePublicacion = Publicacion::where('usuario_id', Auth::user()->id)->exists();
        }

        return Inertia::render('Publicaciones/Index', [
            'publicaciones' => $publicaciones,
            'modos' => Modo::all(),
            'rangos' => Rango::all(),
            'roles' => Rol::all(),
            'existePublicacion' => $existePublicacion,
            'flash' => session('flash'),
            'filtros' => $request->only(['modo', 'rango', 'rol', 'hora_inicio', 'hora_fin']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $userId = Auth::user()->id;

        $existePublicacion = Publicacion::where('usuario_id', $userId)->exists();

        if ($existePublicacion) {
            Session::flash('flash', ['type' => 'error', 'message' => 'Ya tienes una publicación creada.']);
            return Inertia::location(route('publicaciones.index'));
        }

        return Inertia::render('Publicaciones/Create', [
            'modos' => Modo::all(),
            'roles' => Rol::all(),
            'rangos' => Rango::all()
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valida los datos ingresados en el formulario.
        $request->validate([
            'titulo' => 'required|string|max:60',
            'descripcion' => 'nullable|string',
            'modo_id' => 'nullable|exists:modos,id',
            'rol_id' => 'nullable|exists:roles,id',
            'rango_id' => 'nullable|exists:rangos,id',
            'hora_preferente_inicio' => 'required|date_format:H:i',
            'hora_preferente_final' => 'required|date_format:H:i|after:hora_preferente_inicio',
        ]);

        // Crea una nueva publicación y asigna cada valor manualmente.
        $publicacion = new Publicacion();
        $publicacion->titulo = $request->input('titulo');
        // Segundo argumento es el valor por defecto si no se proporciona
        $publicacion->modo_id = $request->input('modo_id') ?? 1;
        $publicacion->rol_id = $request->input('rol_id') ?? 1;
        $publicacion->rango_id = $request->input('rango_id') ?? 1;
        $publicacion->hora_preferente_inicio = $request->input('hora_preferente_inicio');
        $publicacion->hora_preferente_final = $request->input('hora_preferente_final');
        $publicacion->usuario_id = Auth::user()->id; // Asigna el ID del usuario autenticado.

        $publicacion->save(); // Guarda la publicación en la base de datos.

        Session::flash('flash', ['type' => 'success', 'message' => 'Tu publicación fue creada.']);
        // Redirige al usuario a la lista de publicaciones.
        return Inertia::location(route('publicaciones.index'));
    }



    /**
     * Display the specified resource.
     */
    public function show(Publicacion $publicacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Publicacion $publicacion)
    {
        $modos = Modo::all();
        $roles = Rol::all();
        $rangos = Rango::all();

        if (!Auth::check()) {
            Session::flash('flash', ['type' => 'error', 'message' =>
            'Debes estar autenticado para editar una publicación.']);
            return Inertia::location(back());
        }

        if (!Auth::user()->admin && Auth::user()->id !== $publicacion->usuario_id) {
            Session::flash('flash', ['type' => 'error', 'message' => 'No puedes editar esta publicación.']);
            return Inertia::location(back());
        }

        return Inertia::render('Publicaciones/Edit', [
            'publicacion' => $publicacion,
            'modos' => $modos,
            'roles' => $roles,
            'rangos' => $rangos,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Publicacion $publicacion)
    {
        // Valida los datos ingresados en el formulario.
        $horaInicio = $request->input('hora_preferente_inicio');
        $horaFinal = $request->input('hora_preferente_final');

        // Verifica el formato de las horas y ajusta si es necesario.
        if (preg_match('/^\d{2}:\d{2}:\d{2}$/', $horaInicio)) {
            $request->merge([
                'hora_preferente_inicio' => Carbon::createFromFormat('H:i:s', $horaInicio)->format('H:i')
            ]);
        }

        if (preg_match('/^\d{2}:\d{2}:\d{2}$/', $horaFinal)) {
            $request->merge([
                'hora_preferente_final' => Carbon::createFromFormat('H:i:s', $horaFinal)->format('H:i')
            ]);
        }

        $request->validate([
            'titulo' => 'required|string|max:60',
            'modo_id' => 'nullable|exists:modos,id',
            'rol_id' => 'nullable|exists:roles,id',
            'rango_id' => 'nullable|exists:rangos,id',
            'hora_preferente_inicio' => 'required|date_format:H:i',
            'hora_preferente_final' => 'required|date_format:H:i|after:hora_preferente_inicio'
        ]);

        // Actualiza la publicación con los datos del formulario.
        $publicacion->update([
            'titulo' => $request->input('titulo'),
            'modo_id' => $request->input('modo_id') ?? 1,
            'rol_id' => $request->input('rol_id') ?? 1,
            'rango_id' => $request->input('rango_id') ?? 1,
            'hora_preferente_inicio' => $request->input('hora_preferente_inicio'),
            'hora_preferente_final' => $request->input('hora_preferente_final'),
        ]);

        if ($request->input('panelAdmin')) {
            return Inertia::location(route('admin.publicaciones.index'));
        }

        Session::flash('flash', ['type' => 'success', 'message' => 'La publicación ha sido actualizada.']);
        // Redirige al usuario a la lista de publicaciones.
        return Inertia::location(route('publicaciones.index'));
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id, Request $request)
    {
        $publicacion = Publicacion::findOrFail($id); // Busca la publicación por ID.

        // Verifica si el usuario no es el creador de la publicación y no es un administrador.
        if (Auth::user()->id !== $publicacion->usuario_id && !Auth::user()->admin) {
            // Si no es el creador ni un administrador, redirige al índice sin eliminar.
            return Inertia::location(route('publicaciones.index'));
        }


        $publicacion->delete();

        // Si el usuario es un administrador, redirige de vuelta a la página anterior.
        if ($request->input('panelAdmin')) {
            return Inertia::location(route('admin.publicaciones.index'));
        }

        // Redirige al índice de publicaciones.
        return Inertia::location(route('publicaciones.index'));
    }
}
