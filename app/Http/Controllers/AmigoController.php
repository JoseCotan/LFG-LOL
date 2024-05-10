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

    /**
     * Envía una solicitud de amistad a otro usuario.
     */
    public function enviarSolicitud($amistadId)
    {
        // Crea una nueva solicitud de amistad.
        $amigo = new Amigo([
            'usuario_id' => Auth::user()->id, // Quién envía la solicitud.
            'amigo_id' => $amistadId, // A quién se le envía.
            'estado' => 'pendiente', // Estado inicial de la solicitud.
        ]);
        $amigo->save();

        // Encuentra al usuario al que se le envió la solicitud para mostrar su perfil.
        $user = User::findOrFail($amistadId);
        return Inertia::location(route('users.show', ['name' => $user->name]));
    }

    /**
     * Cancela una solicitud de amistad enviada.
     */
    public function cancelarSolicitud($amistadId)
    {
        // Encuentra la solicitud de amistad y la elimina.
        $amistad = Amigo::with('amigoAgregado')->findOrFail($amistadId);
        $amistad->delete();

        // Redirige al perfil del usuario a quien se le había enviado la solicitud.
        return Inertia::location(route('users.show', ['name' => $amistad->amigoAgregado->name]));
    }

    /**
     * Acepta una solicitud de amistad recibida.
     */
    public function aceptarSolicitud($amistadId)
    {
        // Encuentra la solicitud y actualiza su estado a "aceptado".
        $amistad = Amigo::findOrFail($amistadId);
        $amistad->estado = 'aceptado';
        $amistad->save();

        // Redirige al perfil del usuario que envió la solicitud.
        return Inertia::location(route('users.show', ['name' => $amistad->amigoAgregador->name]));
    }

    /**
     * Rechaza una solicitud de amistad recibida.
     */
    public function rechazarSolicitud($amistadId)
    {
        // Encuentra la solicitud y actualiza su estado a "rechazado"
        $amistad = Amigo::findOrFail($amistadId);
        if ($amistad->amigo_id === Auth::user()->id) {
            $amistad->estado = 'rechazado';
            $amistad->save();
        }

        // Redirige al perfil del usuario que envió la solicitud.
        return Inertia::location(route('users.show', ['name' => $amistad->amigoAgregador->name]));
    }

    /**
     * Elimina completamente una amistad existente.
     */
    public function eliminarAmistad($amistadId)
    {
        // Encuentra la amistad y la elimina.
        $amistad = Amigo::findOrFail($amistadId);
        $amistad->delete();

        // Redirige al perfil del otro usuario implicado en la amistad, dependiendo de quién inició la eliminación.
        if (Auth::user()->id === $amistad->amigoAgregado->id) {
            return Inertia::location(route('users.show', ['name' => $amistad->amigoAgregador->name]));
        }
        return Inertia::location(route('users.show', ['name' => $amistad->amigoAgregado->name]));
    }
}
