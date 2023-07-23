import type { Config, ExecutionCommand } from './config';
import type { FileSystemEntry } from './file-system';

interface Eel {
  get_directory_listing: (dir?: string) => () => Promise<FileSystemEntry[]>,
  load_config: () => () => Promise<Config>,
  save_config: (config: Config) => void,
  start_session: (commands: ExecutionCommand[]) => void
}

export interface EelWindow extends Window {
  eel: Eel,
}
