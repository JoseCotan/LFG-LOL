<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuarioController extends Controller
{
    //

    public function destroy($id)
    {
        $usuario = User::findOrFail($id);


        // Busca los equipos donde el usuario sea líder
        $equipos = Equipo::where('lider_id', $usuario->id)->get();

        // Si el usuario es líder de algún equipo
        if ($equipos->isNotEmpty()) {
            foreach ($equipos as $equipo) {
                // Itera sobre los miembros para encontrar el primer miembro existente
                $miembros = ['miembro_1', 'miembro_2', 'miembro_3', 'miembro_4', 'miembro_5'];
                foreach ($miembros as $miembro) {
                    // Si el miembro actual no es nulo y es diferente del usuario que se va a eliminar
                    if ($equipo->$miembro !== null && $equipo->$miembro !== $usuario->id) {
                        // Actualiza el campo líder
                        $equipo->update(['lider_id' => $equipo->$miembro]);
                        break;
                    }
                }
                if ($usuario->id === $equipo->lider_id) {
                    $equipo->delete();
                }
            }
        }

        // Busca los equipos donde el usuario sea el único miembro
        $equiposUnicoMiembro = Equipo::where('miembro_1', $usuario->id)
            ->whereNull('miembro_2')
            ->whereNull('miembro_3')
            ->whereNull('miembro_4')
            ->whereNull('miembro_5')
            ->get();

        // Elimina los equipos donde el usuario sea el único miembro
        foreach ($equiposUnicoMiembro as $equipo) {
            $equipo->delete();
        }

        // Actualiza los miembros de los equipos donde el usuario es miembro
        Equipo::where('miembro_1', $usuario->id)->update(['miembro_1' => null]);
        Equipo::where('miembro_2', $usuario->id)->update(['miembro_2' => null]);
        Equipo::where('miembro_3', $usuario->id)->update(['miembro_3' => null]);
        Equipo::where('miembro_4', $usuario->id)->update(['miembro_4' => null]);
        Equipo::where('miembro_5', $usuario->id)->update(['miembro_5' => null]);

        $usuario->delete();

        return Inertia::location(route('inicio'));
    }
}
