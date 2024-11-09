<script lang="ts">
  import { onMount } from "svelte";
  import Header from "$lib/Header.svelte";
  import ProductCard from "$lib/ProductCard.svelte";
  import LocomotiveScroll from "locomotive-scroll";
  import type { ValidationErrors } from "../../lib/formValidator";
  import { validateForm } from "../../lib/formValidator";

  // Initialize variables
  let locomotiveScroll: any;
  let name = "";
  let email = "";
  let phoneNumber = "";
  let address = "";
  let selectedProduct: Product | null = null;
  let quantity = 1;
  let additionalInfo = "";
  let showUserInfo = false;
  let formErrors: ValidationErrors = {};
  let filteredProducts: Product[] = [];
  let totalPrice = 0;
  let checkedOutProduct: Product | null = null;

  // Define CartItem interface
  interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    brand: string;
    size: string;
    material: string;
    quantity: number;
  }

  // Sample products data
  let products = [
    {
      id: 1,
      name: " Coffee Lover Sticker",
      price: 10,
      image: "images/p1.png",
      description:
        "Gokoru Series - Coffee Lover Sticker starring Gokoru (Gordon College Girl)",
      brand: "POP MART",
      size: "11×8×17.5cm",
      material: "66% Polyester, 25% PVC, 9% ABS",
      category: "Stickers",
    },
    {
      id: 2,
      name: "Gokoru Crying Sticker",
      price: 20,
      image: "images/p2.png",
      description:
        "Gokoru Series - Crying, Pity, Cute Sticker starring Gokoru (Gordon College Girl)",
      brand: "Brand B",
      size: "12×9×18cm",
      material: "70% Plastic, 30% Metal",
      category: "Stickers",
    },
    {
      id: 3,
      name: "Programmer Sticker",
      price: 30,
      image: "images/p3.png",
      description:
        "Gokoru Series - Funny Programming Meme Sticker starring Gokare (Gordon College Boy)",
      brand: "Brand B",
      size: "12×9×18cm",
      material: "70% Plastic, 30% Metal",
      category: "Keychains",
    },
    {
      id: 4,
      name: "Mystic Mug",
      price: 15,
      image: "images/p4.jpg",
      description: "A mug with mystical powers.",
      brand: "Magic Co.",
      size: "8×8×10cm",
      material: "Ceramic",
      category: "Mugs",
    },
    {
      id: 5,
      name: "Enchanted Bookmark",
      price: 5,
      image: "images/p5.jpg",
      description: "Keep your place in style.",
      brand: "Bookish",
      size: "5×15cm",
      material: "Paper",
      category: "Bookmarks",
    },
    {
      id: 6,
      name: "Galactic Keychain",
      price: 8,
      image: "images/p6.jpg",
      description: "Carry the galaxy with you.",
      brand: "Starry",
      size: "3×3cm",
      material: "Metal",
      category: "Keychains",
    },
    {
      id: 7,
      name: "Cosmic Notebook",
      price: 12,
      image: "images/p7.jpg",
      description: "A notebook with cosmic designs.",
      brand: "Galactic Goods",
      size: "15×21cm",
      material: "Paper",
      category: "Notebooks",
    },
    {
      id: 8,
      name: "Starry Night Lamp",
      price: 25,
      image: "images/p8.jpg",
      description: "Illuminate your room with stars.",
      brand: "Luminous",
      size: "10×10×20cm",
      material: "Plastic",
      category: "Lamps",
    },
    {
      id: 9,
      name: "Aurora Poster",
      price: 18,
      image: "images/p9.jpg",
      description: "A beautiful poster of the aurora.",
      brand: "Artistic Prints",
      size: "50×70cm",
      material: "Paper",
      category: "Posters",
    },
  ];

  // Initialize LocomotiveScroll on mount
  onMount(() => {
    locomotiveScroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]") as HTMLElement,
      smooth: true,
    });

    filteredProducts = products; // Show all products initially

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  });

  // Filter products by category
  function filterByCategory(category: string) {
    if (category === "All") {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(
        (product) => product.category === category
      );
    }
  }

  // Show user info form for checkout
  function proceedToCheckout() {
    showUserInfo = true;
  }

  // Validate and submit form
  function formCheck() {
    formErrors = validateForm(name, email, phoneNumber, address);
    if (Object.keys(formErrors).length === 0) {
      console.log({
        name,
        email,
        phoneNumber,
        address,
        selectedProduct,
        quantity,
        additionalInfo,
      });
      closeModal();
    } else {
      console.error("Form validation failed", formErrors);
    }
  }

  // Define Product interface
  interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    brand: string;
    size: string;
    material: string;
    category: string;
  }

  // Open product modal
  function openModal(product: Product) {
    selectedProduct = product;
  }

  // Close product modal
  function closeModal() {
    selectedProduct = null;
  }

  // Update quantity
  function updateQuantity(change: number) {
    quantity = Math.max(1, quantity + change);
  }

  // Update total price whenever selectedProduct or quantity changes
  $: if (selectedProduct) {
    totalPrice = selectedProduct.price * quantity;
  }

  // Function to go back to product input
  function goBackToProductInput() {
    // Ensure the product modal is open
    if (checkedOutProduct) {
      selectedProduct = checkedOutProduct;
      checkedOutProduct = null; // Clear the checked-out product to return to the product input
    }
  }

  // Function to handle checkout
  function handleCheckout() {
    if (selectedProduct) {
      checkedOutProduct = { ...selectedProduct }; // Store the checked-out product details
      console.log("Checkout complete");
      selectedProduct = null; // Close the product modal
    }
  }
