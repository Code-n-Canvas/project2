<script lang="ts">
    import type { Product } from '$lib/types';

    export let selectedProduct: Product;
    export let addToCart: (productId: number, quantity: number) => void;
    export let closeModal: () => void;
    let quantity = 1;

    function handleAddToCart() {
        addToCart(selectedProduct.id, quantity);
        closeModal();
    }

    function updateQuantity(change: number) {
        quantity = Math.max(1, quantity + change);
    }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full flex relative">
        <div class="w-1/2">
            <img src={selectedProduct.image} alt={selectedProduct.name} class="w-full h-auto object-cover" />
        </div>
        <div class="w-1/2 pl-6">
            <h2 class="text-2xl font-bold mb-2 text-black">{selectedProduct.name}</h2>
            <p class="text-red-600 text-xl mb-4">₱{selectedProduct.price.toFixed(2)}</p>
            <div class="flex items-center mb-4">
                <label for="quantity" class="mr-2 text-black font-semibold">Quantity:</label>
                <button on:click={() => updateQuantity(-1)} class="px-3 py-2 bg-gray-400 text-white rounded-lg text-lg">-</button>
                <input type="number" id="quantity" bind:value={quantity} min="1" 
                       class="w-16 text-center mx-3 border-2 border-gray-400 rounded-lg text-xl font-bold text-black" />
                <button on:click={() => updateQuantity(1)} class="px-3 py-2 bg-gray-400 text-white rounded-lg text-lg">+</button>
            </div>
            <button on:click={handleAddToCart} class="bg-blue-600 text-white px-4 py-2 rounded-full mb-4">Add to Cart</button>
            <p class="text-gray-700 mb-2">Brand: {selectedProduct.brand}</p>
            <p class="text-gray-700 mb-2">Size: {selectedProduct.size}</p>
            <p class="text-gray-700 mb-2">Material: {selectedProduct.material}</p>
            <button on:click={closeModal} class="absolute top-2 right-2 text-gray-600" aria-label="Close modal">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    </div>
</div>