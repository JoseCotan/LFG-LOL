<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Amigo extends Model
{
    use HasFactory;

    protected $fillable = [
        'usuario_id',
        'amigo_id',
        'estado'
    ];

    public function amigoAgregado()
    {
        return $this->belongsTo(User::class, 'amigo_id');
    }

    public function amigoAgregador()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
}
