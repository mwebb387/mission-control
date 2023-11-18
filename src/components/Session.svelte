<script lang="ts">
  import { draggable } from '../actions/draggable';
  import type { ProgramTemplate, Session } from '../models/config';

  import { createEventDispatcher } from 'svelte';

  export let programs: ProgramTemplate[] = [];
  export let value: Session = {
    id: '',
    name: '',
    tags: [],
    programs: []
  }

  export let allowReorderPrevious = true;
  export let allowReorderNext = true;

  // TODO: Should pull from settings once implemented...
  let showReorderButtons = false;

  const dispatch = createEventDispatcher();

  // Helpers

  const getProgramName = id => {
    return programs.find( prog => prog.id === id ).name;
  }

  const getProgramIcon = id => {
    return programs.find( prog => prog.id === id).icon;
  }

  // Events

  const onEdit = () => {
    dispatch('editSession', value);
  }

  const onStartProgram = (idx: number) => {
    dispatch('startProgram', value.programs[idx]);
  }

  const onStartSession = () => {
    dispatch('startSession', value);
  }

  const onShiftPrevious = () => {
    dispatch('shiftPrevious', value);
  }

  const onShiftNext = () => {
    dispatch('shiftNext', value);
  }
</script>


<section class="card bg-neutral text-neutral-content" use:draggable={value}>
  <div class="card-body">
    <h3 class="card-title">{value.name}</h3>

    <div class="flex flex-wrap gap-4 px-6">
      {#each value.programs as program, index}
        <button title={getProgramName(program.id)} class="btn btn-sm" on:click={() => onStartProgram(index)}>
          <i class="{getProgramIcon(program.id)}"></i>
          {(program.name && program.name.length) ? program.name : getProgramName(program.id)}
          {#if !program.manualOnly}
            <i class="fas fa-cogs text-accent"></i>
          {/if}
        </button>
      {/each}
    </div>

    <div class="card-actions justify-end">
      <button title="Run Session" class="btn btn-square btn-sm" on:click={onStartSession}><i class="nf nf-fa-play"></i></button>
      <button title="Edit" class="btn btn-square btn-sm" on:click={onEdit}><i class="nf nf-fa-edit"></i></button>

      {#if showReorderButtons && allowReorderNext}
        <button title="Order Next" class="btn btn-square btn-sm" on:click={onShiftNext}><i class="nf nf-fa-sort_down"></i></button>
      {/if}

      {#if showReorderButtons && allowReorderPrevious}
        <button title="Order Previous" class="btn btn-square btn-sm" on:click={onShiftPrevious}><i class="nf nf-fa-sort_up"></i></button>
      {/if}
    </div>
  </div>
</section>