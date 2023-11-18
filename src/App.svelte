<script lang="ts">
	import type { Session, ProgramTemplate, Execution } from './models/config';
	import AppService from './services/application-service';
	import Notification from './components/Notification.svelte';
	import ProgramTab from './components/ProgramTab.svelte';
	import SessionTab from './components/SessionTab.svelte';

  import Sidebar from './components/sidebar/Sidebar.svelte';
  import SidebarContent from './components/sidebar/SidebarContent.svelte';

	export let sessions: Session[];
	export let programs: ProgramTemplate[];

	function onStartSession(event: CustomEvent<Session>) {
		AppService.startSession(event.detail, programs);
	}

	function onStartProgram(event: CustomEvent<Execution>) {
		AppService.startProgram(event.detail, programs);
	}

	function onSessionOrProgramChange() {
    AppService.saveConfiguration(sessions, programs);
	}

	function onRemoveProgram(event: CustomEvent<ProgramTemplate>) {
		sessions.forEach(session => {
			session.programs = session.programs.filter(prog => prog.id != event.detail.id);
		});

		programs = programs.filter(prog => prog.id != event.detail.id);

		AppService.saveConfiguration(sessions, programs);
	}

	async function onSave() {
    AppService.saveConfiguration(sessions, programs);
  }
</script>

<div class="app">
  <Sidebar>
    <SidebarContent name="Launcher" iconClass="nf nf-mdi-rocket" initial>
			<SessionTab
				bind:sessions={sessions}
				programs={programs}
				on:startProgram={onStartProgram}
				on:startSession={onStartSession}
				on:sessionsChanged={onSessionOrProgramChange} />
    </SidebarContent>
    <SidebarContent name="Programs" iconClass="nf nf-oct-terminal">
			<ProgramTab
				bind:programs={programs}
				on:removeProgram={onRemoveProgram}
				on:programsChanged={onSessionOrProgramChange} />
    </SidebarContent>
  </Sidebar>

	<button title="Save" class="btn btn-sm fixed left-2 bottom-2 w-8 h-6" on:click={onSave}><i class="nf nf-fa-save"></i></button>
</div>

<Notification></Notification>

<style>
.app {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
</style>
