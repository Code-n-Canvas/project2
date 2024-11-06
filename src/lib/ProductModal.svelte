<script lang="ts">
    import type { Product } from '$lib/types';
    import { validateForm } from '$lib/formValidator';

    export let selectedProduct: Product;
    export let closeModal: () => void;
    let quantity = 1;
    let name = '';
    let email = '';
    let phoneNumber = '';
    let address = '';
    let additionalInfo = '';
    let formErrors: { name?: string; email?: string; phoneNumber?: string; address?: string } = {};

    function handleAddToCart() {
        formErrors = validateForm(name, email, phoneNumber, address);
        if (Object.keys(formErrors).length === 0) {
            console.log({ name, email, phoneNumber, address, selectedProduct, quantity, additionalInfo });
            closeModal();
        } else {
            console.error("Form validation failed", formErrors);
        }
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
            <form on:submit|preventDefault={handleAddToCart}>
                <div class="mt-4">
                    <label for="name" class="font-macondo text-black">Name:</label>
                    <input type="text" id="name" bind:value={name} required class="w-full p-2 border rounded text-black" />
                    {#if formErrors.name}<p class="text-red-500">{formErrors.name}</p>{/if}
                </div>
                <div class="mt-4">
                    <label for="email" class="font-macondo text-black">E-mail:</label>
                    <input type="email" id="email" bind:value={email} required class="w-full p-2 border rounded text-black" />
                    {#if formErrors.email}<p class="text-red-500">{formErrors.email}</p>{/if}
                </div>
                <div class="mt-4">
                    <label for="phoneNumber" class="font-macondo text-black">Phone Number:</label>
                    <input type="tel" id="phoneNumber" bind:value={phoneNumber} required class="w-full p-2 border rounded text-black" />
                    {#if formErrors.phoneNumber}<p class="text-red-500">{formErrors.phoneNumber}</p>{/if}
                </div>
                <div class="mt-4">
                    <label for="address" class="font-macondo text-black">Address:</label>
                    <input type="text" id="address" bind:value={address} required class="w-full p-2 border rounded text-black" />
                    {#if formErrors.address}<p class="text-red-500">{formErrors.address}</p>{/if}
                </div>
                <div class="mt-4">
                    <label for="additionalInfo" class="font-macondo text-black">Additional Information:</label>
                    <textarea id="additionalInfo" bind:value={additionalInfo} class="w-full p-2 border rounded text-black"></textarea>
                </div>
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-full mb-4">Submit</button>
            </form>
            <button on:click={closeModal} class="absolute top-2 right-2 text-gray-600" aria-label="Close modal">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    </div>
</div>