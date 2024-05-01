<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('modos')->insert([
            ['nombre' => 'Draft Pick'],
            ['nombre' => 'Ranked Solo/Duo'],
            ['nombre' => 'Ranked Flex'],
            ['nombre' => 'Aram'],
        ]);
    }
}
