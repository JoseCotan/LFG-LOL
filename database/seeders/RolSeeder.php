<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            ['nombre' => 'Top'],
            ['nombre' => 'Jungla'],
            ['nombre' => 'Medio'],
            ['nombre' => 'ADC'],
            ['nombre' => 'Soporte'],
            ['nombre' => 'ARAM'],
        ]);
    }
}
