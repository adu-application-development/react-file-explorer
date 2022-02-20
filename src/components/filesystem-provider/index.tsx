import React, { createContext, useContext, useEffect, useState } from 'react';
import { Entry } from '../..';
import Event, {
  CreateState,
  DeleteState,
  DragState,
  DropState,
  RenameState,
  SelectState,
} from './event.interface';

interface IContext {
  event: Event;
  state: [Entry[], React.Dispatch<React.SetStateAction<Entry[]>>];
}
const Context = createContext<IContext>(undefined!);

export interface Props {
  entries: Entry[];

  // callback for event
  onCreate?: (to: Entry) => void;
  onMove?: (to: Entry, from: Entry) => void;

  onSelect?: (to: Entry) => void;

  onRename?: (to: Entry, from: Entry) => void;
  onDelete?: (to: Entry) => void;

  children: JSX.Element;
}

export function FileSystemProvider(props: Props) {
  const { event } = useEventManagement(props);
  const [entries, setEntries] = useState<Entry[]>(props.entries);

  return (
    <Context.Provider
      value={{
        event,
        state: [entries, setEntries],
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

/**
 *
 * for event management
 *
 */
function useEventManagement(props: Props): { event: Event } {
  const [dragState, setDragState] = useState<DragState>();
  const [dropState, setDropState] = useState<DropState>();
  const [selectState, setSelectState] = useState<SelectState>();
  const [renameState, setRenameState] = useState<RenameState>();
  const [deleteState, setDeleteState] = useState<DeleteState>();
  const [createState, setCreateState] = useState<CreateState>();

  // for event callback
  useEffect(() => {}, [dragState]);
  useEffect(() => {
    if (!dropState || !props.onMove) return;

    props.onMove(dropState.to, dropState.from);
  }, [dropState]);
  useEffect(() => {
    if (!selectState || !props.onSelect) return;

    props.onSelect(selectState.to);
  }, [selectState]);
  useEffect(() => {}, [renameState]);
  useEffect(() => {}, [deleteState]);
  useEffect(() => {}, [createState]);

  return {
    event: {
      drag: [dragState, setDragState],
      drop: [dropState, setDropState],
      select: [selectState, setSelectState],
      rename: [renameState, setRenameState],
      delete: [deleteState, setDeleteState],
      create: [createState, setCreateState],
    },
  };
}

export const useDrag = () => useContext(Context).event.drag;
export const useDrop = () => useContext(Context).event.drop;
export const useSelect = () => useContext(Context).event.select;
export const useRename = () => useContext(Context).event.rename;
export const useDelete = () => useContext(Context).event.delete;
export const useCreate = () => useContext(Context).event.create;

/**
 *
 * for filesystem state in entry
 *
 */
export const useEntryState = () => useContext(Context).state;
export function findEntry(path: string): Entry {
  const [entries, _setEntries] = useEntryState();

  for (const entry of entries) {
    if (entry.path !== path) continue;

    return entry;
  }

  throw new Error('There is no entry, that path is' + path);
}

export function getSubEntries(path: string): Entry[] {
  const [entries, _setEntries] = useEntryState();
  let foundEntries: Entry[] = [];

  for (const entry of entries) {
    if (!entry.path.startsWith(path)) continue;

    const l1 = entry.path.split('\\').length - 1;
    const l2 = path.split('\\').length;

    if (l1 === l2) foundEntries.push(entry);
  }

  return foundEntries;
}

export function getHeadEntry(): Entry {
  const [entries, _setEntries] = useEntryState();
  let foundEntry = entries[0];
  entries.forEach((entry) => {
    if (entry.path.length > foundEntry.path.length) return;

    foundEntry = entry;
  });

  return foundEntry;
}
