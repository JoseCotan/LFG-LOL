<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreComentarioRequest;
use App\Http\Requests\UpdateComentarioRequest;
use App\Models\Comentario;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user)
    {
        $request->validate([
            'descripcion' => 'required|string|max:50',
        ]);

        if (Auth::user()->id === $user->id) {
            return Inertia::location(back());
        }

        $existingComment = Comentario::where('comentable_type', User::class)
            ->where('comentable_id', $user->id)
            ->where('user_id', Auth::user()->id)
            ->first();

        if ($existingComment) {
            return Inertia::location(back());
        }

        $comentario = new Comentario();
        $comentario->descripcion = $request->descripcion;
        $comentario->user_id = Auth::user()->id;

        $user->comentarios()->save($comentario);

        return Inertia::location(back());
    }

    /**
     * Display the specified resource.
     */
    public function show(Comentario $comentario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comentario $comentario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComentarioRequest $request, Comentario $comentario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comentario $comentario)
    {
        //
    }
}
