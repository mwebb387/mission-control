import { writable, type Writable } from 'svelte/store';

// Notification store
const notifications$: Writable<string[]> = writable([]);

export default notifications$;
