<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { draggable } from '../actions/draggable';
  import AddFromOptions from './AddFromOptions.svelte';
  import IconFinderModal from './modals/IconFinderModal.svelte';
  import ProgramArgument from './ProgramArgument.svelte';
  import ProgramService from '../services/program-service';
  import TextInput from './inputs/TextInput.svelte';
  import { ArgumentType } from '../models/config';
  import type { ModalResponse } from '../models/modal-types'
  import type { ProgramTemplate } from '../models/config';
  import { selectDirOrFile } from '../services/tauri-service';

  export let value: ProgramTemplate = {
    id: '',
    name: '',
    path: '',
    icon: '',
    arguments: []
  };

  let argTypeOptions = [
    { name: "Input", value: ArgumentType.input },
    { name: "Option", value: ArgumentType.option }
  ];

  let isEditing = false;

  let iconModal: IconFinderModal;

  const dispatch = createEventDispatcher();


  // Helpers

  const getProgramString = program => {
    return ProgramService.getProgramDescription(program);
  }


  // Events

  const onEditStart = () => {
    isEditing = true;
  }

  const onEditEnd = () => {
    isEditing = false;
  }

  const onRemoveProgram = () => {
    dispatch('removeProgram', value);
  }

  const onNewArgument = () => {
    value.arguments.push(ProgramService.createArgument(ArgumentType.input))
    value.arguments = value.arguments;
  }

  const onRemoveArgument = event => {
    value.arguments = value.arguments.filter(arg => arg.id !== event.detail.id);
  }

  const onSelectIconClass = async () => {
    let response: ModalResponse<string> = await iconModal.awaitResponse();
    if (response.result === 'confirm') {
      value.icon = response.data;
    }
  }

  const onSelectProgram = async () => {
    const response = await selectDirOrFile()
    if (response) {
      value.path = response;
    }
  }
</script>

<section class="card bg-neutral text-neutral-content" class:edit={isEditing} use:draggable={value} on:blur={onEditEnd}>
  <div class="card-body">
    {#if !isEditing}
        <h2 class="card-title">
          <i class="{value.icon}"></i> {getProgramString(value)}
        </h2>
        <div class="card-actions justify-end">
          <button title="Edit" class="btn btn-square btn-sm" on:click={onEditStart}><i class="nf nf-fa-edit"></i></button>
        </div>
    {:else}
      <TextInput label="Name" description="Display Name" bind:value={value.name} />

      <div class="flex items-end">
        <TextInput label="Program" description="Full Path" bind:value={value.path} />
        <button class="btn btn-square btn-sm mb-2" on:click={onSelectProgram} title="Select Program Path">
          <i class="nf nf-fa-search"></i>
        </button>
      </div>

      <div class="flex items-end">
        <TextInput label="Icon" description="Icon Class" bind:value={value.icon} />
        <button class="btn btn-square btn-sm mb-2" on:click={onSelectIconClass} title="Select Icon">
          <i class="nf nf-fa-search"></i>
        </button>
      </div>

      <h2 class="text-lg font-bold">Arguments</h2>

      {#each value.arguments as arg, index}
        <ProgramArgument bind:argument={arg} on:removeArgument={onRemoveArgument} />
      {/each}

      <AddFromOptions label="New Argument Type" options={argTypeOptions} on:newValue={onNewArgument} />

      <div class="card-actions justify-end py-5">
        <button title="Remove" class="btn btn-square btn-sm btn-outline btn-error" on:click={onRemoveProgram}><i class="nf nf-fa-trash"></i></button>
        <button title="Save" class="btn btn-square btn-sm btn-success" on:click={onEditEnd}><i class="nf nf-fa-save"></i></button>
      </div>
    {/if}
  </div>
</section>

<IconFinderModal bind:this={iconModal}></IconFinderModal>