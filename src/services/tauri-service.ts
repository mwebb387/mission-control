import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/dialog';
import { type Config, type Execution, type Session, type ProgramTemplate, ArgumentType } from '../models/config';
import type { FileSystemEntry } from '../models/file-system';
import { notify } from './notification-service';
import SessionService from './session-service';
import { resolve } from '@tauri-apps/api/path';

const CONFIG_DEFAULT: Config = {sessions:[], programs:[]};

export async function selectDirOrFile(initialDirectory?: string, directory: boolean = false): Promise<null | string> {
  const selected = await open({
    directory,
    multiple: false,
    defaultPath: initialDirectory ?? ''
  });

  return Array.isArray(selected) && selected.length
    ? selected[0]
    : <null | string>selected;
}

export async function loadConfiguration(): Promise<Config> {
  const configStr = await invoke<string>('load_config');
  return configStr ? JSON.parse(configStr) : CONFIG_DEFAULT;
}

export async function saveConfiguration(sessions: Session[], programs: ProgramTemplate[]) {
  const config: Config = { sessions, programs };
  const success = await invoke('save_config', { config: JSON.stringify(config) });
  notify(success ? 'Settings Saved' : 'Failed to save settings');
}

export async function startProgram(program: Execution, programs: ProgramTemplate[]) {
  const command = SessionService.getProgramSessionCommandParts(program, programs)

  // Resolve aliases
  command.path = await resolveAliases(command.path);

  const errors: string[] = await invoke('start_session', { commands: [command] });
  errors.forEach(e => notify(e));
}

export async function startSession(session: Session, programs: ProgramTemplate[]) {
  const commands = session.programs
    .filter(sessionProg => !sessionProg.manualOnly)
    .map(sessionProg => SessionService.getProgramSessionCommandParts(sessionProg, programs));
  
  // Resolve aliases
  for (let cmd of commands) {
    cmd.path = await resolveAliases(cmd.path)
  }

  const errors: string[] = await invoke('start_session', { commands });
  errors.forEach(e => notify(e));
}

async function resolveAliases(programPath: string) {
  let resolved = programPath;
  for (let match of programPath.match(/\{[a-zA-Z0-9]+\}/g) ?? []) {
    // TODO: Error reporting for when alias cannot be resolved
    const resAlias = await invoke<string>('resolve_alias', { alias: match.substring(1, match.length - 1)});
    resolved = resolved.replace(match, resAlias);
  }

  return resolved;
}

export default {
  selectDirOrFile,
  loadConfiguration,
  saveConfiguration,
  startProgram,
  startSession
}
