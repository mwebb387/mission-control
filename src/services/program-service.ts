// Program service methods

import type { ArgumentType, ArgumentTemplate, ProgramTemplate } from '../models/config'
import util from '../util'

export function createArgument(type: ArgumentType): ArgumentTemplate {
  return {
    id: util.createID(),
    name: '',
    type,
    value: '',
  }
}

export function createProgram(name: string): ProgramTemplate {
  return {
    id: util.createID(),
    name,
    icon: '',
    path: '',
    arguments: [],
  }
}

export function getProgramDescription(program: ProgramTemplate): string {
  const args = program.arguments
    .map(arg => `<${arg.name}>`)

  return [ program.name, ...args].join(' ')
}

export default {
  createArgument,
  createProgram,
  getProgramDescription
}