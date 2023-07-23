<script lang="ts">
  import { getContext } from 'svelte';
  import { key } from './Tabs.svelte';

  const { currentTab, setTab } = getContext(key);

  export let name: string;
  export let initial: boolean = false;

  $: selected = $currentTab === name;

  if (initial) {
    setTab(name);
  }
</script>

<div class="tab" class:tab-selected={selected}>
  <button type="button" on:click="{() => setTab(name)}">{name}</button>
</div>

{#if selected}
<div class="tab-content">
  <slot></slot>
</div>
{/if}
