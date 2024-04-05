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
        Schema::create('publicaciones', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->text('descripcion')->nullable();
            $table->time('hora_preferente_inicio')->nullable();
            $table->time('hora_preferente_final')->nullable();
            $table->foreignId('rango_id')->nullable()->constrained();
            $table->foreignId('rol_id')->nullable()->constrained('roles');
            $table->foreignId('modo_id')->nullable()->constrained();
            $table->foreignId('usuario_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publicacions');
    }
};
