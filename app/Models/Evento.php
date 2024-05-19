<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descripcion',
        'acceso_publico',
        'acceso_amigos',
        'acceso_miembros_equipo',
        'creador_evento',
    ];

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'evento_usuario', 'evento_id', 'user_id');
    }

    public function creador()
    {
        return $this->belongsTo(User::class, 'creador_evento');
    }

    public function comentarios()
    {
        return $this->morphMany(Comentario::class, 'comentable');
    }
}
