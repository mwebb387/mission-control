<script lang="ts">
  import { getContext } from 'svelte';
  import { key } from './Sidebar.svelte';

  const { currentItem, setItem } = getContext(key);

  export let name: string;
  export let iconClass: string = '';
  export let initial: boolean = false;

  $: selected = $currentItem === name;

  if (initial) {
    setItem(name);
  }
</script>

<div class="tooltip tooltip-right" data-tip={name}>
  <button type="button" class="hover:text-secondary" class:selected on:click="{() => setItem(name)}">
    {#if iconClass}
      <i class={iconClass}></i>
    {:else}
      {name}
    {/if}
  </button>
</div>

{#if selected}
<div class="sidebar-content">
  <slot></slot>
</div>
{/if}

<style lang="scss">
  button {
    border: none;
    border-left: 2px solid transparent;
    cursor: pointer;
    outline: none;
    padding: 0.5rem 0.75rem;
    position: relative;

    &.selected {
      border-left: 2px solid hsl(var(--s));
      color: hsl(var(--s));
    }

    i {
      font-size: 2rem;
    }
  }

  .sidebar-content {
    bottom: 0;
    left: 50px;
    max-width: 1000px;
    margin: 0 auto;
    overflow-y: auto;
    padding: 8px 8px 50px;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
