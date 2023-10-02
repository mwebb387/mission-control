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
    <button class="btn btn-square btn-sm" title="Add New" on:click={addStart}>
      <i class="nf nf-fa-plus"></i>
    </button>
  </div>
{:else}
  <div class="flex gap-1 flex-wrap justify-between items-end">
    <Dropdown label={label} options={options} bind:value={newOption} />
    <div class="pb-2">
      <button class="btn btn-square btn-sm" title="Confirm" on:click={confirm}>
        <i class="nf nf-fa-check"></i>
      </button>
      <button class="btn btn-square btn-sm" title="Cancel" on:click={cancel}>
        <i class="nf nf-fa-times"></i>
      </button>
    </div>
  </div>
{/if}