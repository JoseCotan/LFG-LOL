<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rangos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->nullable();
            $table->string('imagenPC')->nullable();
            $table->string('imagenTablet')->nullable();
            $table->string('imagenMovil')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rangos');
    }
};
