export interface Config {
  sessions: Session[],
  programs: ProgramTemplate[],
}

export interface Session {
  id: string,
  name: string,
  tags: string[]
  programs: Execution[]
}

export interface Execution {
  id: string,
  name: string,
  arguments: Argument[],
  runAsAdmin: boolean,
  manualOnly: boolean,
}

export interface ExecutionCommand {
  path: string,
  args: string[],
  runAsAdmin: boolean,
}

export interface Argument {
  id: string,
  value: any,
}

export interface ProgramTemplate {
  id: string,
  name: string,
  path: string,
  icon: string,
  arguments: ArgumentTemplate[],
}

export interface ArgumentTemplate {
 id: string,
 name: string,
 type: ArgumentType,
 value: string,
}

export enum ArgumentType {
  input = 'input',
  option = 'option',
}
