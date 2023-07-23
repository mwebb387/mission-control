<script lang="ts">
  import { onMount } from 'svelte';
  import Modal from './Modal.svelte';
  import type { FileSystemEntry } from '../../models/file-system';
  import type { ModalResponse } from '../../models/modal-types';
  import AppService from '../../services/application-service';
  import FileTypeService from '../../services/file-type-service';

  export function awaitResponse(): Promise<ModalResponse<string>> {
    return modal.awaitRespose();
  }

  let listing: FileSystemEntry[];
  let modal: Modal;

  onMount(async () => {
    await navigate();
  });

  async function navigate(directory?: FileSystemEntry) {
    const path = directory?.path;
    const results = await AppService.getDirectoryListing(path);
    listing = [
      // Parent directory as first entry
      {
        name: '..',
        path: `${path}\\..`,
        is_directory: true,
        extension: ''
      },
      // Sort results by name
      ...results.sort(sortEntry)
    ];
  }

  function sortEntry(entry1: FileSystemEntry, entry2: FileSystemEntry) {
    return entry1.is_directory === entry2.is_directory ? sortEntryName(entry1.name, entry2.name)
      : entry1.is_directory ? -1
      : 1;
  }

  function sortEntryName(name1: string, name2: string) {
    return name1 > name2 ? 1
      : name2 > name1 ? -1
      : 0;
  }

</script>

<Modal let:ok bind:this={modal}>
  <div class="file-finder">
    <ul>
      {#each listing as entry}
        <li>
          <div>
            <span>
              <i class={FileTypeService.getFileIconClass(entry)}></i>
              {entry.name}
            </span>
            <span>
              {#if entry.is_directory}
                <button type="button" class="button icon-button accent-button" on:click={() => navigate(entry)}>
                  <i class="fas fa-folder"></i>
                </button>
              {/if}
              <button type="button" class="button icon-button accent-button" on:click={() => ok(entry.path)}>
                <i class="nf nf-fa-check"></i>
              </button>
            </span>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</Modal>