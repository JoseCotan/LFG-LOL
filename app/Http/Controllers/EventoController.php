<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventoRequest;
use App\Http\Requests\UpdateEventoRequest;
use App\Models\Evento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

class EventoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Evento::with(['creador', 'usuarios'])->orderBy('created_at', 'DESC');

        if ($request->filled('publico')) {
            $query->where('acceso_publico', $request->publico === 'si');
        }

        if ($request->filled('amigos')) {
            $query->where('acceso_amigos', $request->amigos === 'si');
        }

        if ($request->filled('miembros_equipo')) {
            $query->where('acceso_miembros_equipo', $request->miembros_equipo === 'si');
        }

        $query->withCount('usuarios');

        Log::info('Solicitud recibida:', $request->all());

        $eventos = $query->paginate(20);

        return Inertia::render('Eventos/Index', [
            'eventos' => $eventos,
            'flash' => session('flash'),
            'filtros' => $request->only(['publico', 'amigos', 'miembros_equipo']),
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Eventos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'acceso_publico' => 'required|boolean',
            'acceso_amigos' => 'required|boolean',
            'acceso_miembros_equipo' => 'required|boolean',
        ]);

        $evento = new Evento();

        $evento->titulo = $request->titulo;
        $evento->descripcion = $request->descripcion;
        $evento->acceso_publico = $request->acceso_publico;
        $evento->acceso_amigos = $request->acceso_amigos;
        $evento->acceso_miembros_equipo = $request->acceso_miembros_equipo;
        $evento->creador_evento = Auth::User()->id;

        $evento->save();

        Session::flash('flash', ['type' => 'success', 'message' => 'Creaste el evento correctamente.']);
        return Inertia::location(route('eventos.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Evento $evento)
    {
        if (Auth::check()) {
            $user_id = Auth::user()->id;

            // Verificar si el usuario es miembro del evento
            $esMiembro = $evento->usuarios->contains($user_id);

            // Verificar si el usuario es el creador del evento o un administrador
            $esCreadorOAdmin = $user_id === $evento->creador_evento || Auth::user()->admin;

            // Verificar si el evento es público o si el usuario es miembro o el creador/administrador
            if ($esMiembro || $esCreadorOAdmin) {
                // Cargar los datos necesarios para mostrar el evento
                $evento->load('usuarios', 'creador');
                $comentarios = $evento->comentarios()
                    ->with('user')
                    ->orderBy('created_at', 'desc')
                    ->paginate(10);
                $totalComentarios = $comentarios->total();

                // Renderizar la vista del evento
                return Inertia::render('Eventos/Show', [
                    'evento' => $evento,
                    'comentarios' => $comentarios,
                    'totalComentarios' => $totalComentarios,
                    'flash' => session('flash'),
                ]);
            }
        } else {
            // Si el usuario no está logeado, vuelve al index.
            Session::flash('flash', ['type' => 'error', 'message' => 'Inicia sesión para poder ver algún evento.']);
            return Inertia::location(route('eventos.index'));
        }



        // Si el evento es público, le avisará al usuario
        if ($evento->acceso_publico && $evento->usuarios()->count() < 10) {
            Session::flash('flash', ['type' => 'error', 'message' => 'Este evento es público, únete para verlo.']);
            return Inertia::location(route('eventos.index'));
        }

        // Si el usuario no es miembro del evento y el evento no es público, redirigir al índice de eventos
        Session::flash('flash', ['type' => 'error', 'message' => 'No puedes ver este evento.']);
        return Inertia::location(route('eventos.index'));
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Evento $evento)
    {
        // Verifica si el usuario logueado es el creador del evento o un administrador.
        if (Auth::user()->id !== $evento->creador_evento && !Auth::user()->admin) {
            // Si no es el creador ni un administrador, redirige de vuelta con un mensaje de error.
            Session::flash('flash', ['type' => 'error', 'message' => 'No tienes permiso para editar este evento.']);
            return Inertia::location(route('eventos.index'));
        }

        // Retorna la vista de edición del evento.
        return Inertia::render('Eventos/Edit', [
            'evento' => $evento,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Evento $evento)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'acceso_publico' => 'required|boolean',
            'acceso_amigos' => 'required|boolean',
            'acceso_miembros_equipo' => 'required|boolean',
        ]);

        $evento->update([
            'titulo' => $request->input('titulo'),
            'descripcion' => $request->input('descripcion'),
            'acceso_publico' => $request->input('acceso_publico'),
            'acceso_amigos' => $request->input('acceso_amigos'),
            'acceso_miembros_equipo' => $request->input('acceso_miembros_equipo'),
        ]);

        return Inertia::location(route('eventos.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Evento $evento, Request $request)
    {
        // Verifica si el usuario logueado es el creador del evento o un administrador.
        if (Auth::user()->id !== $evento->creador_evento && !Auth::user()->admin) {
            // Si no es el creador ni un administrador, redirige de vuelta con un mensaje de error.
            Session::flash('flash', ['type' => 'error', 'message' => 'No tienes permiso para eliminar este evento.']);
            return Inertia::location(route('eventos.index'));
        }

        $evento->delete();

        Session::flash('flash', ['type' => 'success', 'message' => 'Evento eliminado con éxito.']);
        // Si el usuario es un administrador, redirige a la ruta del administrador.
        if ($request->input('panelAdmin')) {
            return Inertia::location(route('admin.eventos.index'));
        }

        // Redirige a la página de eventos si el usuario no es administrador.
        return Inertia::location(route('eventos.index'));
    }


    public function unirse(Evento $evento)
    {
        $user_id = Auth::user()->id;

        // Verificar si el evento ya tiene 10 usuarios o si el usuario ya está unido
        if ($evento->usuarios()->count() >= 10 || $evento->usuarios->contains($user_id)) {
            Session::flash('flash', ['type' => 'error', 'message' => 'El evento está lleno.']);
            return Inertia::location(back());
        }

        // Verificar si el usuario es el creador del evento
        if ($user_id === $evento->creador_evento) {
            Session::flash('flash', ['type' => 'success', 'message' => 'Te uniste al evento correctamente.']);
            $evento->usuarios()->attach($user_id);
            return Inertia::location(back());
        }

        // Verificar si el evento es público
        if ($evento->acceso_publico) {
            Session::flash('flash', ['type' => 'success', 'message' => 'Te uniste al evento correctamente.']);
            $evento->usuarios()->attach($user_id);
            return Inertia::location(back());
        }

        // Verificar si el usuario es amigo del creador del evento si acceso_amigos es verdadero
        if ($evento->acceso_amigos) {
            $esAmigo = DB::table('amigos')
                ->where(function ($query) use ($user_id, $evento) {
                    $query->where('usuario_id', $evento->creador_evento)
                        ->where('amigo_id', $user_id)
                        ->where('estado', 'aceptado');
                })
                ->orWhere(function ($query) use ($user_id, $evento) {
                    $query->where('usuario_id', $user_id)
                        ->where('amigo_id', $evento->creador_evento)
                        ->where('estado', 'aceptado');
                })
                ->exists();

            if ($esAmigo) {
                $evento->usuarios()->attach($user_id);
                Session::flash('flash', ['type' => 'success', 'message' => 'Te uniste al evento correctamente.']);
                return Inertia::location(back());
            }
        }

        // Verificar si el usuario pertenece a un mismo equipo que el creador
        if ($evento->acceso_miembros_equipo) {
            // Verificar si el usuario es miembro de algún equipo
            $equipoDelUsuario = DB::table('equipos')
                ->where(function ($query) use ($user_id) {
                    $query->where('lider_id', $user_id)
                        ->orWhere('miembro_1', $user_id)
                        ->orWhere('miembro_2', $user_id)
                        ->orWhere('miembro_3', $user_id)
                        ->orWhere('miembro_4', $user_id)
                        ->orWhere('miembro_5', $user_id);
                })
                ->first();

            // Si el usuario pertenece a un equipo, verificar si el creador del evento también pertenece al mismo equipo
            if ($equipoDelUsuario) {
                $esMismoEquipo = DB::table('equipos')
                    ->where(function ($query) use ($equipoDelUsuario, $evento) {
                        $query->where('id', $equipoDelUsuario->id)
                            ->where(function ($query) use ($evento) {
                                $query->where('lider_id', $evento->creador_evento)
                                    ->orWhere('miembro_1', $evento->creador_evento)
                                    ->orWhere('miembro_2', $evento->creador_evento)
                                    ->orWhere('miembro_3', $evento->creador_evento)
                                    ->orWhere('miembro_4', $evento->creador_evento)
                                    ->orWhere('miembro_5', $evento->creador_evento);
                            });
                    })
                    ->exists();

                if ($esMismoEquipo) {
                    $evento->usuarios()->attach($user_id);
                    Session::flash('flash', ['type' => 'success', 'message' => 'Te uniste al evento correctamente.']);
                    return Inertia::location(route('eventos.index'));
                }
            }
        }

        Session::flash('flash', ['type' => 'error', 'message' => 'No puedes unirte al evento.']);
        // Si ninguna de las condiciones anteriores se cumple, redirigir al índice de eventos
        return Inertia::location(route('eventos.index'));
    }

    public function expulsarMiembro($eventoId, $miembroId)
    {
        $evento = Evento::findOrFail($eventoId); // Busca el evento por ID.
        $userId = Auth::user()->id; // ID del usuario logueado.

        // Verifica si el usuario logueado es el creador del evento o un administrador.
        if ($evento->creador_evento !== $userId && !Auth::user()->admin) {
            // Si no es el creador ni un administrador, redirige a la vista del evento.
            Session::flash('flash', ['type' => 'error', 'message' => 'No tienes permiso para realizar esta acción.']);
            return Inertia::location(route('eventos.show', ['evento' => $eventoId]));
        }

        // Busca al usuario y lo elimina del evento.
        $usuario = $evento->usuarios()->find($miembroId);

        if ($usuario) {
            $evento->usuarios()->detach($miembroId);
            Session::flash('flash', ['type' => 'success', 'message' =>
            'El usuario ha sido expulsado del evento.']);
        } else {
            // Si no encuentra al miembro, redirige a la vista del evento.
            Session::flash('flash', ['type' => 'error', 'message' =>
            'El usuario especificado no es un miembro del evento.']);
        }

        return Inertia::location(route('eventos.show', ['evento' => $eventoId]));
    }




    public function abandonar(Evento $evento)
    {
        // Verifica si el usuario autenticado está en la lista de usuarios del evento.
        if ($evento->usuarios()->where('user_id', Auth::user()->id)->exists()) {
            // Si el usuario está en la lista, lo elimina de la lista de usuarios del evento.
            $evento->usuarios()->detach(Auth::user()->id);
        }
        Session::flash('flash', ['type' => 'success', 'message' => 'Abandonaste el evento correctamente.']);
        return Inertia::location(back());
    }
}
