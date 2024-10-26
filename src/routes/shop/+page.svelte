<script lang="ts">
    import { onMount } from "svelte";
    import Header from "$lib/Header.svelte";
    import ProductCard from "$lib/ProductCard.svelte";
    import LocomotiveScroll from "locomotive-scroll";

    let locomotiveScroll: any;

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

let products = [
  { 
    id: 1, 
    name: "Acheron eating a peach", 
    price: "$10", 
    image: "images/p1.jpg", 
    description: "A delightful painting of Acheron enjoying a peach.",
    brand: "POP MART",
    size: "11×8×17.5cm",
    material: "66% Polyester, 25% PVC, 9% ABS"
  },
  { 
    id: 2, 
    name: "Squishy Axolotl", 
    price: "$20", 
    image: "images/p2.jpg", 
    description: "Squish Squish.",
    brand: "Brand B",
    size: "12×9×18cm",
    material: "70% Plastic, 30% Metal"
  },
  { 
    id: 3, 
    name: "Traveler", 
    price: "$30", 
    image: "images/p2.jpg", 
    description: "",
    brand: "Brand B",
    size: "12×9×18cm",
    material: "70% Plastic, 30% Metal"
  },
];
</script>


<div class="container mx-auto py-10">
  <h1 class="text-4xl font-dynapuff text-center mb-8">Shop</h1>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {#each products as product}
      <ProductCard {product} />
    {/each}
  </div>
</div>
