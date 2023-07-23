export interface ModalConfirm<T> {
  result: 'confirm',
  data: T
}

export interface ModalCancel<T> {
  result: 'cancel'
  data: T
}

export type ModalResponse<T> = ModalConfirm<T> | ModalCancel<T>

export type ConfirmationModalStyle = 'confirm' | 'save-cancel';
