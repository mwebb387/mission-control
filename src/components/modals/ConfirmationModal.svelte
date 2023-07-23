<script lang="ts">
  import Modal from './Modal.svelte'
  import type { ModalResponse, ConfirmationModalStyle } from '../../models/modal-types';

  export let modalStyle: ConfirmationModalStyle = 'confirm';

  export function awaitResponse(): Promise<ModalResponse<boolean>> {
    return modal.awaitRespose();
  }

  let modal: Modal;
</script>

<Modal let:ok let:cancel bind:this={modal}>
  <slot>Are you sure you want to continue?</slot>

  <div class="modal-buttons">
    {#if modalStyle === 'save-cancel'}
      <button class="button" on:click={() => ok(true)}>Save</button>
      <button class="button" on:click={() => cancel(false)}>Cancel</button>
    {:else}
      <button class="button" on:click={() => ok(true)}>Yes</button>
      <button class="button" on:click={() => ok(false)}>No</button>
    {/if}
  </div>
</Modal>

<style>
  .modal-buttons {
    display: flex;
    justify-content: space-evenly;
    margin-top: 1rem;
  }

  .modal-buttons button {
    width: 25%;
  }
</style>
