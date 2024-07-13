<script lang="ts">
  export let currentPage: number = 0;
  export let maxPerPage: number = 50;
  export let total: number = 0;

  $: numPages = Math.ceil(total / maxPerPage);
  $: if (currentPage > Math.max(0, numPages - 1)) {
    currentPage = numPages - 1;
  }

  function* pages(cur: number) {
    const start = Math.floor(cur / 5) * 5;
    const end = Math.min(start + 5, numPages - 1);
    for (let i = start; i < end; i++) {
      yield i;
    }
  }

  function setCurrentPage(n: number) {
    currentPage = Math.max(0, Math.min(n, numPages - 1));
  }

  function pageDec() {
    setCurrentPage(currentPage - 1);
  }

  function pageInc() {
    setCurrentPage(currentPage + 1);
  }

  function groupDec() {
    setCurrentPage(
      Math.max(
        Math.floor(currentPage / 5) * 5 - 1,
        0))
  }

  function groupInc() {
    setCurrentPage(
      Math.min(
        (Math.floor(currentPage / 5) + 1) * 5,
        numPages))
  }
</script>

<div class="join">
  {#if numPages >= 2}
  <button type="button" class="join-item btn" on:click="{pageDec}">
    <i class="nf nf-fa-caret_left"></i>
  </button>

  {#if currentPage >= 5}
  <button type="button" class="join-item btn" on:click="{groupDec}">
    ...
  </button>
  {/if}

  {#each [...pages(currentPage)] as page}
    <button
      type="button"
      class="join-item btn"
      class:btn-active={currentPage === page}
      on:click="{() => setCurrentPage(page)}">
      <span>{page + 1}</span>
    </button>
  {/each}

  {#if currentPage < numPages % 5 * 5}
  <button type="button" class="join-item btn" on:click="{groupInc}">
    ...
  </button>
  {/if}

  <button type="button" class="join-item btn" on:click="{pageInc}">
    <i class="nf nf-fa-caret_right"></i>
  </button>
  {/if}
</div>
