<script lang="ts">
    import { onMount } from "svelte";
    import Header from "$lib/Header.svelte";
    import ProductCard from "$lib/ProductCard.svelte";
    import ProductModal from "$lib/ProductModal.svelte";
    import LocomotiveScroll from "locomotive-scroll";
    import { cart, showCart } from '../../stores/cartStore';
    import { get } from 'svelte/store';
    import type { ValidationErrors } from '../../lib/formValidator';
    import { validateForm } from '../../lib/formValidator';

    // Initialize variables
    let locomotiveScroll: any;
    let name = '';
    let email = '';
    let phoneNumber = '';
    let address = '';
    let selectedProduct: Product | null = null;
    let quantity = 1;
    let additionalInfo = '';
    let showUserInfo = false;
    let formErrors: ValidationErrors = {};

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
            name: "Acheron eating a peach", 
            price: 10, 
            image: "images/p1.jpg", 
            description: "A delightful painting of Acheron enjoying a peach.",
            brand: "POP MART",
            size: "11×8×17.5cm",
            material: "66% Polyester, 25% PVC, 9% ABS"
        },
        { 
            id: 2, 
            name: "Squishy Axolotl", 
            price: 20, 
            image: "images/p2.jpg", 
            description: "Squish Squish.",
            brand: "Brand B",
            size: "12×9×18cm",
            material: "70% Plastic, 30% Metal"
        },
        { 
            id: 3, 
            name: "Traveler", 
            price: 30, 
            image: "images/p3.jpg", 
            description: "",
            brand: "Brand B",
            size: "12×9×18cm",
            material: "70% Plastic, 30% Metal"
        },
    ];

    // Initialize LocomotiveScroll on mount
    onMount(() => {
        locomotiveScroll = new LocomotiveScroll({
            el: document.querySelector("[data-scroll-container]") as HTMLElement,
            smooth: true,
        });

        return () => {
            if (locomotiveScroll) {
                locomotiveScroll.destroy();
            }
        };
    });

    // Add product to cart
    function addToCart(productId: number, quantity: number) {
        const product = products.find((p: Product) => p.id === productId);
        if (product) {
            cart.update((items: CartItem[]) => {
                const existingItem = items.find((item: CartItem) => item.id === productId);
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    items.push({ ...product, quantity });
                }
                return items;
            });
        }
    }

    // Calculate total price of items in cart
    function calculateTotal() {
        const cartItems = get(cart);
        return cartItems.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
    }

    // Show user info form for checkout
    function proceedToCheckout() {
        showUserInfo = true;
    }

    // Validate and submit form
    function submitForm() {
        formErrors = validateForm(name, email, phoneNumber, address);
        if (Object.keys(formErrors).length === 0) {
            console.log({ name, email, phoneNumber, address, selectedProduct, quantity, additionalInfo });
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
    }

    // Open product modal
    function openModal(product: Product) {
        selectedProduct = product;
    }

    // Close product modal
    function closeModal() {
        selectedProduct = null;
    }

    // Update quantity of a product in the cart
    function updateQuantity(productId: number, change: number) {
        cart.update((items: CartItem[]) => {
            const itemIndex = items.findIndex((item: CartItem) => item.id === productId);
            if (itemIndex !== -1) {
                const updatedItem = { ...items[itemIndex], quantity: Math.max(1, items[itemIndex].quantity + change) };
                items = [
                    ...items.slice(0, itemIndex),
                    updatedItem,
                    ...items.slice(itemIndex + 1)
                ];
            }
            return items;
        });
        // Trigger recalculation of total
        total = calculateTotal();
    }

    // Remove product from cart
    function removeFromCart(productId: number) {
        cart.update((items: CartItem[]) => items.filter((item: CartItem) => item.id !== productId));
    }

    // Reactive statement to recalculate total when cart changes
    $: total = calculateTotal();
</script>

<div class="container mx-auto py-10">
    <h1 class="text-4xl font-dynapuff text-center mb-8">Shop</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each products as product}
            <ProductCard {product} {openModal} />
        {/each}
    </div>

    {#if $showCart}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 class="text-2xl mb-4 font-dynapuff text-black">Cart</h2>
            {#if get(cart).length === 0}
                <p class="text-center text-gray-700">No items added to the cart yet.</p>
            {:else}
                <ul>
                    {#each $cart as item}
                    <li class="flex justify-between items-center mb-2">
                        <div class="flex items-center w-1/2">
                            <img src={item.image} alt={item.name} class="w-16 h-16 object-cover mr-4" />
                            <span class="font-macondo text-black">{item.name}</span>
                        </div>
                        <div class="flex items-center space-x-2 w-1/4 justify-center">
                            <button on:click={() => updateQuantity(item.id, -1)} class="px-2 py-1 bg-gray-700 text-white rounded">-</button>
                            <span class="mx-2 text-black">{item.quantity}</span>
                            <button on:click={() => updateQuantity(item.id, 1)} class="px-2 py-1 bg-gray-700 text-white rounded">+</button>
                        </div>
                        <span class="text-black w-1/4 text-right">${item.price * item.quantity}</span>
                        <button on:click={() => removeFromCart(item.id)} class="ml-4 px-2 py-1 bg-red-600 text-white rounded">Remove</button>
                    </li>
                    {/each}
                </ul>
                <p class="mt-4 font-macondo text-black">Total: ${total}</p>
                <button on:click={proceedToCheckout} class="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500 transition duration-200">Proceed to Checkout</button>
            {/if}
            <button on:click={() => showCart.set(false)} class="mt-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500 transition duration-200">Close</button>
        </div>
    </div>

    {/if}

    {#if showUserInfo}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <form on:submit|preventDefault={submitForm} class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 class="text-2xl mb-4 font-dynapuff text-black">Order Summary</h2>
            <ul>
                {#each $cart as item}
                    <li class="font-macondo text-black">{item.name} - {item.quantity} x ${item.price}</li>
                {/each}
            </ul>
            <p class="mt-4 font-macondo text-black">Total: ${calculateTotal()}</p>
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
            <div class="flex justify-between mt-4">
                <button type="button" on:click={() => { showUserInfo = false; showCart.set(true); }} class="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500 transition duration-200">Back</button>
                <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500 transition duration-200">Submit</button>
            </div>
        </form>
    </div>
    {/if}

    {#if selectedProduct}
        <ProductModal {selectedProduct} {addToCart} {closeModal} on:click={closeModal} />
    {/if}
</div>