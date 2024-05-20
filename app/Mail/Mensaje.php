<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Mensaje extends Mailable
{
    use Queueable, SerializesModels;

    public $remitente;
    public $destinatario;
    public $contenidoMensaje;

    /**
     * Create a new message instance.
     */
    public function __construct($remitente, $destinatario, $contenidoMensaje)
    {
        $this->remitente = $remitente;
        $this->destinatario = $destinatario;
        $this->contenidoMensaje = $contenidoMensaje;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject($this->remitente->name . ' quiere jugar contigo!')
                    ->view('emails.user_message');
    }
}
