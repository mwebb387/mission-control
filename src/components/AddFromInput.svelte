<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TextInput from './inputs/TextInput.svelte';

  export let label = 'New Value';
  export let edit = false;

  let newValue = '';

  const dispatch = createEventDispatcher();


  // Events

  const addStart = () => {
    edit = true;
  }

  const confirm = () => {
    dispatch('newValue', newValue);
    reset();
  }

  const cancel = () => {
    reset();
  }

  const focusout = event => {
    console.log(event);
  }

  const keydown = event => {
    if (event.code === 'Enter') {
      confirm();
      event.cancelBubble = true;
      event.preventDefault();
    }

    // TODO: Escape key

    console.log(event)
  }

  const reset = () => {
    edit = false;
    newValue = '';
  }
</script>

{#if !edit}
  <div>
    <button class="button icon-button" title="Add New" on:click={addStart}>
      <i class="nf nf-fa-plus"></i>
    </button>
  </div>
{:else}
  <div class="stack-horizontal" on:focusout={focusout}>
    <TextInput label={label} bind:value={newValue} on:keydown={keydown} autofocus={true} />
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