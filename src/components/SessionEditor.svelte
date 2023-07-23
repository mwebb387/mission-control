<script lang="ts">
  import FileFinderModal from './modals/FileFinderModal.svelte';
  import Checkbox from './inputs/Checkbox.svelte';
  import TextAreaInput from './inputs/TextAreaInput.svelte';
  import TextInput from './inputs/TextInput.svelte';
  import AddFromOptions from './AddFromOptions.svelte';
  import SessionService from '../services/session-service';
  import TagInput from './tags/TagInput.svelte';
  import { ArgumentType } from '../models/config';
  import type { ModalResponse } from '../models/modal-types';
  import type { ProgramTemplate, Session } from '../models/config';

  import { createEventDispatcher } from 'svelte';

  export let programs: ProgramTemplate[] = [];
  export let value: Session = {
    id: '',
    name: '',
    tags: [],
    programs: []
  }

  const dispatch = createEventDispatcher();

  const sessionProgramTypeOptions =
    programs.map(prog => ({ name: prog.name, value: prog.id }));

  let fileModal: FileFinderModal;

  // Helpers

  const getProgramName = id => {
    return programs.find( prog => prog.id === id ).name;
  }

  const getProgramArgumentName = (progId, argId) => {
    const prog = programs.find( prog => prog.id === progId );
    return prog.arguments.find( arg => arg.id === argId ).name;
  }

  const getProgramArgumentType = (progId, argId) => {
    const prog = programs.find( prog => prog.id === progId );
    return prog.arguments.find( arg => arg.id === argId ).type;
  }


  // Events

  const onSave = () => {
    dispatch('saveSession', value);
  }

  const onNewSessionProgram = event => {
    value.programs = [...value.programs, SessionService.createSessionProgram(event.detail, programs)];
  }

  const onRemoveSessionProgram = programIndex => {
    value.programs = value.programs.filter((_, idx) => idx !== programIndex);
  }

  const onRemoveSession = () => {
    dispatch('removeSession', value);
  }

  const onSelectFile = async (progIndex: number, argIndex: number) => {
    const response : ModalResponse<string> = await fileModal.awaitResponse();
    if (response.result === 'confirm') {
      value.programs[progIndex].arguments[argIndex].value += response.data;
    }
  }
</script>


<section class="data-container edit">
  <TextInput label="Name" description="Display Name" bind:value={value.name} />

  <TagInput bind:tags={value.tags} />

  <h2>Programs</h2>

  {#each value.programs as program, progIndex}
    <div class="data-container__content-container">
      <button title="Remove" class="button button-delete icon-button" on:click={() => onRemoveSessionProgram(progIndex)}><i class="nf nf-fa-trash"></i></button>
      <span>{getProgramName(program.id)}</span>

      <TextInput label="Name" bind:value={program.name} />

      <div class="data-container__content-row">
        <Checkbox label="Admin" bind:checked={program.runAsAdmin} />
        <Checkbox label="Manual Only" bind:checked={program.manualOnly} title="Exclude from full session execution" />
        {#each program.arguments as arg, argIndex}
          {#if getProgramArgumentType(program.id, arg.id) === ArgumentType.option}
            <Checkbox label={getProgramArgumentName(program.id, arg.id)} bind:checked={arg.value} />
          {:else}
            <TextAreaInput label={getProgramArgumentName(program.id, arg.id)} bind:value={arg.value} />
            <button class="button icon-button" on:click={() => onSelectFile(progIndex, argIndex)}>
              <i class="nf nf-fa-search"></i>
            </button>
          {/if}
        {/each}
      </div>
    </div>
  {/each}

  <AddFromOptions label="New Session Program Type" options={sessionProgramTypeOptions} on:newValue={onNewSessionProgram} />

  <div class="actions">
    <button title="Save" class="button button-save icon-button" on:click={onSave}><i class="nf nf-fa-save"></i></button>
    <button title="Remove" class="button button-delete icon-button" on:click={onRemoveSession}><i class="nf nf-fa-trash"></i></button>
  </div>
</section>

<FileFinderModal bind:this={fileModal}></FileFinderModal>