</script>

<!-- WHOLE SECTION -->
<section class="flex flex-col md:flex-row">
  <!-- SIDEBAR (desktop) NAVBAR (mobile) -->
  <aside
    class="md:sidebar md:w-64 md:h-screen w-full md:block bg-white shadow-2xl sticky top-[0]"
  >
    <ul
      class="max-sm:gap-4 text-black p-5 text-sm md:text-xl flex md:flex-col flex-row overflow-auto justify-center md:justify-center md:mt-10"
    >
      <button
        class="md:border-b md:border-slate-300 md:py-3"
        on:click={() => filterByCategory("All")}>All</button
      >

      <button
        class="md:border-b md:border-slate-300 md:py-3"
        on:click={() => filterByCategory("Stickers")}>Stickers</button
      >

      <button
        class="md:border-b md:border-slate-300 md:py-3"
        on:click={() => filterByCategory("Bookmarks")}>Bookmarks</button
      >

      <button
        class="md:border-b md:border-slate-300 md:py-3"
        on:click={() => filterByCategory("Keychains")}>Keychains</button
      >

      <button
        class="md:border-b md:border-slate-300 md:py-3"
        on:click={() => filterByCategory("Posters")}>Posters</button
      >

      <button
        class="md:border-b md:border-slate-300 md:py-3"
        on:click={() => filterByCategory("Cards")}>Cards</button
      >
    </ul>
  </aside>

  <!-- CONTENT -->
  <div class="flex flex-1 justify-center p-20 max-sm:p-5">
    <!--  ITEMS -->
    <section class="overflow-x-auto">
      <!-- INDIVIDUAL ITEM ITERATION -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {#each filteredProducts as product}
          <ProductCard {product} {openModal} />
        {/each}
      </div>

      {#if selectedProduct}
        <div
          class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div
            class="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-full md:max-w-2xl w-full flex flex-col md:flex-row relative overflow-y-auto max-h-[90vh] md:max-h-[80vh]"
          >
            <div class="w-full md:w-1/2 mb-4 md:mb-0">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                class="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div class="w-full md:w-1/2 pl-0 md:pl-6">
              <h2 class="text-xl md:text-2xl font-bold mb-2 text-black">
                {selectedProduct.name}
              </h2>
              <p class="text-red-600 text-lg md:text-xl mb-4">
                ₱{totalPrice.toFixed(2)}
              </p>
              <p class="text-black mb-2">{selectedProduct.description}</p>
              <p class="text-black mb-2">
                <strong>Brand:</strong>
                {selectedProduct.brand}
              </p>
              <p class="text-black mb-2">
                <strong>Size:</strong>
                {selectedProduct.size}
              </p>
              <p class="text-black mb-4">
                <strong>Material:</strong>
                {selectedProduct.material}
              </p>
              <div class="flex items-center mb-4 flex-wrap">
                <label for="quantity" class="mr-2 text-black font-semibold w-full md:w-auto"
                  >Quantity:</label
                >
                <div class="flex items-center w-full md:w-auto">
                  <button
                    on:click={() => updateQuantity(-1)}
                    class="px-3 py-2 bg-gray-400 text-white rounded-lg text-lg"
                    >-</button
                  >
                  <input
                    type="number"
                    id="quantity"
                    bind:value={quantity}
                    min="1"
                    class="w-16 text-center mx-3 border-2 border-gray-400 rounded-lg text-xl font-bold text-black"
                  />
                  <button
                    on:click={() => updateQuantity(1)}
                    class="px-3 py-2 bg-gray-400 text-white rounded-lg text-lg"
                    >+</button
                  >
                </div>
              </div>
              <form on:submit|preventDefault={formCheck}>
                <div class="mt-4">
                  <label for="name" class="font-macondo text-black">Name:</label
                  >
                  <input
                    type="text"
                    id="name"
                    bind:value={name}
                    required
                    class="w-full p-2 border rounded text-black"
                  />
                  {#if formErrors.name}<p class="text-red-500">
                      {formErrors.name}
                    </p>{/if}
                </div>
                <div class="mt-4">
                  <label for="email" class="font-macondo text-black"
                    >E-mail:</label
                  >
                  <input
                    type="email"
                    id="email"
                    bind:value={email}
                    required
                    class="w-full p-2 border rounded text-black"
                  />
                  {#if formErrors.email}<p class="text-red-500">
                      {formErrors.email}
                    </p>{/if}
                </div>
                <div class="mt-4">
                  <label for="phoneNumber" class="font-macondo text-black"
                    >Phone Number:</label
                  >
                  <input
                    type="tel"
                    id="phoneNumber"
                    bind:value={phoneNumber}
                    required
                    class="w-full p-2 border rounded text-black"
                  />
                  {#if formErrors.phoneNumber}<p class="text-red-500">
                      {formErrors.phoneNumber}
                    </p>{/if}
                </div>
                <div class="mt-4">
                  <label for="address" class="font-macondo text-black"
                    >Address:</label
                  >
                  <input
                    type="text"
                    id="address"
                    bind:value={address}
                    required
                    class="w-full p-2 border rounded text-black"
                  />
                  {#if formErrors.address}<p class="text-red-500">
                      {formErrors.address}
                    </p>{/if}
                </div>
                <button
                  type="submit"
                  class="bg-blue-600 text-white px-4 py-2 rounded-full mb-4"
                  >Checkout</button
                >
              </form>
              <button
                on:click={closeModal}
                class="absolute top-2 right-2 text-gray-600 modal-close-button"
                aria-label="Close modal"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      {/if}
      {#if checkedOutProduct}
        <div
          class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div
            class="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative"
          >
            <h2 class="text-2xl font-bold mb-4 text-black">Order Summary</h2>
            <p class="text-black mb-2">
              <strong>Product:</strong>
              {checkedOutProduct?.name}
            </p>
            <p class="text-black mb-2">
              <strong>Quantity:</strong>
              {quantity}
            </p>
            <p class="text-black mb-2">
              <strong>Total Price:</strong> ₱{totalPrice.toFixed(2)}
            </p>
            <h3 class="text-xl font-bold mt-4 mb-2 text-black">
              User Information
            </h3>
            <p class="text-black mb-2"><strong>Name:</strong> {name}</p>
            <p class="text-black mb-2"><strong>Email:</strong> {email}</p>
            <p class="text-black mb-2">
              <strong>Phone Number:</strong>
              {phoneNumber}
            </p>
            <p class="text-black mb-2"><strong>Address:</strong> {address}</p>
            <p class="text-black mb-2">
              <strong>Additional Info:</strong>
              {additionalInfo}
            </p>
            <div class="flex justify-between mt-4">
              <button
                on:click={goBackToProductInput}
                class="bg-gray-600 text-white px-4 py-2 rounded-full"
                >Back</button
              >
              <button
                on:click={handleCheckout}
                class="bg-blue-600 text-white px-4 py-2 rounded-full"
                >Checkout</button
              >
            </div>
            <button
              on:click={() => {
                checkedOutProduct = null;
              }}
              class="absolute top-2 right-2 text-gray-600"
              aria-label="Close summary"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      {/if}
    </section>
  </div>
</section>

<style>
  button {
    color: blbuttonck;
    text-decoration: none;
  }

  button:hover {
    color: #3498db; /* Hover color */
  }

  .modal-close-button {
    z-index: 10; /* Ensure the button is on top */
  }
</style>
