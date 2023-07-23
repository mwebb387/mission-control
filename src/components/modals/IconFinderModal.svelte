<script lang="ts">
  import Modal from './Modal.svelte';
  import PagedFontClassSelector from '../PagedFontClassSelector.svelte';
  import Tab from '../tabs/Tab.svelte';
  import Tabs from '../tabs/Tabs.svelte';
  import { classes } from '../../constants/nerd-font-classes';
  import { brands, regular, solid } from '../../constants/font-awesome-classes';
  import type { ModalResponse } from '../../models/modal-types';

  export function awaitResponse(): Promise<ModalResponse<string>> {
    return modal.awaitRespose();
  }

  let nfClasses = classes.map(c => `nf ${c}`);
  let faClasses = [
    ...brands.map(b => `fab fa-${b}`),
    ...regular.map(r => `far fa-${r}`),
    ...solid.map(s => `fas fa-${s}`)
  ];
  let modal: Modal;
</script>

<Modal let:ok bind:this={modal}>
  <Tabs>
    <Tab name="Nerd Fonts" initial>
      <PagedFontClassSelector fontClasses={nfClasses} on:selectFont={event => ok(event.detail)}></PagedFontClassSelector>
    </Tab>
    <Tab name="Font Awesome">
      <PagedFontClassSelector fontClasses={faClasses} on:selectFont={event => ok(event.detail)}></PagedFontClassSelector>
    </Tab>
  </Tabs>
</Modal>
