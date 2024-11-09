<script>
  export let product;
  export let openModal;
</script>

<div
  role="button"
  on:click={() => openModal(product)}
  on:keydown={(e) => e.key === "Enter" && openModal(product)}
  tabindex="0"
  class="p-4 sm:p-6 md:p-4 flex flex-col gap-4 rounded-lg border border-transparent hover:border-blue-700 cursor-pointer duration-200"
>
  <!-- Icon Section -->
  <div class="bg-accent h-[40vh] px-4 duration-200">
    <img src={product.image} alt={product.name} class="w-[200px] h-[200px]" />
  </div>

  <!-- PRODUCT DETAILS-->
  <div class="mt-2">
    <h2 class="text-base">{product.brand}</h2>
    <h3 class="font-medium text-xl sm:text-2xl md:text-sm font-afacad">
      {product.name}
    </h3>
    <br /><br />
    <h2 class="text-base">₱{product.price}.00</h2>
  </div>

  <!-- Slot for additional content -->
  <slot />
</div>
