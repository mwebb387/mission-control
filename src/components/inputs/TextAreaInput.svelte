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

<div class="form-control grow">
  <label class="label flex flex-col items-start gap-1">
    <span class="label-text">{label}</span>
    <textarea class=input placeholder={description} bind:value={value} on:keydown on:keyup bind:this={ref} />
  </label>
</div>
