<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRangoRequest;
use App\Http\Requests\UpdateRangoRequest;
use App\Models\Rango;
use Illuminate\Http\Request;

class RangoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('rangos.index', [
            'rangos' => Rango::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('rangos.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'imagen' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);
        $nombreImagen = $request->nombre . '.' . $request->imagen->extension();
        $request->imagen->move(public_path('images'), $nombreImagen);
        $rango = new Rango();
        $rango->nombre = $request->input('nombre');
        $rango->imagen = 'images/' . $nombreImagen;
        $rango->save();

        return redirect()->route('rangos.index')
            ->with('success', 'Rango creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Rango $rango)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rango $rango)
    {
        return view('rangos.edit', [
            'rango' => $rango,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rango $rango)
    {
        $request->validate([
            'nombre' => 'required|string',
            'imagen_nueva' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // Guardar la imagen si se proporciona una nueva
        if ($request->hasFile('imagen_nueva')) {
            $nombreImagen = $request->nombre . '.' . $request->imagen_nueva->extension();
            $request->imagen_nueva->move(public_path('images'), $nombreImagen);
            $rango->imagen = 'images/' . $nombreImagen;
        }

        $rango->nombre = $request->input('nombre');
        $rango->save();

        return redirect()->route('rangos.index')
            ->with('success', 'Rango actualizado correctamente.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rango $rango)
    {
        $rango->delete();
        return redirect()->route('rangos.index');
    }
}
