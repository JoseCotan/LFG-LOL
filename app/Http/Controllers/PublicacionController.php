<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePublicacionRequest;
use App\Http\Requests\UpdatePublicacionRequest;
use App\Models\Modo;
use App\Models\Publicacion;
use App\Models\Rango;
use App\Models\Rol;
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
        $publicaciones = Publicacion::all();

        return Inertia::render('Publicaciones/Index', [
            'publicaciones' => $publicaciones->map(function ($publicacion) {
                return [
                    'id' => $publicacion->id,
                    'titulo' => $publicacion->titulo,
                    'descripcion' => $publicacion->descripcion,
                    'modo' => $publicacion->modo->nombre, // Nombre del modo de juego.
                    'rango' => $publicacion->rango->nombre, // Nombre del rango.
                    'rol' => $publicacion->rol->nombre, // Nombre del rol.
                    'hora_preferente_inicio' => $publicacion->hora_preferente_inicio, // Hora de inicio preferida.
                    'hora_preferente_final' => $publicacion->hora_preferente_final // Hora de finalización preferida.
                ];
            })
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $modos = Modo::all();
        $roles = Rol::all();
        $rangos = Rango::all();

        return Inertia::render('Publicaciones/Create', [
            'modos' => $modos,
            'roles' => $roles,
            'rangos' => $rangos
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
            'modo_id' => 'required|exists:modos,id',
            'rol_id' => 'required|exists:roles,id',
            'rango_id' => 'required|exists:rangos,id',
            'hora_preferente_inicio' => 'required|date_format:H:i',
            'hora_preferente_final' => 'required|date_format:H:i|after:hora_preferente_inicio',
        ]);

        // Crea una nueva publicación con los datos del formulario.
        $publicacion = new Publicacion($request->all());
        $publicacion->usuario_id = Auth::user()->id; // Asigna el ID del usuario autenticado.
        $publicacion->save();

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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePublicacionRequest $request, Publicacion $publicacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Publicacion $publicacion)
    {
        //
    }
}
