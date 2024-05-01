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

    public function enviarSolicitud(Request $request, $userId)
    {
        $amigo = new Amigo([
            'usuario_id' => auth()->id(),
            'amigo_id' => $userId,
            'estado' => 'pendiente',
        ]);
        $amigo->save();

        $user = User::findOrFail($userId);
        $userName = $user->name;

        return Inertia::location(route('users.show', ['name' => $userName]));
    }

    public function aceptarSolicitud($id)
    {
        $solicitud = Amigo::where('id', $id)
            ->where('amigo_id', Auth::id())
            ->firstOrFail();

        $solicitud->update(['estado' => 'aceptado']);

        return redirect()->back()->with('success', 'Solicitud de amistad aceptada.');
    }

    public function rechazarSolicitud($id)
    {
        $solicitud = Amigo::where('id', $id)
            ->where('amigo_id', Auth::id())
            ->firstOrFail();

        $solicitud->update(['estado' => 'rechazado']);

        return redirect()->back()->with('success', 'Solicitud de amistad rechazada.');
    }
}
