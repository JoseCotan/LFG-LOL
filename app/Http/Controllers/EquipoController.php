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
                    'miembro_1' => $equipo->miembro1,
                    'lider' => $equipo->lider,
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
            'privado' => 'required|boolean',
        ]);

        $equipo = new Equipo();

        $equipo->nombre_equipo = $request->nombre_equipo;
        $equipo->modo_juego_preferente = $request->modo_juego_preferente ?? 1;
        $equipo->privado = $request->privado;
        $equipo->lider_id = Auth::user()->id;
        $equipo->miembro_1 = Auth::user()->id;

        $equipo->save();

        return redirect()->route('equipos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipo $equipo)
    {
        $equipo->load(
            [
                'lider',
                'modo',
                'miembro1',
                'miembro2',
                'miembro3',
                'miembro4',
                'miembro5'
            ]
        ); // Carga anticipada, evitando el problema de n+1

        return Inertia::render('Equipos/Show', [
            'equipo' => $equipo
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $equipo = Equipo::with('modo')->findOrFail($id);

        if (Auth::user()->id !== $equipo->lider_id) {
            abort(403, 'No estás autorizado para editar este equipo.');
        }

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
        $equipo = Equipo::findOrFail($id);

        if (Auth::user()->id !== $equipo->lider_id) {
            abort(403, 'No estás autorizado para actualizar este equipo.');
        }

        $request->validate([
            'nombre_equipo' => 'required|string|unique:equipos,nombre_equipo,' . $id,
            'modo_juego_preferente' => 'nullable|exists:modos,id',
            'privado' => 'required|boolean',
        ]);

        $equipo->update([
            'nombre_equipo' => $request->nombre_equipo,
            'modo_juego_preferente' => $request->modo_juego_preferente,
            'privado' => $request->privado,
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

    public function unirse($id)
    {
        $equipo = Equipo::findOrFail($id);

        if ($equipo->privado) {
            return Inertia::location(route('equipos.show', ['equipo' => $id]));
        }

        $user_id = Auth::user()->id;

        if (!$equipo->miembro_1) $equipo->miembro_1 = $user_id;
        elseif (!$equipo->miembro_2) $equipo->miembro_2 = $user_id;
        elseif (!$equipo->miembro_3) $equipo->miembro_3 = $user_id;
        elseif (!$equipo->miembro_4) $equipo->miembro_4 = $user_id;
        elseif (!$equipo->miembro_5) $equipo->miembro_5 = $user_id;

        $equipo->save();

        return Inertia::location(route('equipos.show', ['equipo' => $id]));
    }
}
