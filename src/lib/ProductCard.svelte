<script>
    export let product;
    let showDescription = false;
    let quantity = 1;

    function toggleDescription() {
        showDescription = !showDescription;
    }

    function increaseQuantity() {
        quantity++;
    }

    function decreaseQuantity() {
        if (quantity > 1) quantity--;
    }

    $: totalPrice = parseFloat(product.price.replace('$', '')) * quantity;
</script>

<main class="p-4 sm:p-6 md:p-8 flex flex-col gap-4 rounded-lg border border-solid border-purple-700 text-center cursor-pointer group hover:border-purple-400 duration-200">
    {#if product.isSoldOut}
        <div class="absolute top-0 left-0 bg-gray-500 text-white px-2 py-1 text-xs">SOLD OUT</div>
    {/if}
    <div class="bg-black grid place-items-center px-4 text-5xl md:text-6xl -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16 mx-auto duration-200 transform group-hover:scale-105">
        <img src={product.image} alt={product.name} class="w-full h-48 object-cover mb-4 transition-transform duration-300" />
    </div>
    <h3 class="font-medium text-xl sm:text-2xl md:text-3xl font-caveat">
        {product.name}
    </h3>
    <p class="text-xl text-purple-400 font-concert">{product.price}</p>
    <button on:click={toggleDescription} class="mt-4 text-blue-500 hover:text-blue-400 transition-transform transform-gpu group-hover:opacity-100 group-hover:translate-y-0 duration-300">
        →
    </button>
    {#if showDescription}
        <div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div class="bg-slate-950 p-8 rounded-lg shadow-2xl text-white max-w-2xl w-full mx-4 flex flex-col md:flex-row">
                <img src={product.image} alt={product.name} class="w-full md:w-1/2 h-auto object-cover mb-4 md:mb-0" />
                <div class="md:ml-6">
                    <h3 class="text-2xl font-bold mb-4">{product.name}</h3>
                    <p class="text-xl text-red-400 mb-2">${totalPrice.toFixed(2)}</p>
                    <div class="flex items-center mb-4">
                        <button on:click={decreaseQuantity} class="px-2 py-1 bg-gray-700 rounded">-</button>
                        <span class="mx-2">{quantity}</span>
                        <button on:click={increaseQuantity} class="px-2 py-1 bg-gray-700 rounded">+</button>
                    </div>
                    <p class="mt-4 text-gray-300">{product.description}</p>
                    <div class="mt-4">
                        <h4 class="font-bold">Details:</h4>
                        <p>Brand: {product.brand}</p>
                        <p>Size: {product.size}</p>
                        <p>Material: {product.material}</p>
                    </div>
                    <button class="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500 shadow-lg transition-transform transform hover:scale-105 duration-200">
                        Buy / Add to Cart
                    </button>
                    <button on:click={toggleDescription} class="mt-2 text-red-400 hover:text-red-300">
                        Close
                    </button>
                </div>
            </div>
        </div>
    {/if}
    <slot />
</main>

<style>
    button {
        display: none;
    }
    main:hover button {
        display: block;
    }
</style>
