<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRangoRequest;
use App\Http\Requests\UpdateRangoRequest;
use App\Models\Rango;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

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

        // Verifica si la carpeta images/rangos existe
        $rutaCarpeta = public_path('images/rangos');
        if (!File::isDirectory($rutaCarpeta)) {
            File::makeDirectory($rutaCarpeta);
        }

        // Crear una nueva instancia de ImageManager
        $manager = new ImageManager(new Driver());

        $extension = $request->imagen->extension();

        $nombreImagen = $request->nombre . '.' . $extension;

        // Ruta de almacenamiento para cada versión de la imagen
        $rutaPC = public_path('images/rangos/imagenPC_' . $nombreImagen);
        $rutaTablet = public_path('images/rangos/imagenTablet_' . $nombreImagen);
        $rutaMovil = public_path('images/rangos/imagenMovil_' . $nombreImagen);

        // Abrir la imagen con ImageManager
        $imagen = $manager->read($request->imagen->path());

        // Redimensionar para PC
        $imagen->resize(800, 800);
        $imagen->save($rutaPC);

        // Redimensionar para Tablet
        $imagen->resize(600, 600);
        $imagen->save($rutaTablet);

        // Redimensionar para Móvil
        $imagen->resize(400, 400);
        $imagen->save($rutaMovil);

        // Crear una nueva instancia de Rango
        $rango = new Rango();

        // Asignar valores
        $rango->nombre = $request->input('nombre');
        $rango->imagenPC = 'images/rangos/imagenPC_' . $nombreImagen;
        $rango->imagenTablet = 'images/rangos/imagenTablet_' . $nombreImagen;
        $rango->imagenMovil = 'images/rangos/imagenMovil_' . $nombreImagen;

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
        // Verifica si la carpeta images/rangos existe
        $rutaCarpeta = public_path('images/rangos');
        if (!File::isDirectory($rutaCarpeta)) {
            File::makeDirectory($rutaCarpeta);
        }

        // Crear una nueva instancia de ImageManager
        $manager = new ImageManager(new Driver());

        $extension = $request->imagen_nueva->extension();
        $nombreImagen = $request->nombre . '.' . $extension;

        // Ruta de almacenamiento para cada versión de la imagen
        $rutaPC = public_path('images/rangos/imagenPC_' . $nombreImagen);
        $rutaTablet = public_path('images/rangos/imagenTablet_' . $nombreImagen);
        $rutaMovil = public_path('images/rangos/imagenMovil_' . $nombreImagen);

        // Abrir la imagen con ImageManager
        $imagen = $manager->read($request->imagen_nueva->path());

        // Redimensionar para PC
        $imagen->resize(800, 800);
        $imagen->save($rutaPC);

        // Redimensionar para Tablet
        $imagen->resize(600, 600);
        $imagen->save($rutaTablet);

        // Redimensionar para Móvil
        $imagen->resize(400, 400);
        $imagen->save($rutaMovil);

        // Actualizar las columnas de imagen en la base de datos
        $rango->imagenPC = 'images/rangos/imagenPC_' . $nombreImagen;
        $rango->imagenTablet = 'images/rangos/imagenTablet_' . $nombreImagen;
        $rango->imagenMovil = 'images/rangos/imagenMovil_' . $nombreImagen;
    }

    // Actualizar otros campos del rango
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
