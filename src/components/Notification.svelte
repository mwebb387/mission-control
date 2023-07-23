<script lang="ts">
  import notifications$ from '../stores/notification-store';
  import { fade } from 'svelte/transition';
</script>

{#if $notifications$.length}
  <div class="notification-container">
    {#each $notifications$ as notification}
      <div class="notification" in:fade out:fade>
        <i class="nf nf-fa-info-circle"></i>
        <p>{notification}</p>
      </div>
    {/each}
  </div>
{/if}
