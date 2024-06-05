<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipoRequest;
use App\Http\Requests\UpdateEquipoRequest;
use App\Models\Equipo;
use App\Models\Modo;
use App\Models\Rango;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class EquipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Se obtiene todos los equipos y carga las relaciones 'lider' y 'modo' de una vez.
        $equipos = Equipo::with(['lider', 'modo', 'rango'])->get();

        return Inertia::render('Equipos/Index', [
            'equipos' => $equipos,
            'modos' => Modo::all(),
            'rangos' => Rango::all(),
            'flash' => session('flash'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $userId = Auth::user()->id;

        $existeEquipo = Equipo::where('lider_id', $userId)
        ->orWhere('miembro_1', $userId)
        ->orWhere('miembro_2', $userId)
        ->orWhere('miembro_3', $userId)
        ->orWhere('miembro_4', $userId)
        ->orWhere('miembro_5', $userId)
        ->exists();

        if ($existeEquipo) {
            Session::flash('flash', ['type' => 'error', 'message' => 'Ya perteneces a un equipo.']);
            return Inertia::location(route('equipos.index'));
        }

        return Inertia::render('Equipos/Create', [
            'rangos' => Rango::all(),
            'modos' => Modo::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validación de los datos recibidos del formulario.
        $request->validate([
            'nombre_equipo' => 'required|string|unique:equipos,nombre_equipo',
            'modo_juego_preferente' => 'nullable|exists:modos,id',
            'rango_id' => 'nullable|exists:rangos,id',
            'privado' => 'required|boolean',
        ]);

        $equipo = new Equipo(); // Crea un nuevo objeto Equipo.

        // Asigna los valores al equipo.
        $equipo->nombre_equipo = $request->nombre_equipo;
        // Si el usuario no selecciona ninguno, se guardará el 1ro de forma predeterminada.
        $equipo->modo_juego_preferente = $request->modo_juego_preferente ?? 1;
        $equipo->privado = $request->privado;
        $equipo->rango_id = $request->rango_id ?? 1;
        $equipo->lider_id = Auth::user()->id; // El usuario logueado es el líder.
        $equipo->miembro_1 = Auth::user()->id; // El líder también es el primer miembro.

        $equipo->save();

        Session::flash('flash', ['type' => 'success', 'message' => 'Creaste el equipo correctamente.']);
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
            'miembro5',
            'rango'
        ]);

        return Inertia::render('Equipos/Show', [
            'equipo' => $equipo,
            'flash' => session('flash'),
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
            Session::flash('flash', ['type' => 'error', 'message' => 'No tienes permiso para editar este equipo.']);
            return Inertia::location(back());
        }

        $modos = Modo::all(); // Obtiene todos los modos de juego.
        $usuarios = User::all(); // Obtiene todos los usuarios.
        $rangos = Rango::all();

        // Retorna la vista de edición del equipo.
        return Inertia::render('Equipos/Edit', [
            'equipo' => $equipo,
            'modos' => $modos,
            'rangos' => $rangos,
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
            Session::flash('flash', ['type' => 'error', 'message' => 'No tienes permiso para editar este equipo.']);
            return Inertia::location(back());
        }

        // Validación de los datos recibidos del formulario.
        $request->validate([
            'nombre_equipo' => 'required|string|unique:equipos,nombre_equipo,' . $id,
            'modo_juego_preferente' => 'nullable|exists:modos,id',
            'rango_id' => 'nullable|exists:rangos,id',
            'privado' => 'required|boolean',
        ]);

        // Actualiza el equipo con los nuevos valores.
        $equipo->update([
            'nombre_equipo' => $request->nombre_equipo,
            'modo_juego_preferente' => $request->modo_juego_preferente,
            'rango_id' => $request->rango_id,
            'privado' => $request->privado,
        ]);

        Session::flash('flash', ['type' => 'success', 'message' => 'Editaste correctamente el equipo ' . $equipo->nombre_equipo . '.']);
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
        if (Auth::user()->id !== $equipo->lider_id) {
            // Si no es el líder, redirige al índice sin eliminar.
            Session::flash('flash', ['type' => 'error', 'message' => 'No eres el líder de este equipo.']);
            return Inertia::location(route('equipos.index'));
        }

        $equipo->delete(); // Elimina el equipo.

        Session::flash('flash', ['type' => 'success', 'message' => 'Eliminaste el equipo con éxito.']);
        // Redirige al índice de equipos.
        return Inertia::location(route('equipos.index'));
    }


    public function unirse($id)
    {
        $equipo = Equipo::findOrFail($id); // Busca el equipo por ID.
        $userId = Auth::user()->id; // ID del usuario logueado.

        // Verifica si el equipo es privado y si el usuario es amigo del líder.
        if ($equipo->privado) {
            $esAmigo = DB::table('amigos')
                // Comienza una consulta a la base de datos en la tabla 'amigos'
                ->where(function ($query) use ($userId, $equipo) {
                    // Configura la subconsulta para verificar si el líder del equipo ha agregado al usuario como amigo
                    $query->where('usuario_id', $equipo->lider_id) // donde el 'usuario_id' es el ID del líder del equipo
                        ->where('amigo_id', $userId) // 'amigo_id' es el ID del usuario que intenta unirse
                        ->where('estado', 'aceptado'); // el estado de la amistad debe ser 'aceptado'
                })
                ->orWhere(function ($query) use ($userId, $equipo) {
                    // Configura una subconsulta alternativa para verificar si el usuario ha agregado al líder del equipo como amigo
                    $query->where('usuario_id', $userId) // donde 'usuario_id' es el ID del usuario que intenta unirse
                        ->where('amigo_id', $equipo->lider_id) // 'amigo_id' es el ID del líder del equipo
                        ->where('estado', 'aceptado'); // el estado de la amistad debe ser 'aceptado'
                })
                ->exists(); // verifica si existe al menos un registro que cumpla con las condiciones

            if (!$esAmigo) {
                Session::flash('flash', ['type' => 'error', 'message' => 'No te puedes unir, no eres amigo de ' . $equipo->lider->name . '.']);
                return Inertia::location(route('equipos.show', ['equipo' => $id]));
                // Redirige al usuario a la vista del equipo si no es amigo del líder del equipo privado
            }
        }

        // Verifica si el usuario ya es miembro de algún equipo.
        $yaEsMiembro = Equipo::where('miembro_1', $userId)
            ->orWhere('miembro_2', $userId)
            ->orWhere('miembro_3', $userId)
            ->orWhere('miembro_4', $userId)
            ->orWhere('miembro_5', $userId)
            ->exists();

        // Si ya es miembro de otro equipo, no permite la unión y redirige.
        if ($yaEsMiembro) {
            Session::flash('flash', ['type' => 'error', 'message' => 'Ya perteneces a un equipo.']);
            return Inertia::location(route('equipos.show', ['equipo' => $id]));
        }

        // Añade al usuario al primer lugar vacío en el equipo.
        if (!$equipo->miembro_1) $equipo->miembro_1 = $userId;
        elseif (!$equipo->miembro_2) $equipo->miembro_2 = $userId;
        elseif (!$equipo->miembro_3) $equipo->miembro_3 = $userId;
        elseif (!$equipo->miembro_4) $equipo->miembro_4 = $userId;
        elseif (!$equipo->miembro_5) $equipo->miembro_5 = $userId;
        else {
            Session::flash('flash', ['type' => 'error', 'message' => 'No hay más espacio en el equipo.']);
            return Inertia::location(route('equipos.show'));
        }

        $equipo->save();

        Session::flash('flash', ['type' => 'success', 'message' => 'Te acabas de unir a ' . $equipo->nombre_equipo . '.']);
        // Redirige a la vista del equipo.
        return Inertia::location(route('equipos.show', ['equipo' => $id]));
    }

    /**
     * Permite al líder expulsar a un miembro del equipo.
     */
    public function expulsarMiembro($equipoId, $miembroId)
    {
        $equipo = Equipo::findOrFail($equipoId); // Busca el equipo por ID.
        $userId = Auth::user()->id; // ID del usuario logueado.

        // Verifica si el usuario logueado es el líder del equipo.
        if ($equipo->lider_id !== $userId) {
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

        Session::flash('flash', ['type' => 'success', 'message' => 'Expulsión con éxito.']);
        // Redirige a la vista del equipo.
        return Inertia::location(route('equipos.show', ['equipo' => $equipoId]));
    }

    /**
     * Permite a un miembro no líder abandonar el equipo.
     */
    public function abandonarEquipo($id)
    {
        $equipo = Equipo::findOrFail($id); // Busca el equipo por ID.
        $userId = Auth::user()->id; // ID del usuario logueado.

        // Verifica si el usuario es miembro y no el líder.
        if ($equipo->lider_id !== $userId && in_array($userId, [$equipo->miembro_1, $equipo->miembro_2, $equipo->miembro_3, $equipo->miembro_4, $equipo->miembro_5])) {
            if ($equipo->miembro_1 === $userId) $equipo->miembro_1 = null; // Si es miembro, lo quita del equipo.
            else if ($equipo->miembro_2 === $userId) $equipo->miembro_2 = null; // Si es miembro, lo quita del equipo.
            else if ($equipo->miembro_3 === $userId) $equipo->miembro_3 = null; // Si es miembro, lo quita del equipo.
            else if ($equipo->miembro_4 === $userId) $equipo->miembro_4 = null; // Si es miembro, lo quita del equipo.
            else if ($equipo->miembro_5 === $userId) $equipo->miembro_5 = null; // Si es miembro, lo quita del equipo.
            Session::flash('flash', ['type' => 'success', 'message' => 'Abandonaste el equipo ' . $equipo->nombre_equipo . '.']);
            $equipo->save(); // Guarda los cambios.
        }

        // Redirige a la vista del equipo.
        return Inertia::location(route('equipos.show', ['equipo' => $equipo]));
    }

    public function hacerLider($equipoId, $miembroId)
    {
        $equipo = Equipo::findOrFail($equipoId); // Busca el equipo por ID.
        $userId = Auth::user()->id; // ID del usuario logueado.

        // Verifica si el usuario logueado es el líder del equipo.
        if ($equipo->lider_id !== $userId) {
            // Si no es el líder, redirige a la vista del equipo.
            Session::flash('flash', ['type' => 'error', 'message' => 'No eres el líder del equipo.']);
            return Inertia::location(route('equipos.show', ['equipo' => $equipoId]));
        }

        // Verifica si el miembro especificado es un miembro del equipo.
        if (!in_array($miembroId, [$equipo->miembro_1, $equipo->miembro_2, $equipo->miembro_3, $equipo->miembro_4, $equipo->miembro_5])) {
            // Si no es un miembro, redirige a la vista del equipo.
            Session::flash('flash', ['type' => 'error', 'message' => 'El miembro no existe en el equipo.']);
            return Inertia::location(route('equipos.show', ['equipo' => $equipoId]));
        }

        // Actualiza el líder del equipo al miembro especificado.
        $equipo->lider_id = $miembroId;
        $equipo->save();

        Session::flash('flash', ['type' => 'success', 'message' => 'Cambio de líder con éxito, ahora es ' . $equipo->lider->name]);
        // Redirige a la vista del equipo.
        return Inertia::location(route('equipos.show', ['equipo' => $equipoId]));
    }
}
