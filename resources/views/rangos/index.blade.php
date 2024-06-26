<x-app-layout>
    <div class="relative overflow-x-auto w-full sm:w-5/6 mt-6 mx-auto shadow-md sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-900 text-white">
                <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Imagen
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Rango
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Editar rango
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Borrar rango
                    </th>
                </tr>
            </thead>
            <tbody class="bg-gray-800 text-white divide-y divide-gray-200">
                @foreach ($rangos as $rango)
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <!-- Imagen responsive -->
                        <picture>
                            <source srcset="{{ asset($rango->imagenPC) }}" media="(min-width: 1200px)">
                            <source srcset="{{ asset($rango->imagenTablet) }}" media="(min-width: 768px)">
                            <source srcset="{{ asset($rango->imagenMovil) }}" media="(max-width: 768px)">
                            <img src="{{ asset($rango->imagenPC) }}" alt="Imagen del rango" class="h-16 w-16">
                        </picture>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-white">{{ $rango->nombre }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="{{ route('rangos.edit', $rango->id) }}" class="text-indigo-600 hover:text-indigo-900 mr-2">Editar</a>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <form action="{{ route('rangos.destroy', $rango->id) }}" method="POST" class="inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="text-red-600 hover:text-red-900">Eliminar</button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div class="flex justify-center mt-4 mb-4">
        <a href="{{ route('rangos.create') }}" class="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
            Añadir Nuevo Rango
        </a>
    </div>
</x-app-layout>
