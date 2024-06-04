<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RangoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('rangos')->insert([
            ['nombre' => 'Hierro'],
            ['nombre' => 'Bronce'],
            ['nombre' => 'Plata'],
            ['nombre' => 'Oro'],
            ['nombre' => 'Platino'],
            ['nombre' => 'Esmeralda'],
            ['nombre' => 'Diamante'],
            ['nombre' => 'Maestro'],
            ['nombre' => 'Gran Maestro'],
            ['nombre' => 'Aspirante'],
            ['nombre' => 'Sin clasificar'],
            ['nombre' => 'Sin rango'],
        ]);
    }
}
