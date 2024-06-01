<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\Mensaje;
use App\Models\User;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class MensajeController extends Controller
{
    public function enviarMensaje(Request $request, $destinatarioId)
    {
        set_time_limit(999);

        // Validar el contenido del mensaje
        $request->validate([
            'mensaje' => 'required|string',
        ]);
        // Obtener el usuario autenticado y el destinatario
        $remitente = Auth::user();
        $destinatario = User::findOrFail($destinatarioId);
        $contenidoMensaje = $request->input('mensaje');

        // Enviar el correo
        Mail::to($destinatario->email)->send(new Mensaje($remitente, $destinatario, $contenidoMensaje));

        Session::flash('success', 'El mensaje se envió correctamente a ' . $destinatario->name);
        return Inertia::location(back());
    }
}
