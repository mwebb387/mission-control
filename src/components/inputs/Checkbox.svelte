<script lang="ts">
  export let label = 'label';
  export let checked = false;
  export let title: string | null = null;
</script>

<div class="form-control">
  <label class="label cursor-pointer flex items-center gap-1">
    <span class="label-text">{label}</span> 
    <input type="checkbox" bind:checked={checked} {title} class="checkbox" />
  </label>
</div>