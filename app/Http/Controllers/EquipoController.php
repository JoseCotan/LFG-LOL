<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipoRequest;
use App\Http\Requests\UpdateEquipoRequest;
use App\Models\Equipo;
use App\Models\Modo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EquipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $equipos = Equipo::all();
        $esLider = Equipo::where('lider_id', Auth::id())->exists(); // Verifica si el usuario logueado es líder de algún equipo.

        return Inertia::render('Equipos/Index', [
            'equipos' => $equipos->map(function ($equipo) {
                return [
                    'id' => $equipo->id,
                    'nombre_equipo' => $equipo->nombre_equipo,
                    'lider' => $equipo->lider, // Información del líder del equipo.
                    'modo' => $equipo->modo->nombre, // Modo de juego.
                    'privado' => $equipo->privado // Si el equipo es privado o no.
                ];
            }),
            'esLider' => $esLider
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
        // Validación de los datos recibidos del formulario.
        $request->validate([
            'nombre_equipo' => 'required|string',
            'modo_juego_preferente' => 'nullable|exists:modos,id',
            'privado' => 'required|boolean',
        ]);

        $equipo = new Equipo(); // Crea un nuevo objeto Equipo.

        // Asigna los valores al equipo.
        $equipo->nombre_equipo = $request->nombre_equipo;
        // Si el usuario no selecciona ninguno, se guardará el 1ro de forma predeterminada.
        $equipo->modo_juego_preferente = $request->modo_juego_preferente ?? 1;
        $equipo->privado = $request->privado;
        $equipo->lider_id = Auth::user()->id; // El usuario logueado es el líder.
        $equipo->miembro_1 = Auth::user()->id; // El líder también es el primer miembro.

        $equipo->save();

        return Inertia::location(route('equipos.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipo $equipo)
    {
        // Carga anticipada de relaciones para evitar múltiples consultas a la base de datos (N+1).
        $equipo->load([
            'lider',
            'modo',
            'miembro1',
            'miembro2',
            'miembro3',
            'miembro4',
            'miembro5'
        ]);

        return Inertia::render('Equipos/Show', [
            'equipo' => $equipo
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // Busca el equipo por ID con el modo de juego cargado.
        $equipo = Equipo::with('modo')->findOrFail($id);

        // Verifica si el usuario logueado es el líder del equipo.
        if (Auth::user()->id !== $equipo->lider_id) {
            abort(403, 'No estás autorizado para editar este equipo.');
        }

        $modos = Modo::all(); // Obtiene todos los modos de juego.
        $usuarios = User::all(); // Obtiene todos los usuarios.

        // Retorna la vista de edición del equipo.
        return Inertia::render('Equipos/Edit', [
            'equipo' => $equipo,
            'modos' => $modos,
            'usuarios' => $usuarios
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $equipo = Equipo::findOrFail($id); // Busca el equipo por ID.

        // Verifica si el usuario logueado es el líder del equipo.
        if (Auth::user()->id !== $equipo->lider_id) {
            abort(403, 'No estás autorizado para actualizar este equipo.');
        }

        // Validación de los datos recibidos del formulario.
        $request->validate([
            'nombre_equipo' => 'required|string|unique:equipos,nombre_equipo,' . $id,
            'modo_juego_preferente' => 'nullable|exists:modos,id',
            'privado' => 'required|boolean',
        ]);

        // Actualiza el equipo con los nuevos valores.
        $equipo->update([
            'nombre_equipo' => $request->nombre_equipo,
            'modo_juego_preferente' => $request->modo_juego_preferente,
            'privado' => $request->privado,
        ]);

        // Redirige al usuario a la lista de equipos.
        return Inertia::location(route('equipos.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $equipo = Equipo::findOrFail($id); // Busca el equipo por ID.

        // Verifica si el usuario logueado es el líder del equipo.
        if (Auth::id() !== $equipo->lider_id) {
            // Si no es el líder, redirige al índice sin eliminar.
            return Inertia::location(route('equipos.index'));
        }

        $equipo->delete(); // Elimina el equipo.

        // Redirige al índice de equipos.
        return Inertia::location(route('equipos.index'));
    }


    public function unirse($id)
    {
        $equipo = Equipo::findOrFail($id); // Busca el equipo por ID.
        $user_id = Auth::user()->id; // ID del usuario logueado.

        // Verifica si el equipo es privado y si el usuario es amigo del líder.
        if ($equipo->privado) {
            $esAmigo = DB::table('amigos')
                // Comienza una consulta a la base de datos en la tabla 'amigos'
                ->where(function ($query) use ($user_id, $equipo) {
                    // Configura la subconsulta para verificar si el líder del equipo ha agregado al usuario como amigo
                    $query->where('usuario_id', $equipo->lider_id) // donde el 'usuario_id' es el ID del líder del equipo
                        ->where('amigo_id', $user_id) // 'amigo_id' es el ID del usuario que intenta unirse
                        ->where('estado', 'aceptado'); // el estado de la amistad debe ser 'aceptado'
                })
                ->orWhere(function ($query) use ($user_id, $equipo) {
                    // Configura una subconsulta alternativa para verificar si el usuario ha agregado al líder del equipo como amigo
                    $query->where('usuario_id', $user_id) // donde 'usuario_id' es el ID del usuario que intenta unirse
                        ->where('amigo_id', $equipo->lider_id) // 'amigo_id' es el ID del líder del equipo
                        ->where('estado', 'aceptado'); // el estado de la amistad debe ser 'aceptado'
                })
                ->exists(); // verifica si existe al menos un registro que cumpla con las condiciones

            if (!$esAmigo) {
                return Inertia::location(route('equipos.show', ['equipo' => $id]));
                // Redirige al usuario a la vista del equipo si no es amigo del líder del equipo privado
            }
        }

        // Verifica si el usuario ya es miembro de algún equipo.
        $yaEsMiembro = Equipo::where('miembro_1', $user_id)
            ->orWhere('miembro_2', $user_id)
            ->orWhere('miembro_3', $user_id)
            ->orWhere('miembro_4', $user_id)
            ->orWhere('miembro_5', $user_id)
            ->exists();

        // Si ya es miembro de otro equipo, no permite la unión y redirige.
        if ($yaEsMiembro) {
            return Inertia::location(route('equipos.show', ['equipo' => $id]));
        }

        // Añade al usuario al primer lugar vacío en el equipo.
        if (!$equipo->miembro_1) $equipo->miembro_1 = $user_id;
        elseif (!$equipo->miembro_2) $equipo->miembro_2 = $user_id;
        elseif (!$equipo->miembro_3) $equipo->miembro_3 = $user_id;
        elseif (!$equipo->miembro_4) $equipo->miembro_4 = $user_id;
        elseif (!$equipo->miembro_5) $equipo->miembro_5 = $user_id;
        else {
            // TODO: Si todos los lugares están llenos, muestra error y redirige.
            return Inertia::location(route('equipos.show'));
        }

        $equipo->save();

        // Redirige a la vista del equipo.
        return Inertia::location(route('equipos.show', ['equipo' => $id]));
    }

    /**
     * Permite al líder expulsar a un miembro del equipo.
     */
    public function expulsarMiembro($equipoId, $miembroId)
    {
        $equipo = Equipo::findOrFail($equipoId); // Busca el equipo por ID.
        $user_id = Auth::user()->id; // ID del usuario logueado.

        // Verifica si el usuario logueado es el líder del equipo.
        if ($equipo->lider_id !== $user_id) {
            // Si no es el líder, redirige a la vista del equipo.
            return Inertia::location(route('equipos.show', ['equipo' => $equipoId]));
        }

        // Expulsa al miembro especificado si coincide con algún miembro registrado.
        if ($equipo->miembro_1 == $miembroId) $equipo->miembro_1 = null;
        elseif ($equipo->miembro_2 == $miembroId) $equipo->miembro_2 = null;
        elseif ($equipo->miembro_3 == $miembroId) $equipo->miembro_3 = null;
        elseif ($equipo->miembro_4 == $miembroId) $equipo->miembro_4 = null;
        elseif ($equipo->miembro_5 == $miembroId) $equipo->miembro_5 = null;
        else {
            // Si no encuentra al miembro, redirige a la vista del equipo.
            return Inertia::location(route('equipos.show', ['equipo' => $equipoId]));
        }

        $equipo->save();

        // Redirige a la vista del equipo.
        return Inertia::location(route('equipos.show', ['equipo' => $equipoId]));
    }

    /**
     * Permite a un miembro no líder abandonar el equipo.
     */
    public function abandonarEquipo($id)
    {
        $equipo = Equipo::findOrFail($id); // Busca el equipo por ID.
        $user_id = Auth::user()->id; // ID del usuario logueado.

        // Verifica si el usuario es miembro y no el líder.
        if ($equipo->lider_id !== $user_id && in_array($user_id, [$equipo->miembro_2, $equipo->miembro_3, $equipo->miembro_4, $equipo->miembro_5])) {
            if ($equipo->miembro_2 === $user_id) $equipo->miembro_2 = null; // Si es miembro, lo quita del equipo.

            $equipo->save(); // Guarda los cambios.
        }

        // Redirige a la vista del equipo.
        return Inertia::location(route('equipos.show', ['equipo' => $equipo]));
    }
}
