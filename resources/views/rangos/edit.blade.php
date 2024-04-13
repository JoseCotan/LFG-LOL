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
                <picture>
                    <source srcset="{{ asset($rango->imagenPC) }}" media="(min-width: 1200px)">
                    <source srcset="{{ asset($rango->imagenTablet) }}" media="(min-width: 768px)">
                    <source srcset="{{ asset($rango->imagenMovil) }}" media="(max-width: 768px)">
                    <img src="{{ asset($rango->imagenPC) }}" alt="Imagen del rango" class="h-16 w-16">
                </picture>
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
