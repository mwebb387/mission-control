<script lang="ts">
  export let label = 'label';
  export let options: { name: string, value: string }[] = [];
  export let value = '';
</script>

<div class="form-control grow">
  <label class="label flex flex-col items-start gap-1">
    <span class="label-text">{label}</span>
    <select class="input input-bordered input-sm w-full" bind:value={value}>
      {#each options as option}
        <option value={option.value}>{option.name}</option>
      {/each}
    </select> 
  </label>
</div>
