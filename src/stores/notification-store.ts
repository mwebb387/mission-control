import { writable } from 'svelte/store';

// Notification store
const notifications$ = writable([]);

export default notifications$;
