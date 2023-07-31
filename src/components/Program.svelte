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
    value.arguments = [
      ...value.arguments,
      ProgramService.createArgument(ArgumentType.input)
    ];
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

<section class="data-container" class:edit={isEditing} use:draggable={value} on:blur={onEditEnd}>
  {#if !isEditing}
    <div class="data-container__header">
      <i class="{value.icon}"></i>
      <h3>{getProgramString(value)}</h3>
      <div class="actions">
        <button title="Edit" class="button icon-button" on:click={onEditStart}><i class="nf nf-fa-edit"></i></button>
      </div>
    </div>
  {:else}
    <TextInput label="Name" description="Display Name" bind:value={value.name} />

    <div class="data-container__content-row-flush">
      <TextInput label="Program" description="Full Path" bind:value={value.path} />
      <button class="button icon-button" on:click={onSelectProgram} title="Select Program Path">
        <i class="nf nf-fa-search"></i>
      </button>
    </div>

    <div class="data-container__content-row-flush">
      <TextInput label="Icon" description="Icon Class" bind:value={value.icon} />
      <button class="button icon-button" on:click={onSelectIconClass} title="Select Icon">
        <i class="nf nf-fa-search"></i>
      </button>
    </div>

    <h2>Arguments</h2>

    {#each value.arguments as arg, index}
      <ProgramArgument bind:argument={arg} on:removeArgument={onRemoveArgument} />
    {/each}

    <AddFromOptions label="New Argument Type" options={argTypeOptions} on:newValue={onNewArgument} />

    <div class="actions">
      <button title="Save" class="button button-save icon-button" on:click={onEditEnd}><i class="nf nf-fa-save"></i></button>
      <button title="Remove" class="button button-delete icon-button" on:click={onRemoveProgram}><i class="nf nf-fa-trash"></i></button>
    </div>
  {/if}
</section>

<IconFinderModal bind:this={iconModal}></IconFinderModal>