<script lang="ts">
  import { writable } from 'svelte/store';
  import { validateForm } from '$lib/formValidator';

  type ErrorType = {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };

  let name = '';
  let email = '';
  let phoneNumber = '';
  let reason = '';
  let additionalInfo = '';
  let errors = writable<ErrorType>({});

  function submitForm() {
    const validationErrors = validateForm(name, email, phoneNumber);
    if (Object.keys(validationErrors).length === 0) {
      console.log({ name, email, phoneNumber, reason, additionalInfo });
      // Handle form submission
    } else {
      errors.set(validationErrors);
    }
  }
</script>

<div class="container mx-auto py-10">
  <h1 class="text-4xl font-dynapuff text-center mb-8">Contact Us</h1>
  <form on:submit|preventDefault={submitForm} class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
    <div class="mb-4">
      <label for="name" class="font-macondo text-black">Name:</label>
      <input type="text" id="name" bind:value={name} required class="w-full p-2 border rounded text-black" />
      {#if $errors.name}
        <p class="text-red-600">{$errors.name}</p>
      {/if}
    </div>
    <div class="mb-4">
      <label for="email" class="font-macondo text-black">E-mail:</label>
      <input type="email" id="email" bind:value={email} required class="w-full p-2 border rounded text-black" />
      {#if $errors.email}
        <p class="text-red-600">{$errors.email}</p>
      {/if}
    </div>
    <div class="mb-4">
      <label for="phoneNumber" class="font-macondo text-black">Phone Number:</label>
      <input type="tel" id="phoneNumber" bind:value={phoneNumber} required class="w-full p-2 border rounded text-black" />
      {#if $errors.phoneNumber}
        <p class="text-red-600">{$errors.phoneNumber}</p>
      {/if}
    </div>
    <div class="mb-4">
      <label for="reason" class="font-macondo text-black">Reason for Contact:</label>
      <input type="text" id="reason" bind:value={reason} class="w-full p-2 border rounded text-black" />
    </div>
    <div class="mb-4">
      <label for="additionalInfo" class="font-macondo text-black">Additional Information:</label>
      <textarea id="additionalInfo" bind:value={additionalInfo} class="w-full p-2 border rounded text-black"></textarea>
    </div>
    <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500 transition duration-200">Submit</button>
  </form>
</div>
