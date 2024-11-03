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

<div data-scroll-container>
  <section
    class="flex flex-col items-center justify-center h-screen"
    style="height: 80vh; margin-top: -20px;"
  >
    <div
      class="relative shadow-2xl grid place-items-center justify-center -mt-10"
    >
      <h1 class="text-8xl max-sm:text-4xl font-dynapuff text-white">
        Cozy Creatives
      </h1>
    </div>

    <hr class="h-px w-[80%] mx-auto my-8 bg-white border-2" />

    <div class="w-[80%]">
      <p class="text-center text-lg">
        Cozy Creatives is your go-to online shop for unique,
        digitally-illustrated merchandise that brings charm and creativity to
        everyday items. Check out our collection of witty stickers, whimsical
        bookmarks, and playful keychains—each piece designed to add a cozy,
        creative touch to your life.
      </p>
    </div>
  </section>
</div>
