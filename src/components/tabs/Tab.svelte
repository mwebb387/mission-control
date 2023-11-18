<script lang="ts">
  import { getContext } from 'svelte';
  import { key } from './Tabs.svelte';

  const { currentTab, setTab } = getContext(key);

  export let name: string;
  export let initial: boolean = false;

  $: selected = $currentTab === name;
  $: hidden = !selected;

  if (initial) {
    setTab(name);
  }
</script>

<button
  type="button"
  class="tab tab-bordered"
  class:tab-active={selected}
  on:click="{() => setTab(name)}">{name}</button>

{#if selected}
<div class="my-2 w-full order-1" class:hidden>
  <slot></slot>
</div>
{/if}
