<script lang="ts">
  import { onMount } from 'svelte';

  export let autofocus = false
  export let label = 'label';
  export let list = null;
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
  <input type=text class=input {list} placeholder={description} bind:value={value} on:keydown on:keyup bind:this={ref} />
</div>
