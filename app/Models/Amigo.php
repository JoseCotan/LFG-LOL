<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Amigo extends Model
{
    use HasFactory;

    public function amigoAgregado()
    {
        return $this->belongsTo(User::class);
    }

    public function amigoAgregador()
    {
        return $this->belongsTo(User::class);
    }
}
