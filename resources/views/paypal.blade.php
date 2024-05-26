<x-paypal-layout>
    <div class="mb-6 text-center">
        <h2 class="text-2xl font-semibold">VIP LFG-LOL</h2>
        <h3 class="text-xl text-gray-600">Precio: 10€</h3>
    </div>
    @if (Auth::user()->VIP)
        <div class="text-center">
            <p class="text-red-500">¡Ya eres un miembro VIP!</p>
            <button onclick="window.close()"
                class="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                Cerrar
            </button>
        </div>
    @else
        <form action="{{ route('paypal') }}" method="post" class="space-y-4">
            @csrf
            <input type="hidden" name="price" value="10">
            <input type="hidden" name="product_name" value="Laptop">
            <input type="hidden" name="quantity" value="1">
            <button type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-xl text-white font-semibold py-3 px-6 rounded-md w-full transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                Pagar con PayPal
            </button>
        </form>
        <div class="text-center">
            <img src="/images/paypal.png" alt="PayPal Logo" class="mx-auto w-24 mt-6">
        </div>
        <div class="mt-6">
            <h4 class="text-lg font-semibold">Beneficios del VIP:</h4>
            <ul class="list-disc pl-6 mt-2">
                <li>Estar en las primeras posiciones en las publicaciones.</li>
            </ul>
        </div>
    @endif
</x-paypal-layout>
