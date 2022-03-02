import { FileSystem } from "../core/file-system";

export type EventName =
  | 'click'
  | 'close'
  | 'copy'
  | 'cut'
  | 'dbclick'
  | 'auxclick'
  | 'drag'
  | 'drop'
  | 'paste'
  | 'select'
  | 'unselect'
  | 'open';
export type EventType = {
  name: EventName;
  execute: (fileSystem: FileSystem) => void;
  debug: () => void;
  undo: () => void;
  redo: () => void;
};
