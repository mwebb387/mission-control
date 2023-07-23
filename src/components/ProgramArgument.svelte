<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TextInput from './inputs/TextInput.svelte';
  import Dropdown from './inputs/Dropdown.svelte';
  import { ArgumentType } from '../models/config';
  import type { ArgumentTemplate } from '../models/config';

  export let argument: ArgumentTemplate  = {
    id: '',
    name: '',
    type: ArgumentType.input,
    value: ''
  };

  let dropdownOptions = [
    { name: 'Input', value: ArgumentType.input },
    { name: 'Option', value: ArgumentType.option }
  ];

  const dispatch = createEventDispatcher();

  const onRemoveArgument = () => {
    dispatch('removeArgument', argument);
  }
</script>

<div class="data-container__content-container">
  <div class="data-container__content-row">
    <TextInput label="Name" description="Argument Display Name" bind:value={argument.name} />

    {#if argument.type === ArgumentType.option}
      <TextInput label="Value" description="Argument Value" bind:value={argument.value} />
    {/if}
    
    <Dropdown label="Type" options={dropdownOptions} bind:value={argument.type} />
    
    <button title="Remove" class="button button-delete icon-button" on:click={onRemoveArgument}><i class="nf nf-fa-trash"></i></button>
  </div>
</div>
