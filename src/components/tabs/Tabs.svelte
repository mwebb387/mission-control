<script context="module" lang="ts">
  export const key = {};
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  const currentTab = writable(null);

  setContext(key, {
    currentTab,
    setTab: tabName => currentTab.set(tabName)
  });
</script>

<div class="tabs">
  <slot></slot>
</div>
