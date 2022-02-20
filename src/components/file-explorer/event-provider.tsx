import React, { createContext, useContext, useEffect, useState } from 'react';
import Entry from './interfaces/entry';
import Event, {
  CreateState,
  DeleteState,
  DragState,
  DropState,
  RenameState,
  SelectState,
} from './interfaces/event';

interface IContext {
  entries: Entry[];
  event: Event;
}
const Context = createContext<IContext>(undefined!);

export interface Props {
  onCreate?: (to: Entry) => void;
  onMove?: (to: Entry, from: Entry) => void;

  onSelect?: (to: Entry) => void;

  onRename?: (to: Entry, from: Entry) => void;
  onDelete?: (to: Entry) => void;

  children: JSX.Element;
}

export default function EventProvider(props: Props) {
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

  return (
    <Context.Provider
      value={{
        event: {
          drag: [dragState, setDragState],
          drop: [dropState, setDropState],
          select: [selectState, setSelectState],
          rename: [renameState, setRenameState],
          delete: [deleteState, setDeleteState],
          create: [createState, setCreateState],
        },
        entries: [],
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export const useDrag = () => useContext(Context).event.drag;
export const useDrop = () => useContext(Context).event.drop;
export const useSelect = () => useContext(Context).event.select;
export const useRename = () => useContext(Context).event.rename;
export const useDelete = () => useContext(Context).event.delete;
export const useCreate = () => useContext(Context).event.create;
