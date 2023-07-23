<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Pager from './Pager.svelte';
  import TextInput from './inputs/TextInput.svelte';

  export let fontClasses: string[] = [];

  let filter: string;
  let currentPage: number = 0;
  let maxPerPage: number = 100;

  $: filteredClasses = fontClasses.filter(c => c.includes(filter));
  $: pagedFilteredClasses = filteredClasses.slice(currentPage * maxPerPage, (currentPage + 1) * maxPerPage);

  const dispatch = createEventDispatcher();
  function selectFont(font: string) {
    dispatch('selectFont', font);
  }
</script>

<TextInput label="Filter by name" bind:value={filter}></TextInput>
<div class="font-class-container">
  {#each pagedFilteredClasses as fontClass}
    <button type="button" class="button icon-button" title={fontClass} on:click={() => selectFont(`${fontClass}`)}>
      <i class="{fontClass}"></i>
    </button>
  {/each}
</div>
<Pager bind:currentPage {maxPerPage} total={filteredClasses.length}></Pager>
