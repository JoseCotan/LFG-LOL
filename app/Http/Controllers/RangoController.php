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
        ]);

        $rango = new Rango();
        $rango->nombre = $request->input('nombre');
        $rango->save();

        return redirect()->route('rangos.index');
        
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRangoRequest $request, Rango $rango)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rango $rango)
    {
        //
    }
}
