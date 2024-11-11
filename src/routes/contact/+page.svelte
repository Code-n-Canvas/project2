<script lang="ts">
  import { writable } from "svelte/store";
  import { validateForm } from "$lib/formValidator";

  type ErrorType = {
    name?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    reason?: string;
  };

  let name = "";
  let email = "";
  let phoneNumber = "";
  let address = "";
  let reason = "";
  let additionalInfo = "";
  let errors = writable<ErrorType>({});

  function submitForm() {
    const validationErrors = validateForm(name, email, phoneNumber, address, reason);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully with the following data:", {
        name,
        email,
        phoneNumber,
        address,
        reason,
        additionalInfo
      });
      // Reset form fields after successful submission
      name = "";
      email = "";
      phoneNumber = "";
      address = "";
      reason = "";
      additionalInfo = "";
    } else {
      errors.set(validationErrors);
      console.log("Form validation failed:", validationErrors);
    }
  }
</script>

<section>
  <!-- HEADER -->
  <div class="relative">
    <img
      class="backdrop w-full h-[30vh] top-0 object-cover"
      src="assets/contact_us_bg.jpg"
      alt=""
    />
    <div class="absolute inset-0 flex items-center justify-center">
      <h1 class="text-white text-2xl md:text-4xl font-bold">Contact Us!</h1>
    </div>
  </div>

  <!-- CONTENT -->
  <div class="container mx-auto py-10">
    <div class="max-h-[400px] overflow-y-auto">
      <form
        on:submit|preventDefault={submitForm}
        class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
      >
        <div class="mb-4">
          <label for="name" class="font-macondo text-black">Name:</label>
          <input
            type="text"
            id="name"
            bind:value={name}
            required
            class="w-full p-2 border rounded text-black"
          />
          {#if $errors.name}
            <p class="text-red-600">{$errors.name}</p>
          {/if}
        </div>
        <div class="mb-4">
          <label for="email" class="font-macondo text-black">E-mail:</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            required
            class="w-full p-2 border rounded text-black"
          />
          {#if $errors.email}
            <p class="text-red-600">{$errors.email}</p>
          {/if}
        </div>
        <div class="mb-4">
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
          {#if $errors.phoneNumber}
            <p class="text-red-600">{$errors.phoneNumber}</p>
          {/if}
        </div>
        <div class="mb-4">
          <label for="address" class="font-macondo text-black">Address:</label>
          <input
            type="text"
            id="address"
            bind:value={address}
            required
            class="w-full p-2 border rounded text-black"
          />
          {#if $errors.address}
            <p class="text-red-600">{$errors.address}</p>
          {/if}
        </div>
        <div class="mb-4">
          <label for="reason" class="font-macondo text-black"
            >Reason for Contact:</label
          >
          <input
            type="text"
            id="reason"
            bind:value={reason}
            required
            class="w-full p-2 border rounded text-black"
          />
          {#if $errors.reason}
            <p class="text-red-600">{$errors.reason}</p>
          {/if}
        </div>
        <div class="mb-4">
          <label for="additionalInfo" class="font-macondo text-black"
            >Additional Information:</label
          >
          <textarea
            id="additionalInfo"
            bind:value={additionalInfo}
            class="w-full p-2 border rounded text-black"
          ></textarea>
        </div>
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500 transition duration-200"
          >Submit</button
        >
      </form>
    </div>
  </div>
</section>

<style>
  .backdrop {
    filter: blur(2.25px);
  }
</style>
