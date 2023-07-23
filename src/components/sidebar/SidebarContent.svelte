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

<button type="button" class:selected on:click="{() => setItem(name)}">
  {#if iconClass}
    <i class={iconClass}></i>
  {:else}
    {name}
  {/if}
  <span class="tooltip">{name}</span>
</button>

{#if selected}
<div class="sidebar-content">
  <slot></slot>
</div>
{/if}

<style lang="scss">
  @import '../../styles/util/variables';

  button {
    background: $primary;
    border: none;
    border-left: 2px solid transparent;
    color: $off-white;
    cursor: pointer;
    outline: none;
    padding: 0.5rem 0.75rem;
    position: relative;

    &.selected {
      border-left: 2px solid $accent;
      color: $accent;
    }

    &:hover {
      color: $accent;

      & > .tooltip {
        display: inline-block;
      }
    }

    i {
      font-size: 2rem;
    }
  }

  .tooltip {
    color: $white;
    background: $primary;
    border: 1px solid $white;
    box-shadow: 0 0 8px 0px $box-shadow;
    display: none;
    font-size: 0.75rem;
    left: 50px;
    position: absolute;
    padding: 3px 10px;
    top: 25%;
    z-index: 99;
  }

  .sidebar-content {
    bottom: 0;
    left: 50px;
    max-width: 1000px;
    margin: 0 auto;
    overflow-y: auto;
    padding: 8px;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
