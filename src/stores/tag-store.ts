import { writable } from "svelte/store";

const { subscribe, set, update } = writable([]);

const uniqueAndSorted = (list: any[]) => [...new Set(list)].sort();

const addTags = (newTags: string | string[]) => update(tags => {
  if (!Array.isArray(newTags)) {
    newTags = [newTags];
  }

  return uniqueAndSorted([...newTags, ...tags])
});

const updateTags = (tags: string[]) => set(uniqueAndSorted(tags));

export default {
  addTags,
  subscribe,
  updateTags
};
