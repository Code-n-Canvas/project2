<script>
  export let y;
  export let innerHeight;

  // Tabs for navigation
  export let tabs = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/project2/shops" },
    //   { name: "Projects", link: "/portfolio" },
  ];

  // State to toggle dropdown
  let isDropdownOpen = false;
</script>

<header
  class={"sticky z-[10] top-0 duration-200 px-6 flex items-center justify-between border-b border-solid " +
    (y > 0
      ? " py-4 bg-black border-blue-700"
      : " py-6 bg-transparent border-transparent")}
>
  <!-- Header Title -->
  <h1 class="font-medium">
    <b class="font-dynapuff">Cozy Creatives</b>
  </h1>
  <!-- Navigation Tabs for larger screens -->
  <div class="sm:flex items-center gap-4 hidden">
    {#each tabs as tab, index}
      <a href={tab.link} class="duration-200 hover:text-blue-400">
        <p class="font-macondo">{tab.name}</p>
      </a>
    {/each}
    <!-- connect with me button -->
    <a
      href="/project2/contact"
      class="blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-black text-white"
    >
      <div
        class="absolute top-0 right-full w-full h-full bg-blue-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
      ></div>
      <h4 class="relative z-9 font-macondo">Connect with Us!</h4>
    </a>
  </div>
  <!-- Dropdown button for mobile view -->
  <div class="sm:hidden relative">
    <button
      on:click={() => (isDropdownOpen = !isDropdownOpen)}
      class="px-4 py-2 bg-black text-white rounded flex items-center gap-2 hover:text-blue-400 duration-200"
      aria-label="Toggle navigation menu"
    >
      <i class="fas fa-bars"></i>
    </button>
    {#if isDropdownOpen}
      <div
        class="absolute right-0 mt-2 w-48 bg-black border border-gray-200 rounded shadow-lg transition-transform transform origin-top-right duration-200 ease-out scale-100"
      >
        {#each tabs as tab, index}
          <a
            href={tab.link}
            class="block px-4 py-2 text-white hover:text-blue-400 duration-200"
          >
            <p class="font-nunito">{tab.name}</p>
          </a>
        {/each}
        <a
          href="/project2/contact"
          class="block px-4 py-2 text-white hover:text-blue-400 duration-200 font-afacad"
        >
          Connect with Us!
        </a>
      </div>
    {/if}
  </div>
</header>
