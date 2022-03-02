import { EntryType } from "../core/entry-type";
import { FileSystem } from "../core/file-system";
import { EventName, EventType } from "./event-type";

export class DropEvent implements EventType {
  name: EventName = 'drop';

  constructor(
    private fileSystem: FileSystem,
    private to: EntryType,
    private from: EntryType,
  ) {
  }

  execute() {
  }

  debug() {
    console.log(name, "event is fired!");
  }

  undo() {
  }

  redo() {
    this.execute();
  }
}