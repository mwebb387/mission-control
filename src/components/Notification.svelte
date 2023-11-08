<script lang="ts">
  import notifications$ from '../stores/notification-store';
  import { fade } from 'svelte/transition';
</script>

{#if $notifications$.length}
  <div class="toast toast-top toast-end">
    {#each $notifications$ as notification}
      <div class="alert alert-success" in:fade out:fade>
        <i class="nf nf-fa-info_circle"></i>
        <p>{notification}</p>
      </div>
    {/each}
  </div>
{/if}
