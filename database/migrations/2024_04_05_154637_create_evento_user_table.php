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
        Schema::create('evento_user', function (Blueprint $table) {
            $table->foreignId('evento_id')->constrained('eventos');
            $table->foreignId('usuario_id')->constrained('users');
            $table->primary(['evento_id', 'usuario_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evento_user');
    }
};
