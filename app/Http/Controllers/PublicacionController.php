<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePublicacionRequest;
use App\Http\Requests\UpdatePublicacionRequest;
use App\Models\Modo;
use App\Models\Publicacion;
use App\Models\Rango;
use App\Models\Rol;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PublicacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $publicaciones = Publicacion::with(['modo', 'rango', 'rol'])
            ->join('users', 'publicaciones.usuario_id', '=', 'users.id')
            ->orderBy('users.VIP', 'DESC')
            ->orderBy('publicaciones.created_at', 'DESC')
            ->paginate(20);

        $existePublicacion = Publicacion::where('usuario_id', Auth::id())->exists();

        return Inertia::render('Publicaciones/Index', [
            'publicaciones' => $publicaciones,
            'modos' => Modo::all(),
            'rangos' => Rango::all(),
            'roles' => Rol::all(),
            'existePublicacion' => $existePublicacion,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $userId = Auth::id();

        $existePublicacion = Publicacion::where('usuario_id', $userId)->exists();

        if ($existePublicacion) {
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
            'titulo' => 'required|string|max:255',
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
        $publicacion->descripcion = $request->input('descripcion');
        // Segundo argumento es el valor por defecto si no se proporciona
        $publicacion->modo_id = $request->input('modo_id') ?? 1;
        $publicacion->rol_id = $request->input('rol_id') ?? 1;
        $publicacion->rango_id = $request->input('rango_id') ?? 1;
        $publicacion->hora_preferente_inicio = $request->input('hora_preferente_inicio');
        $publicacion->hora_preferente_final = $request->input('hora_preferente_final');
        $publicacion->usuario_id = Auth::user()->id; // Asigna el ID del usuario autenticado.

        $publicacion->save(); // Guarda la publicación en la base de datos.

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

        if (Auth::user()->id !== $publicacion->usuario_id) {
            abort(403, 'No estás autorizado para editar esta publicación.');
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
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'modo_id' => 'nullable|exists:modos,id',
            'rol_id' => 'nullable|exists:roles,id',
            'rango_id' => 'nullable|exists:rangos,id',
            'hora_preferente_inicio' => 'required|date_format:H:i',
            'hora_preferente_final' => 'required|date_format:H:i|after:hora_preferente_inicio'
        ]);

        // Actualiza la publicación con los datos del formulario.
        $publicacion->update([
            'titulo' => $request->input('titulo'),
            'descripcion' => $request->input('descripcion'),
            'modo_id' => $request->input('modo_id') ?? 1,
            'rol_id' => $request->input('rol_id') ?? 1,
            'rango_id' => $request->input('rango_id') ?? 1,
            'hora_preferente_inicio' => $request->input('hora_preferente_inicio'),
            'hora_preferente_final' => $request->input('hora_preferente_final'),
        ]);

        // Redirige al usuario a la lista de publicaciones.
        return Inertia::location(route('publicaciones.index'));
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $publicacion = Publicacion::findOrFail($id); // Busca la publicación por ID.

        // Verifica si el usuario logueado es el creador de la publicación.
        if (Auth::id() !== $publicacion->usuario_id) {
            // Si no es el líder, redirige al índice sin eliminar.
            return Inertia::location(route('publicaciones.index'));
        }

        $publicacion->delete(); // Elimina la publicación.

        // Redirige al índice de publicaciones.
        return Inertia::location(route('publicaciones.index'));
    }
}
