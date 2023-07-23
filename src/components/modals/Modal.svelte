<script lang="ts">
  import type { ModalCancel, ModalConfirm, ModalResponse } from '../../models/modal-types';

  // Exports

  export function awaitRespose<T>(): Promise<ModalResponse<T>> {
    openModal();

    return new Promise((resolve, reject) => {
      resolveMethod = resolve;
      rejectMethod = reject;
    });
  }

  // Private vars

  let show = false;
  let resolveMethod: Function;
  let rejectMethod: Function;


  // Methods

  const openModal = () => {
    document.getElementsByTagName('body')[0].classList.add('open-modal');
    show = true;
  }

  const closeModal = () => {
    document.getElementsByTagName('body')[0].classList.remove('open-modal');
    show = false;
  }


  // Events

  const onConfirm = (data: any) => {
    closeModal();
    resolveMethod(<ModalConfirm<any>>{ result: 'confirm', data });
  }

  const onCancel = (data: any) => {
    closeModal();
    resolveMethod(<ModalCancel<any>>{ result: 'cancel', data });
  }

  const onError = (error: Error) => {
    closeModal();
    rejectMethod(error);
  }
</script>

{#if show}
<div class="modal">
  <div class="modal-content">
    <span class="modal-close" on:click={onCancel}>&times;</span>

    <slot ok={onConfirm} cancel={onCancel} error={onError}></slot>

  </div>
</div>
{/if}

<style>
  /* The Modal (background) */
  .modal {
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    display: flex;
    height: 100%; /* Full height */
    left: 0;
    overflow: auto; /* Enable scroll if needed */
    position: fixed; /* Stay in place */
    top: 0;
    width: 100%; /* Full width */
    z-index: 1; /* Sit on top */
  }

  /* Modal Content/Box */
  .modal-content {
    background-color: #484343;
    border: 2px solid #888;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto auto; /* 15% from the top and centered */
    max-width: 90%;
    padding: 20px;
    position: relative;
  }

  .modal-content > * + * {
    margin-top: 1rem;
  }

  /* The Close Button */
  .modal-close {
    color: #FFF;
    font-size: 28px;
    font-weight: bold;
    line-height: 16px;
    position: absolute;
    right: 2px;
    top: 0;
  }

  .modal-close:hover,
  .modal-close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
</style>
