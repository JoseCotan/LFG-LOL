<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuarioController extends Controller
{
    //

    public function destroy($id)
    {
        $usuario = User::findOrFail($id);
        $usuario->delete();

        return Inertia::location(back());
    }
}
