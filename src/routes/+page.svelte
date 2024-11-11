<script lang="ts">
  import { onMount } from "svelte";
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
</script>

<div
  data-scroll-container
  class="flex flex-col pt-20 px-24 max-sm:px-5 h-screen overflow-hidden relative"
>
  <!-- DIV FOR HEADER TEXTS -->
  <div
    class="w-[50%] max-sm:w-[100%] max-md:w-[100%] max-sm:text-center max-md:text-center"
  >
    <h1 class="text-5xl font-bold mb-4">
      Witty Stickers, Charming Bookmarks, and More!
    </h1>

    <p>
      Explore our handcrafted digital merchandise, designed to bring creativity
      and coziness to your everyday life.
    </p>
  </div>

  <!-- DIV FOR CALL TO ACTION BUTTONS -->
  <div
    class="ml-20 mt-20 max-sm:ml-0 max-sm:mt-10 flex gap-5 max-sm:justify-center"
  >
    <a
      href="/project2/shop"
      class="text-white p-5 text-2xl max-sm:text-lg font-bold rounded-xl bg-red-500 shadow-md"
    >
      <h1>Shop Now!</h1>
    </a>

    <a
      href="/project2/contact"
      class="text-black p-5 text-2xl max-sm:text-lg font-bold rounded-xl bg-white shadow-md"
    >
      <h1>Contact Us!</h1>
    </a>
  </div>

  <!-- DIV FOR MASCOT -->
  <div
    class="max-sm:hidden max-md:hidden absolute -right-20 top-1/2 transform -translate-y-1/2 w-[55%]"
  >
    <img src="assets/mascot.png" alt="" />
  </div>

  <!-- DIV FOR BACKGROUND SQUARE -->
  <div class="element"></div>
</div>

<style>
  .element::before {
    content: "";
    position: absolute;
    bottom: -18rem;
    right: -18rem;
    width: 1000px;
    height: 700px;
    background-color: #fff8a7; /* bg-primary color */
    border-radius: 250px;
    transform: rotate(70deg);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: -1;
  }
</style>
