<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    protected $fillable = [
        'nombre_equipo',
        'modo_juego_preferente',
        'privado',
        'lider_id',
        'miembro_1',
        'miembro_2',
        'miembro_3',
        'miembro_4',
        'miembro_5'
    ];

    public function lider()
    {
        return $this->belongsTo(User::class, 'lider_id');
    }

    public function miembro1()
    {
        return $this->belongsTo(User::class, 'miembro_1');
    }

    public function miembro2()
    {
        return $this->belongsTo(User::class, 'miembro_2');
    }

    public function miembro3()
    {
        return $this->belongsTo(User::class, 'miembro_3');
    }

    public function miembro4()
    {
        return $this->belongsTo(User::class, 'miembro_4');
    }

    public function miembro5()
    {
        return $this->belongsTo(User::class, 'miembro_5');
    }

    public function modo()
    {
        return $this->belongsTo(Modo::class, 'modo_juego_preferente');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'team_members', 'team_id', 'user_id');
    }
}
