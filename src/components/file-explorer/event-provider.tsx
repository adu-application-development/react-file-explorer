import React, { createContext, useContext, useEffect, useState } from 'react';
import Entry from './interfaces/entry';
import Event, { DragState, DropState, SelectState } from './interfaces/event';

interface IContext {
  entries: Entry[];
  event: Event;
}
const Context = createContext<IContext>(undefined!);

export interface Props {
  onNew?: (to: Entry) => void;
  onMove?: (to: Entry, from: Entry) => void;

  onSelect?: (to: Entry) => void;
  onOpen?: (to: Entry) => void;

  onRename?: (to: Entry, from: Entry) => void;
  onDelete?: (to: Entry) => void;

  children: JSX.Element;
}

export default function EventProvider(props: Props) {
  const [dragState, setDragState] = useState<DragState>();
  const [dropState, setDropState] = useState<DropState>();
  const [selectState, setSelectState] = useState<SelectState>();

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

  return (
    <Context.Provider
      value={{
        event: {
          drag: [dragState, setDragState],
          drop: [dropState, setDropState],
          select: [selectState, setSelectState],
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
