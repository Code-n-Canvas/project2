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
  <section>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
  </section>
</div>
