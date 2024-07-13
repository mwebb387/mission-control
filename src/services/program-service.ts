// Program service methods

import type { ArgumentType, ArgumentTemplate, ProgramTemplate } from '../models/config'
import util from '../util'

export function createArgument(type: ArgumentType): ArgumentTemplate {
  return {
    id: util.createUUID(),
    name: '',
    type,
    value: '',
  }
}

export function createProgram(name: string): ProgramTemplate {
  return {
    id: util.createUUID(),
    name,
    icon: '',
    path: '',
    arguments: [],
  }
}

export default {
  createArgument,
  createProgram,
}