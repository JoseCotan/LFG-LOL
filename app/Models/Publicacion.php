<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publicacion extends Model
{
    use HasFactory;

    protected $table = 'publicaciones';

    protected $fillable = [
        'titulo',
        'descripcion',
        'hora_preferente_inicio',
        'hora_preferente_final',
        'modo_id',
        'rol_id',
        'rango_id',
        'usuario_id'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class);
    }

    public function rango()
    {
        return $this->belongsTo(Rango::class);
    }

    public function modo()
    {
        return $this->belongsTo(Modo::class);
    }

    public function rol()
    {
        return $this->belongsTo(Rol::class);
    }

    public function comentarios()
    {
        return $this->morphMany(Comentario::class, 'comentable');
    }
}
