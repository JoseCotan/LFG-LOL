<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('equipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_equipo')->unique();
            $table->foreignId('lider_id')->nullable()->constrained('users');
            $table->foreignId('miembro_1')->nullable()->unique()->constrained('users');
            $table->foreignId('miembro_2')->nullable()->unique()->constrained('users');
            $table->foreignId('miembro_3')->nullable()->unique()->constrained('users');
            $table->foreignId('miembro_4')->nullable()->unique()->constrained('users');
            $table->foreignId('miembro_5')->nullable()->unique()->constrained('users');
            $table->foreignId('rango_id')->nullable()->constrained();
            $table->boolean('privado')->nullable();
            $table->foreignId('modo_juego_preferente')->nullable()->constrained('modos');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipos');
    }
};
