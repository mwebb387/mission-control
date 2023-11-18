<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { arrayMove } from '../util';
  import ConfirmationModal from './modals/ConfirmationModal.svelte';
  import Dropzone from './Dropzone.svelte';
  import SessionComponent from './Session.svelte';
  import SessionEditor from './SessionEditor.svelte';
  import AddFromInput from './AddFromInput.svelte';
  import TagInput from './tags/TagInput.svelte';
  import TextInput from './inputs/TextInput.svelte'

  import SessionService from '../services/session-service';
  import type { Session, ProgramTemplate } from '../models/config';

  export let sessions: Session[] = [];
  export let programs: ProgramTemplate[] = [];

  let modal: ConfirmationModal;
  let newSessionEdit = false;
  let editingSessions: string[] = [];
  let textFilter = '';
  let tagsFilter: string[] = [];

  $: filteredSessions = sessions
    .filter(s => s.name.toLowerCase().includes(textFilter.toLowerCase()))
    .filter(s => !tagsFilter.length || s.tags.some(t => tagsFilter.includes(t)));

  $: isFilterActive = textFilter.length || tagsFilter.length;

  const dispatch = createEventDispatcher();

  const onDropped = (event: CustomEvent<Session>, index: number) => {
    const droppedSession = event.detail;
    const oldIndex = sessions.findIndex(s => s.id === droppedSession.id);
    const newIndex = index > oldIndex ? index - 1 : index;

    let reordered = arrayMove([...sessions], oldIndex, newIndex);

    sessions = reordered;
  }

	const onKeydown = (event: KeyboardEvent) => {
		console.log(event)
		if (event.key === 'n' && event.ctrlKey) {
			newSessionEdit = true;
			event.preventDefault();
		}
	}

  const onEditSession = (event: CustomEvent<Session>) => {
    editingSessions = [...editingSessions, event.detail.id];
  }

  const onNewSession = (event: CustomEvent<string>) => {
    sessions = [...sessions, SessionService.createSession(event.detail)];
    dispatch('sessionsChanged');
  }

  const onRemoveSession = async (event: CustomEvent<Session>) => {
    const { data } = await modal.awaitResponse();
    if (data) {
      sessions = sessions.filter(session => session.id !== event.detail.id);
      dispatch('sessionsChanged');
    }
  }

  const onSaveSession = (event: CustomEvent<Session>) => {
    editingSessions = editingSessions.filter(id => id !== event.detail.id);
    const idx = sessions.findIndex(session => session.id === event.detail.id);
    sessions[idx] = event.detail;
    sessions = sessions;
  }

  const onShiftPrevious = (event: CustomEvent<Session>) => {
    const newSessions = [...sessions]
    const idx = newSessions.findIndex(session => session.id === event.detail.id);
    const prev = newSessions[idx - 1];
    newSessions[idx - 1] = event.detail;
    newSessions[idx] = prev;
    sessions = newSessions;
  }

  const onShiftNext = (event: CustomEvent<Session>) => {
    const newSessions = [...sessions]
    const idx = newSessions.findIndex(session => session.id === event.detail.id);
    const next = newSessions[idx + 1];
    newSessions[idx + 1] = event.detail;
    newSessions[idx] = next;
    sessions = newSessions;
  }
</script>

<svelte:window on:keydown={onKeydown} />

<div class="flex flex-col">
  <div class="collapse collapse-arrow bg-base-200">
    <input type="checkbox" /> 
    <div class="collapse-title text-xl font-medium">
      Filters
    </div>
    <div class="collapse-content"> 
      <TextInput label="Filter by name" description="Name..." bind:value={textFilter} />
      <TagInput bind:tags={tagsFilter} />
    </div>
  </div>

  {#each filteredSessions as session, i (session.id)}
    {#if !isFilterActive}
      <Dropzone on:dropped={ev => onDropped(ev, i)}></Dropzone>
    {/if}

    {#if !editingSessions.includes(session.id)}
      <SessionComponent
        programs={programs}
        value={session}
        allowReorderPrevious={i > 0}
        allowReorderNext={i < sessions.length - 1}
        on:editSession={onEditSession}
        on:shiftNext={onShiftNext}
        on:shiftPrevious={onShiftPrevious}
        on:startProgram
        on:startSession />
    {:else}
      <SessionEditor
        programs={programs}
        bind:value={session}
        on:saveSession={onSaveSession}
        on:removeSession={onRemoveSession} />
    {/if}
  {/each}

  {#if !isFilterActive}
    <Dropzone on:dropped={ev => onDropped(ev, sessions.length)}></Dropzone>
  {/if}

  <AddFromInput label="New Session Name" bind:edit={newSessionEdit} on:newValue={onNewSession} />
</div>

<ConfirmationModal bind:this={modal}>
  <p>Are you sure you want to remove the session?</p>
</ConfirmationModal>
