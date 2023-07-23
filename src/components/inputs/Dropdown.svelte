<script lang="ts">
  export let label = 'label';
  export let options: { name: string, value: string }[] = [];
  export let value = '';
</script>

<div class="input-container grow">
  <label>{label}</label>
  <select class="input input--select" bind:value={value}>
    {#each options as option}
      <option value={option.value}>{option.name}</option>
    {/each}
  </select> 
</div>
