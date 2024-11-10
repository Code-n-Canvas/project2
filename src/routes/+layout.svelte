<script>
  import Header from "$lib/Header.svelte";
  import "../app.css";

  // Variables to track scroll position and window dimensions
  let y = 0;
  let innerWidth = 0;
  let innerHeight = 0;

  // Function to scroll to the top of the page
  function goTop() {
    document.body.scrollIntoView();
  }
</script>

<section
  class="container relative flex flex-col max-w-[1400px] mx-auto w-full text-sm sm:text-base min-h-screen z-[2]"
>
  <!-- SCROLL TO TOP BUTTON -->
  <div
    class={"fixed bottom-0 w-full right-0 duration-200 flex p-10 z-[10] " +
      (y > 0
        ? " opacity-full pointer-events-auto"
        : " pointer-events-none opacity-0")}
  >
    <button
      on:click={goTop}
      class="ml-auto rounded-full bg-slate-900 text-blue-400 px-3 sm:px-4 hover:bg-slate-800 cursor-pointer aspect-square grid place-items-center"
      aria-label="Scroll to top"
    >
      <i class="fa-solid fa-arrow-up"></i>
    </button>
  </div>

  <!-- HEADER/NAVBAR -->
  <Header />
  <!-- OUTLET FOR WHATEVER CONTENT -->
  <slot />
</section>

<!-- Bind scroll position and window dimensions -->
<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />
