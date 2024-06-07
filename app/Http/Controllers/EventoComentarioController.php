<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Models\Evento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class EventoComentarioController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Evento $evento)
    {
        $request->validate([
            'descripcion' => 'required|string|max:255',
        ]);

        $comentario = new Comentario();
        $comentario->descripcion = $request->descripcion;
        $comentario->user_id = Auth::user()->id;
        $comentario->comentable_id = $evento->id;
        $comentario->comentable_type = Evento::class;
        $comentario->save();

        Session::flash('flash', ['type' => 'success', 'message' => 'Creaste el comentario correctamente.']);
        return Inertia::location(back());
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $comentario = Comentario::findOrFail($id);

        if ($comentario->user_id !== Auth::id()) {
            Session::flash('flash', ['type' => 'error', 'message' => 'Este comentario no es tuyo.']);
            return Inertia::location(back());
        }

        $comentario->delete();
        Session::flash('flash', ['type' => 'success', 'message' => 'El comentario se eliminó correctamente']);
        return Inertia::location(back());
    }
}
