<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'evento_usuario', 'evento_id', 'user_id');
    }

    public function creador()
    {
        return $this->belongsTo(User::class);
    }

    public function comentarios()
    {
        return $this->morphMany(Comentario::class, 'comentable');
    }
}
