import type { Config, Execution, ProgramTemplate, Session } from './../models/config';
import type { FileSystemEntry } from './../models/file-system';
import { ArgumentType } from '../models/config';
import SessionService from './session-service';
import { notify } from './notification-service';

export function getDirectoryListing(directoryName?: string): Promise<FileSystemEntry[]> {
  if (!directoryName) {
    return Promise.resolve([
      { name: 'Home', path: 'C:/Users/mwebb', is_directory: true, extension: '' },
      { name: 'Documents', path: 'C:/Users/mwebb/Documents', is_directory: true, extension: '' },
      { name: 'Desktop', path: 'C:/Users/mwebb/Desktop', is_directory: true, extension: '' },
    ]);
  }

  return Promise.resolve([
    { name: '../', path: 'C:/Users', is_directory: true, extension: '' },
    { name: 'Test Directory', path: 'C:/Users/mwebb/testDirectory', is_directory: true, extension: '' },
    { name: 'Test Javascript', path: 'C:/Users/mwebb/test.js', is_directory: false, extension: 'js' },
    { name: 'Test Word Doc', path: 'C:/Users/mwebb/test.doc', is_directory: false, extension: 'doc' },
  ]);
}

export function loadConfiguration(): Promise<Config> {
  return new Promise<Config>(resolve => {
    console.log('load config');
    resolve({
      sessions: [
        {
          id: '_ppb66hu3p',
          name: 'Chrome Session',
          tags: ['browser', 'google'],
          programs: [
            {
              id: '_6pbp6hu3p',
              name: '',
              arguments: [
                { id: '_nklkha3s5', value: true },
                { id: '_i260m7w8c', value: false },
                { id: '_simrhk95a', value: 'www.google.com\nwww.duckduckgo.com' }
              ],
              runAsAdmin: false,
              manualOnly: false
            },
            {
              id: '_cbxenj23l',
              name: '',
              arguments: [
                {
                  id: '_b3ecjujs6',
                  value: 'project'
                }
              ],
              runAsAdmin: false,
              manualOnly: false
            }
          ]
        },
        {
          id: '_ln89uirzy',
          name: 'Session Runner',
          tags: ['utility', 'javascript', 'svelte'],
          programs: [
            {
              id: '_cbxenj23l',
              name: '',
              arguments: [
                {
                  id: '_b3ecjujs6',
                  value: 'session-runner.code-workspace'
                }
              ],
              runAsAdmin: false,
              manualOnly: false
            }
          ]
        }
      ],
      programs: [
        {
          id: '_6pbp6hu3p',
          name: 'Chrome',
          path: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
          icon: 'fab fa-chrome',
          arguments: [
            { id: '_nklkha3s5', name: 'New Window', type: ArgumentType.option, value: '--new-window' },
            { id: '_i260m7w8c', name: 'Incognito', type: ArgumentType.option, value: '--incognito' },
            { id: '_simrhk95a', name: 'URL(s)', type: ArgumentType.input, value: '' }
          ],
        },
        {
          id: '_4xyXpts83',
          name: 'Visual Studio',
          path: 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Professional\\Common7\\IDE\\devenv.exe"',
          icon: 'fab fa-windows',
          arguments: [
            {
              id: '_n3ox4p0tm',
              name: 'Project or Solution',
              type: ArgumentType.input,
              value: ''
            }
          ]
        },
        {
          id: '_cbxenj23l',
          name: 'Visual Studio Code',
          path: '\'C:\\Users\\mwebb\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe\'',
          icon: 'fab fa-windows',
          arguments: [
            {
              id: '_b3ecjujs6',
              name: 'Folder or File',
              type: ArgumentType.input,
              value: ''
            }
          ]
        },
        {
          id: '_3xyppts9o',
          name: 'Git Kraken',
          path: 'C:\\Users\\mwebb\\AppData\\Local\\gitkraken\\app-6.1.4\\gitkraken.exe',
          icon: 'fab fa-gitkraken',
          arguments: [
            {
              id: '_jmo54p0sm',
              name: 'Folder Name',
              type: ArgumentType.input,
              value: ''
            }
          ]
        }
      ]
    });
  })
}

export function saveConfiguration(sessions: Session[], programs: ProgramTemplate[]) {
  const config: Config = { sessions, programs };
  console.log('save config', config);
  notify('Settings Saved');
}

export function startProgram(program: Execution, programs: ProgramTemplate[]) {
  const command = SessionService.getProgramSessionCommandParts(program, programs)
  console.log('start session', [command]);
}

export function startSession(session: Session, programs: ProgramTemplate[]) {
  const commands = session.programs
    .filter(sessionProg => !sessionProg.manualOnly)
    .map(sessionProg => SessionService.getProgramSessionCommandParts(sessionProg, programs))
  console.log('start session', commands);
}

export default {
  getDirectoryListing,
  loadConfiguration,
  saveConfiguration,
  startProgram,
  startSession
}
