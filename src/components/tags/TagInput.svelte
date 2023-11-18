<script lang="ts">
  import tagStore$ from '../../stores/tag-store';
  import { createGuid } from '../../util';
  import Tag from './Tag.svelte';
  import TextInput from '../inputs/TextInput.svelte';

  export let tags: string[] = [];

  let newTagsInput: string = '';
  let dataListId = `data-list-${createGuid()}`;

  // Create derived store for the datalist
  $: uniqTags = $tagStore$.filter(tag => !tags.includes(tag));
  $: newTagList = newTagsInput.split(' ').map(t => t.trim().toLowerCase());

  // Events
  const onKeydown = (event: KeyboardEvent) => {
    if (newTagsInput && event.code === 'Enter') {
      addNewTags();
      event.cancelBubble = true;
      event.preventDefault();
    }
  }

  function onAddTagsClick() {
    addNewTags();
  }

  function onTagClick(event) {
    removeSessionTag(event.target.innerText);
  }

  // Helpers
  function addNewTags() {
    addSessionTags(newTagList);
    addStoreTags(newTagList);

    console.log(uniqTags);

    newTagsInput = '';
  }

  function addSessionTags(newTags: string[]) {
    const newUniqTags = new Set([...tags, ...newTags]);
    tags = [...newUniqTags];
  }

  function addStoreTags(newTags: string[]) {
    tagStore$.addTags(newTags);
  }

  function removeSessionTag(tag: string) {
    tags = tags.filter(t => t !== tag.trim())
  }
</script>

<div class="flex items-end">
  <TextInput label="Tags" list={dataListId} description="Add Tags" on:keydown={onKeydown} bind:value={newTagsInput} />
  <datalist id={dataListId}>
    {#each uniqTags as storeTag}
      <option value={storeTag}>
    {/each}
  </datalist>
  <button class="btn btn-square btn-sm mb-2" disabled="{!newTagsInput}" on:click={onAddTagsClick}>
    <i class="nf nf-fa-plus"></i>
  </button>
</div>

<div class="flex gap-4 px-6">
  {#each tags as tag}
    <Tag on:click={onTagClick} >{tag}</Tag>
  {/each}
</div>
