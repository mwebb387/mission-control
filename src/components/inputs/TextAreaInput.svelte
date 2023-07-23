<script lang="ts">
  import { onMount } from 'svelte';

  export let autofocus = false
  export let label = 'label';
  export let description = '';
  export let value = '';

  let ref;

  onMount(() => {
    if (autofocus) {
      ref.focus();
    }
  });
</script>

<div class="input-container grow">
  <label>{label}</label>
  <textarea class=input placeholder={description} bind:value={value} on:keydown on:keyup bind:this={ref} />
</div>
