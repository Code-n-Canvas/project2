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
    name: "Product 3", 
    price: "$15", 
    image: "path/to/image3.jpg", 
    description: "Description for Product 3.",
    brand: "Brand C",
    size: "10×7×15cm",
    material: "80% Wood, 20% Fabric"
  },
  { 
    id: 4, 
    name: "Product 4", 
    price: "$25", 
    image: "path/to/image4.jpg", 
    description: "Description for Product 4.",
    brand: "Brand D",
    size: "14×10×20cm",
    material: "60% Glass, 40% Rubber"
  },
  { 
    id: 5, 
    name: "Product 5", 
    price: "$30", 
    image: "path/to/image5.jpg", 
    description: "Description for Product 5.",
    brand: "Brand E",
    size: "13×9×19cm",
    material: "50% Cotton, 50% Polyester"
  },
  { 
    id: 6, 
    name: "Product 6", 
    price: "$35", 
    image: "path/to/image6.jpg", 
    description: "Description for Product 6.",
    brand: "Brand F",
    size: "15×11×21cm",
    material: "90% Leather, 10% Metal"
  },
  { 
    id: 7, 
    name: "Product 7", 
    price: "$40", 
    image: "path/to/image7.jpg", 
    description: "Description for Product 7.",
    brand: "Brand G",
    size: "16×12×22cm",
    material: "85% Silk, 15% Wool"
  },
  { 
    id: 8, 
    name: "Product 8", 
    price: "$45", 
    image: "path/to/image8.jpg", 
    description: "Description for Product 8.",
    brand: "Brand H",
    size: "17×13×23cm",
    material: "75% Nylon, 25% Spandex"
  },
  { 
    id: 9, 
    name: "Product 9", 
    price: "$50", 
    image: "path/to/image9.jpg", 
    description: "Description for Product 9.",
    brand: "Brand I",
    size: "18×14×24cm",
    material: "95% Wool, 5% Silk"
  },
  { 
    id: 10, 
    name: "Product 10", 
    price: "$55", 
    image: "path/to/image10.jpg", 
    description: "Description for Product 10.",
    brand: "Brand J",
    size: "19×15×25cm",
    material: "100% Cotton"
  }
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
