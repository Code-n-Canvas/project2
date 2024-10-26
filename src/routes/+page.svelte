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
  <section class="flex flex-col items-center justify-center h-screen" style="height: 80vh; margin-top: -20px;">
    <!-- Red Box -->
    <div class="relative shadow-2xl grid place-items-center justify-center -mt-10">
      <h1 class="text-8xl font-dynapuff text-white">Cozy Creatives</h1>
    </div>

    <!-- Yellow Box -->
    <!-- <div class="border-4 border-yellow-500 w-1/3 h-20 mt-10 flex items-center justify-center">
      <button class="bg-blue-500 text-white px-4 py-2 rounded">Show</button>
    </div> -->
  </section>
</div>
