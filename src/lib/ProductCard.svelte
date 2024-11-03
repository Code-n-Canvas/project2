<script>
    export let product;
    export let openModal;
</script>

<div 
    role="button"
    on:click={() => openModal(product)} 
    on:keydown={(e) => e.key === 'Enter' && openModal(product)} 
    tabindex="0" 
    class="p-4 sm:p-6 md:p-8 flex flex-col gap-4 rounded-lg border border-solid border-blue-700 text-center cursor-pointer group hover:border-blue-400 duration-200 mt-12"
>
    <!-- Icon Section -->
    <div class="bg-black grid place-items-center px-4 text-5xl md:text-6xl -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16 mx-auto duration-200">
        <img src={product.image} alt={product.name} class="w-full h-auto" style="width: 200px; height: 200px;" />
    </div>
    <!-- Product Name -->
    <h3 class="font-medium text-xl sm:text-2xl md:text-3xl font-afacad">
        {product.name}
    </h3>
    <!-- Slot for additional content -->
    <slot />
</div>