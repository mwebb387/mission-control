<script lang="ts">
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
  import { selectDirOrFile } from '../services/tauri-service';

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

  const onSelectFile = async (progIndex: number, argIndex: number, isDirectory = false) => {
    const response = await selectDirOrFile(null, isDirectory)
    if (response) {
      value.programs[progIndex].arguments[argIndex].value += response;
    }
  }
</script>


<section class="card bg-neutral text-neutral-content">
  <div class="card-body">
    <TextInput label="Name" description="Display Name" bind:value={value.name} />

    <TagInput bind:tags={value.tags} />

    <div class="divider"></div>

    <h2 class="card-title">Programs</h2>

    <div class="join join-vertical w-full">
      {#each value.programs as program, progIndex (program.id)}
        <div class="collapse collapse-arrow join-item border border-base-300">
          <input type="checkbox" name="my-accordion-4" /> 
          <div class="collapse-title font-medium">
            {getProgramName(program.id)}
          </div>

          <div class="collapse-content">

            <div class="flex items-center gap-1 px-6">
              <Checkbox label="Admin" bind:checked={program.runAsAdmin} />
              <Checkbox label="Manual Only" bind:checked={program.manualOnly} title="Exclude from full session execution" />
            </div>

            <TextInput label="Name" bind:value={program.name} />

            <div class="flex gap-1 pl-6">
              {#each program.arguments as arg, argIndex}
                {#if getProgramArgumentType(program.id, arg.id) === ArgumentType.option}
                  <Checkbox label={getProgramArgumentName(program.id, arg.id)} bind:checked={arg.value} />
                {:else}
                  <TextAreaInput label={getProgramArgumentName(program.id, arg.id)} bind:value={arg.value} />

                  <div class="dropdown dropdown-top dropdown-end">
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label tabindex="0" class="btn btn-square btn-sm"><i class="nf nf-fa-search"></i></label>

                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <ul tabindex="0" class="dropdown-content z-10 menu p-4 shadow rounded-box bg-base-100 w-52 flex gap-1">
                      <button class="btn btn-sm btn-outline" on:click={() => onSelectFile(progIndex, argIndex)} title="Select File">
                        <i class="nf nf-oct-file"></i>File
                      </button>
                      <button class="btn btn-sm btn-outline" on:click={() => onSelectFile(progIndex, argIndex, true)} title="Select Folder">
                        <i class="nf nf-mdi-folder_outline"></i>Folder
                      </button>
                    </ul>
                  </div>
                {/if}
              {/each}
            </div>

            <div class="flex justify-end mt-12">
              <button title="Remove" class="btn btn-square btn-sm btn-outline btn-error" on:click={() => onRemoveSessionProgram(progIndex)}>
                <i class="nf nf-fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <AddFromOptions label="New Session Program Type" options={sessionProgramTypeOptions} on:newValue={onNewSessionProgram} />

    <div class="card-actions justify-end">
      <button title="Save" class="btn btn-square btn-sm" on:click={onSave}><i class="nf nf-fa-save"></i></button>
      <button title="Remove" class="btn btn-square btn-sm" on:click={onRemoveSession}><i class="nf nf-fa-trash"></i></button>
    </div>
  </div>
</section>