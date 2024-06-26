<x-app-layout>
    <div class="w-1/2 mt-6 mx-auto">
        <form method="POST" action="{{ route('rangos.update', $rango->id) }}" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <!-- Nombre -->
            <div>
                <x-input-label for="nombre" :value="'Nombre del rango'" />
                <x-text-input id="nombre" class="block mt-1 w-full"
                    type="text" name="nombre" :value="$rango->nombre" required
                    autofocus autocomplete="nombre" />
                <x-input-error :messages="$errors->get('nombre')" class="mt-2" />
            </div>

            <!-- Imagen actual -->
            <div class="mt-4">
                <x-input-label for="imagen_actual" :value="'Imagen actual'" />
                <img src="{{ asset($rango->imagenPC) }}" alt="Imagen actual" class="mt-1 h-20 w-20 rounded object-cover">
            </div>

            <!-- Nueva imagen -->
            <div class="mt-4">
                <x-input-label for="imagen_nueva" :value="'Nueva imagen'" />
                <input id="imagen_nueva" type="file" name="imagen_nueva" />
                <x-input-error :messages="$errors->get('imagen_nueva')" class="mt-2" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <a href="{{ route('rangos.index') }}">
                    <x-secondary-button class="ms-4">
                        Volver
                    </x-secondary-button>
                </a>
                <x-primary-button class="ms-4">
                    Actualizar
                </x-primary-button>
            </div>
        </form>
    </div>
</x-app-layout>
