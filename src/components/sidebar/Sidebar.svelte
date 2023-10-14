<script context="module" lang="ts">
  export const key = {};
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  const currentItem = writable(null);

  setContext(key, {
    currentItem,
    setItem: (itemName: string) => currentItem.set(itemName)
  });
</script>

<div class="sidebar-container">
  <div class="sidebar bg-neutral text-neutral-content">
    <slot></slot>
  </div>
</div>

<style lang="scss">
  @import '../../styles/util/variables';

  .sidebar-container {
    display: flex;
    height: 100vh;
    overflow: hidden;
    position: relative;
    width: 100%;

    .sidebar {
      // background: $primary;
      flex: 0 0 50px;
    }
  }
</style>
