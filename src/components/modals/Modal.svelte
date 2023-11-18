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

  let modal: HTMLElement;
  let show = false;
  let resolveMethod: Function;
  let rejectMethod: Function;


  // Methods

  const openModal = () => {
    document.getElementsByTagName('body')[0].classList.add('open-modal');
    modal.showModal();
  }

  const closeModal = () => {
    document.getElementsByTagName('body')[0].classList.remove('open-modal');
    modal.close();
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

<dialog class="modal" bind:this={modal}>
  <form class="modal-box" method="dialog">
    <button
      type="button"
      class="btn btn-circle btn-xs absolute top-2 right-2"
      on:click={onCancel}>✖</button>

    <slot ok={onConfirm} cancel={onCancel} error={onError}></slot>

  </form>
</dialog>