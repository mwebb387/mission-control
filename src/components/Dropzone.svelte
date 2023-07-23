<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let dragover = false;

  const dispatch = createEventDispatcher();

  function onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    dragover = true;
  }

  function onDragLeave(event: DragEvent) {
    event.preventDefault();
    dragover = false;
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    dragover = false;

    const json = event.dataTransfer.getData('application/json');
    const data = JSON.parse(json);

    dispatch('dropped', data);
  }
</script>

<div
  class:dragover
  on:dragover={onDragOver}
  on:dragleave={onDragLeave}
  on:drop={onDrop}>
</div>

<style lang="scss">
div {
  height: 10px;
  margin: 15px;

  &.dragover {
    background: gray;
    border-radius: 3px;
    height: 50px;
  }
}
</style>
