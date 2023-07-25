import { invoke } from '@tauri-apps/api';
import { type Config, type Execution, type Session, type ProgramTemplate, ArgumentType } from '../models/config';
import type { FileSystemEntry } from '../models/file-system';
import { notify } from './notification-service';
import SessionService from './session-service';

const CONFIG_DEFAULT: Config = {sessions:[], programs:[]};

export function getDirectoryListing(directoryName?: string): Promise<FileSystemEntry[]> {
  return invoke('get_dir_entries', { path: directoryName ?? '' });
}

export async function loadConfiguration(): Promise<Config> {
  const configStr = await invoke('load_config') as string;
  return configStr ? JSON.parse(configStr) : CONFIG_DEFAULT;
}

export async function saveConfiguration(sessions: Session[], programs: ProgramTemplate[]) {
  const config: Config = { sessions, programs };
  const success = await invoke('save_config', { config: JSON.stringify(config) });
  notify(success ? 'Settings Saved' : 'Failed to save settings');
}

export async function startProgram(program: Execution, programs: ProgramTemplate[]) {
  const command = SessionService.getProgramSessionCommandParts(program, programs)
  invoke('start_session', { commands: [command] });
}

export async function startSession(session: Session, programs: ProgramTemplate[]) {
  const commands = session.programs
    .filter(sessionProg => !sessionProg.manualOnly)
    .map(sessionProg => SessionService.getProgramSessionCommandParts(sessionProg, programs))
  invoke('start_session', { commands });
}

export default {
  getDirectoryListing,
  loadConfiguration,
  saveConfiguration,
  startProgram,
  startSession
}
