import { invoke } from '@tauri-apps/api';
import { type Config, type Execution, type Session, type ProgramTemplate, ArgumentType } from '../models/config';
import type { FileSystemEntry } from '../models/file-system';
import { notify } from './notification-service';
import SessionService from './session-service';

const CONFIG_DEFAULT: Config = {sessions:[], programs:[]};

export function getDirectoryListing(directoryName?: string): Promise<FileSystemEntry[]> {
  return invoke('get_dir_entries', { path: directoryName ?? 'C:\\repos' });
}

export async function loadConfiguration(): Promise<Config> {
  const configStr = await invoke('load_config') as string;
  return configStr ? JSON.parse(configStr) : CONFIG_DEFAULT;
}
// export function loadConfiguration(): Promise<Config> {
//   return new Promise<Config>(resolve => {
//     console.log('load config');
//     resolve({
//       sessions: [
//         {
//           id: '_ppb66hu3p',
//           name: 'Chrome Session',
//           tags: ['browser', 'google'],
//           programs: [
//             {
//               id: '_6pbp6hu3p',
//               name: '',
//               arguments: [
//                 { id: '_nklkha3s5', value: true },
//                 { id: '_i260m7w8c', value: false },
//                 { id: '_simrhk95a', value: 'www.google.com\nwww.duckduckgo.com' }
//               ],
//               runAsAdmin: false,
//               manualOnly: false
//             },
//             {
//               id: '_cbxenj23l',
//               name: '',
//               arguments: [
//                 {
//                   id: '_b3ecjujs6',
//                   value: 'project'
//                 }
//               ],
//               runAsAdmin: false,
//               manualOnly: false
//             }
//           ]
//         },
//         {
//           id: '_ln89uirzy',
//           name: 'Session Runner',
//           tags: ['utility', 'javascript', 'svelte'],
//           programs: [
//             {
//               id: '_cbxenj23l',
//               name: '',
//               arguments: [
//                 {
//                   id: '_b3ecjujs6',
//                   value: 'session-runner.code-workspace'
//                 }
//               ],
//               runAsAdmin: false,
//               manualOnly: false
//             }
//           ]
//         }
//       ],
//       programs: [
//         {
//           id: '_6pbp6hu3p',
//           name: 'Chrome',
//           path: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
//           icon: 'fab fa-chrome',
//           arguments: [
//             { id: '_nklkha3s5', name: 'New Window', type: ArgumentType.option, value: '--new-window' },
//             { id: '_i260m7w8c', name: 'Incognito', type: ArgumentType.option, value: '--incognito' },
//             { id: '_simrhk95a', name: 'URL(s)', type: ArgumentType.input, value: '' }
//           ],
//         },
//         {
//           id: '_4xyXpts83',
//           name: 'Visual Studio',
//           path: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Professional\\Common7\\IDE\\devenv.exe"',
//           icon: 'fab fa-windows',
//           arguments: [
//             {
//               id: '_n3ox4p0tm',
//               name: 'Project or Solution',
//               type: ArgumentType.input,
//               value: ''
//             }
//           ]
//         },
//         {
//           id: '_cbxenj23l',
//           name: 'Visual Studio Code',
//           path: '\'C:\\Users\\mwebb\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe\'',
//           icon: 'fab fa-windows',
//           arguments: [
//             {
//               id: '_b3ecjujs6',
//               name: 'Folder or File',
//               type: ArgumentType.input,
//               value: ''
//             }
//           ]
//         },
//         {
//           id: '_3xyppts9o',
//           name: 'Git Kraken',
//           path: 'C:\\Users\\mwebb\\AppData\\Local\\gitkraken\\app-6.1.4\\gitkraken.exe',
//           icon: 'fab fa-gitkraken',
//           arguments: [
//             {
//               id: '_jmo54p0sm',
//               name: 'Folder Name',
//               type: ArgumentType.input,
//               value: ''
//             }
//           ]
//         }
//       ]
//     });
//   })
// }

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
