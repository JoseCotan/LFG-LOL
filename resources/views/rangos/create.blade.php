<x-app-layout>
    <div class="w-1/2 mt-6 mx-auto">
        <form method="POST" action="{{ route('rangos.store') }}" enctype="multipart/form-data">
            @csrf

            <!-- Nombre -->
            <div>
                <x-input-label for="nombre" :value="'Nombre del rango'" />
                <x-text-input id="nombre" class="block mt-1 w-full"
                    type="text" name="nombre" :value="old('nombre')" required
                    autofocus autocomplete="nombre" />
                <x-input-error :messages="$errors->get('nombre')" class="mt-2" />
            </div>

            <!-- Imagen -->
            <div class="mt-4">
                <x-input-label for="imagen" :value="'Imagen'" />
                <input id="imagen" type="file" name="imagen" required />
                <x-input-error :messages="$errors->get('imagen')" class="mt-2" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <a href="{{ route('rangos.index') }}">
                    <x-secondary-button class="ms-4">
                        Volver
                    </x-secondary-button>
                </a>
                <x-primary-button class="ms-4">
                    Insertar
                </x-primary-button>
            </div>
        </form>
    </div>
</x-app-layout>
