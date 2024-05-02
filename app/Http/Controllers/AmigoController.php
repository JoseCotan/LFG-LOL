<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAmigoRequest;
use App\Http\Requests\UpdateAmigoRequest;
use App\Models\Amigo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AmigoController extends Controller
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
    public function store(StoreAmigoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Amigo $amigo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Amigo $amigo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAmigoRequest $request, Amigo $amigo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Amigo $amigo)
    {
        //
    }

    public function enviarSolicitud($amistadId)
    {
        $amigo = new Amigo([
            'usuario_id' => Auth::user()->id,
            'amigo_id' => $amistadId,
            'estado' => 'pendiente',
        ]);
        $amigo->save();

        $user = User::findOrFail($amistadId);
        $userName = $user->name;

        return Inertia::location(route('users.show', ['name' => $userName]));
    }

    public function cancelarSolicitud($amistadId)
    {
        $amistad = Amigo::with('amigoAgregado')->findOrFail($amistadId);
        $userName = $amistad->amigoAgregado->name;
        $amistad->delete();

        return Inertia::location(route('users.show', ['name' => $userName]));
    }

    public function aceptarSolicitud($amistadId)
    {
        $amistad = Amigo::findOrFail($amistadId);
        $amistad->estado = 'aceptado';
        $amistad->save();

        return Inertia::location(route('users.show', ['name' => $amistad->amigoAgregador->name]));
    }

    public function rechazarSolicitud($amistadId)
    {
        $amistad = Amigo::findOrFail($amistadId);
        if ($amistad->amigo_id === Auth::user()->id) {
            $amistad->estado = 'rechazado';
            $amistad->save();

            $userName = $amistad->amigoAgregador->name;
            return Inertia::location(route('users.show', ['name' => $amistad->amigoAgregador->name]));
        }

        return Inertia::location(route('users.show', ['name' => $amistad->amigoAgregador->name]));
    }
}
