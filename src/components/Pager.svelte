<script lang="ts">
  export let currentPage: number = 0;
  export let maxPerPage: number = 50;
  export let total: number = 0;

  $: numPages = Math.ceil(total / maxPerPage);
  $: if (currentPage > Math.max(0, numPages - 1)) {
    currentPage = numPages - 1;
  }

  function* pages(n) {
    for (let i = 0; i < n; i++) {
      yield i;
    }
  }

  function setCurrentPage(n) {
    currentPage = Math.max(0, Math.min(n, numPages - 1));
  }

  function pageDec() {
    setCurrentPage(currentPage - 1);
  }

  function pageInc() {
    setCurrentPage(currentPage + 1);
  }
</script>

<div class="pager">
  {#if numPages >= 2}
  <button type="button" class="button icon-button accent-button" on:click="{pageDec}">
    <i class="nf nf-fa-caret_left"></i>
  </button>

  {#each [...pages(numPages)] as page}
    <button
      type="button"
      class="button icon-button accent-button"
      class:selected={currentPage === page}
      on:click="{() => setCurrentPage(page)}">
      <span>{page + 1}</span>
    </button>
  {/each}

  <button type="button" class="button icon-button accent-button" on:click="{pageInc}">
    <i class="nf nf-fa-caret_right"></i>
  </button>
  {/if}
</div>
