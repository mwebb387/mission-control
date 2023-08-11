<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { arrayMove } from '../util';
  import ConfirmationModal from './modals/ConfirmationModal.svelte';
  import Dropzone from './Dropzone.svelte';
  import Program from './Program.svelte';
  import AddFromInput from './AddFromInput.svelte';
  import ProgramService from '../services/program-service';
  import type { ProgramTemplate } from '../models/config';

  export let programs: ProgramTemplate[] = [];

  let modal: ConfirmationModal;

  const dispatch = createEventDispatcher();

  const onDropped = (event: CustomEvent<ProgramTemplate>, index: number) => {
    const droppedTemplate = event.detail;
    const oldIndex = programs.findIndex(p => p.id === droppedTemplate.id);
    const newIndex = index > oldIndex ? index - 1 : index;

    let reordered = arrayMove([...programs], oldIndex, newIndex);

    programs = reordered;
  }

  const onNewProgram = (event: CustomEvent<string>) => {
    programs = [...programs,  ProgramService.createProgram(event.detail)];
    dispatch('programsChanged');
  }

  const onRemoveProgram = async (event: CustomEvent<ProgramTemplate>) => {
    const { data } = await modal.awaitResponse();
    if (data) {
      dispatch('removeProgram', event.detail);
    }
  }
</script>

<div class="flex flex-col">

  {#each programs as program, i (program.id)}
    <Dropzone on:dropped={ev => onDropped(ev, i)}></Dropzone>

    <Program value={program} on:removeProgram={onRemoveProgram} />
  {/each}

  <Dropzone on:dropped={ev => onDropped(ev, programs.length)}></Dropzone>

  <AddFromInput label="New Program Name" on:newValue={onNewProgram} />

</div>

<ConfirmationModal bind:this={modal}>
  <p>Are you sure you want to remove the program?</p>
</ConfirmationModal>
