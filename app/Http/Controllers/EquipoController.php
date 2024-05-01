<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipoRequest;
use App\Http\Requests\UpdateEquipoRequest;
use App\Models\Equipo;
use App\Models\Modo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EquipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $equipos = Equipo::all();

        return Inertia::render('Equipos/Index', [
            'equipos' => $equipos->map(function ($equipo) {
                return [
                    'id' => $equipo->id,
                    'nombre_equipo' => $equipo->nombre_equipo,
                    'lider_id' => $equipo->lider->name,
                    'modo' => $equipo->modo->nombre,
                    'privado' => $equipo->privado
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
        return Inertia::render('Equipos/Create', [
            'modos' => $modos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre_equipo' => 'required|string',
            'modo_juego_preferente' => 'nullable|exists:modos,id',
            'privado' => 'required|boolean', // Asegura que privado sea enviado como booleano
        ]);

        $equipo = new Equipo();

        $equipo->nombre_equipo = $request->nombre_equipo;
        $equipo->modo_juego_preferente = $request->modo_juego_preferente ?? 1; // Modo predeterminado si es nulo
        $equipo->privado = $request->privado; // Asigna directamente el valor booleano de 'privado'
        $equipo->lider_id = Auth::user()->id; // Asume que quieres asignar el líder basado en el usuario autenticado

        $equipo->save();

        return redirect()->route('equipos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipo $equipo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $equipo = Equipo::with('modo', 'lider', 'miembro1', 'miembro2', 'miembro3', 'miembro4', 'miembro5')->findOrFail($id);
        $modos = Modo::all();
        $usuarios = User::all();

        return Inertia::render('Equipos/Edit', [
            'equipo' => $equipo,
            'modos' => $modos,
            'usuarios' => $usuarios
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre_equipo' => 'required|string|unique:equipos,nombre_equipo,' . $id,
            'modo_juego_preferente' => 'nullable|exists:modos,id',
            'privado' => 'required|boolean',
            // Valida otros miembros aquí
        ]);

        $equipo = Equipo::findOrFail($id);

        $equipo->update([
            'nombre_equipo' => $request->nombre_equipo,
            'modo_juego_preferente' => $request->modo_juego_preferente,
            'privado' => $request->privado,
            // Actualiza otros miembros aquí
        ]);

        return redirect()->route('equipos.index');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipo $equipo)
    {
        //
    }
}
