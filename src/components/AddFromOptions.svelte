<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Dropdown from './inputs/Dropdown.svelte';

  export let label = 'New Option';
  export let options: { name: string, value: string }[] = [];

  let editState = false;
  let newOption = options.length ? options[0].value : '';

  const dispatch = createEventDispatcher();


  // Events

  const addStart = () => {
    editState = true;
  }

  const confirm = () => {
    dispatch('newValue', newOption);
    reset();
  }

  const cancel = () => {
    reset();
  }

  const reset = () => {
    editState = false;
    newOption = options.length ? options[0].value : '';
  }
</script>

{#if !editState}
  <div>
    <button class="button icon-button" title="Add New" on:click={addStart}>
      <i class="nf nf-fa-plus"></i>
    </button>
  </div>
{:else}
  <div class="stack-horizontal">
    <Dropdown label={label} options={options} bind:value={newOption} />
    <button class="button icon-button" title="Confirm" on:click={confirm}>
      <i class="nf nf-fa-check"></i>
    </button>
    <button class="button icon-button" title="Cancel" on:click={cancel}>
      <i class="nf nf-fa-times"></i>
    </button>
  </div>
{/if}

<style>
div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
</style>