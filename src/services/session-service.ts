import { ArgumentType,  } from '../models/config';
import type { Session, Execution, ProgramTemplate, ExecutionCommand } from '../models/config';
// import * as ArgumentTypes from '../constants/argument-types';
import Util from '../util';

// {
//   name: 'Chrome Session',
//   programs: [
//     {
//       id: '_6pbp6hu3p',
//       arguments: [
//         { id: '_nklkha3s5', value: true },
//         { id: '_i260m7w8c', value: false },
//         { id: '_simrhk95a', value: 'www.google.com' }
//       ]
//     }
//   ]
// }

// {
//   id: '_6pbp6hu3p',
//   name: 'Chrome',
//   path: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
//   arguments: [
//     { id: '_nklkha3s5', name: 'New Window', type: 'option', value: '--new-window' },
//     { id: '_i260m7w8c', name: 'Incognito', type: 'option', value: '--incognito' },
//     { id: '_simrhk95a', name: 'URL(s)', type: 'input', value: '' }
//   ],
// }

function getDefaultArgumentValue(argType: ArgumentType): string | boolean {
  return argType === ArgumentType.option ? false : '';
}

export function createSession(name: string): Session {
  return { id: Util.createID(), name, tags: [], programs: [] };
}

export function createSessionProgram(programID: string, programs: ProgramTemplate[]): Execution {
  // TODO: Error checking...
  const program = programs.find(prog => prog.id === programID);
  const args = program.arguments.map(arg => ({
    id: arg.id,
    value: getDefaultArgumentValue(arg.type)
  }))

  return { id: programID, name: '', arguments: args, runAsAdmin: false, manualOnly: false };
}

export function getProgramSessionCommandParts(
  execution: Execution,
  programs: ProgramTemplate[],
  fullPath = true
): ExecutionCommand {
  // TODO: Error checking...
  const program = programs.find(prog => prog.id === execution.id);

  const path = fullPath ? program.path : program.name;
  const args = execution.arguments
    .filter(arg => !!arg.value)
    .map(arg => {
      const progArg = program.arguments.find(a => a.id == arg.id);
      return progArg.type == ArgumentType.option
        ? progArg.value.trim()
        : (arg.value as string).split('\n').map(val => val.trim())
    })
    .flat();

  const runAsAdmin = execution.runAsAdmin;

  return { path, args, runAsAdmin }
}

// export function getProgramSessionCommand(sessionProgram, programs, fullPath = true) {
//   return getProgramSessionCommandParts(sessionProgram, programs, fullPath).join(' ');
// }

export default {
  createSession,
  createSessionProgram,
  // getProgramSessionCommand,
  getProgramSessionCommandParts
}
