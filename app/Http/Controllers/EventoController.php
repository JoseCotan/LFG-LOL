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

class EventoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Se obtiene todos los eventos y carga la relación creador y usuarios de una vez.
        $eventos = Evento::with(['creador', 'usuarios'])->get();

        return Inertia::render('Eventos/Index', [
            'eventos' => $eventos,
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

        return Inertia::location(route('eventos.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Evento $evento)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Evento $evento)
    {
        if (Auth::user()->id !== $evento->creador_evento) {
            abort(403, 'No estás autorizado para editar este evento.');
        }

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
    public function destroy(Evento $evento)
    {
        if (Auth::user()->id !== $evento->creador_evento) {
            return Inertia::location(route('eventos.index'));
        }

        $evento->delete();
        return Inertia::location(route('eventos.index'));
    }

    public function unirse(Evento $evento)
    {
        $user_id = Auth::user()->id;

        // Log details for debugging
        Log::info('Detalles del evento:', $evento->toArray());

        // Verificar si el evento ya tiene 10 usuarios o si el usuario ya está unido
        if ($evento->usuarios()->count() >= 10 || $evento->usuarios->contains($user_id)) {
            return Inertia::location(route('eventos.index'));
        }

        // Verificar si el usuario es el creador del evento
        if ($user_id === $evento->creador_evento) {
            $evento->usuarios()->attach($user_id);
            return Inertia::location(route('eventos.index'));
        }

        // Verificar si el evento es público
        if ($evento->acceso_publico) {
            $evento->usuarios()->attach($user_id);
            return Inertia::location(route('eventos.index'));
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
                return Inertia::location(route('eventos.index'));
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
                    return Inertia::location(route('eventos.index'));
                }
            }
        }

        // Si ninguna de las condiciones anteriores se cumple, redirigir al índice de eventos
        return Inertia::location(route('eventos.index'));
    }



    public function abandonar(Evento $evento)
    {
        // Verifica si el usuario autenticado está en la lista de usuarios del evento.
        if ($evento->usuarios()->where('user_id', Auth::user()->id)->exists()) {
            // Si el usuario está en la lista, lo elimina de la lista de usuarios del evento.
            $evento->usuarios()->detach(Auth::user()->id);
        }
        return Inertia::location(route('eventos.index'));
    }
}
