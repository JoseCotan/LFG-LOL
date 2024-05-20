<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reputacion extends Model
{
    use HasFactory;

    protected $table = 'reputaciones';

    protected $fillable = [
        'usuario_id',
        'valorador_id',
        'valoracion',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function valorador()
    {
        return $this->belongsTo(User::class, 'valorador_id');
    }
}
