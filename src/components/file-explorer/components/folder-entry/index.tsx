import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Entry from '../../interfaces/entry';
import FileEntry from '../file-entry';
import { getSubEntries } from '../../entry-provider';
import { useDrag, useDrop, useSelect } from '../../event-provider';

export interface Props {
  entry: Entry;
}
export default function FolderEntry(props: Props) {
  const [entry, subEntries] = [props.entry, getSubEntries(props.entry.path)];
  const [showing, setShowing] = useState(false);

  // refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // events
  const [dragState, setDragState] = useDrag();
  const [_dropState, setDropState] = useDrop();
  const [selectState, setSelectState] = useSelect();

  const onHeaderHandler = () => ({
    draggable: true,
    onDrop: (_event: React.DragEvent<HTMLDivElement>) => {
      _event.stopPropagation();
      hideGuide();

      if (!dragState) return;
      const event = dragState.event;
      const draggedEntry = dragState.current;
      const isSubEntry =
        subEntries.find((entry) => entry.path === draggedEntry.path) !==
        undefined;
      const isMine = draggedEntry.path === entry.path;
      const isParent = entry.path.startsWith(dragState.current.path);
      if (isSubEntry) return;
      if (isMine) return;
      if (isParent) return;

      setDropState({ to: draggedEntry, from: entry });
    },
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();
    },
    onDragEnd: (_event: React.DragEvent<HTMLDivElement>) => {
      hideGuide();
      setDragState(undefined);
    },
    onDrag: (event: React.DragEvent<HTMLDivElement>) => {
      setDragState({ event, current: entry });
    },
    onClick: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setShowing(!showing);
      setSelectState({ to: entry });
    },
    onMouseOver: () => {
      if (headerRef.current?.classList.contains('select')) return;
      headerRef.current?.classList.add('hover');
    },
    onMouseOut: () => {
      headerRef.current?.classList.remove('hover');
    },
  });

  const showGuide = () => {
    if (!wrapperRef.current) return;
    wrapperRef.current.classList.add('guide');
  };

  const hideGuide = () => {
    if (!wrapperRef.current) return;
    wrapperRef.current.classList.remove('guide');
  };

  const isHover = (x: number, y: number) => {
    if (!headerRef.current) return;
    const left = headerRef.current.getBoundingClientRect().x;
    const right = left + headerRef.current.getBoundingClientRect().width;
    const top = headerRef.current.getBoundingClientRect().y;
    const bottom = top + headerRef.current.getBoundingClientRect().height;
    // console.log(left, '<', x, '<', right, top, '<', y, '<', bottom);
    return left < x && x < right && top < y && y < bottom;
  };

  useEffect(() => {
    // console.log(State.onDrag, 'in', entry.name);
    if (!dragState) return;
    const event = dragState.event;
    const draggedEntry = dragState.current;
    const isSubEntry =
      subEntries.find((entry) => entry.path === draggedEntry.path) !==
      undefined;
    const isMine = draggedEntry.path === entry.path;
    const isParent = entry.path.startsWith(dragState.current.path);
    if (isSubEntry) return;
    if (isMine) return;
    if (isParent) return;

    if (isHover(event.clientX, event.clientY)) {
      showGuide();
    } else {
      hideGuide();
    }
  }, [dragState]);

  useEffect(() => {
    if (selectState?.to === entry) {
      headerRef.current?.classList.add('select');
    } else {
      headerRef.current?.classList.remove('select');
    }
  }, [selectState]);
  return (
    <Wrapper ref={wrapperRef}>
      <Header className="header" ref={headerRef} {...onHeaderHandler()}>
        {showing
          ? entry.openedComponent(entry.name, entry.detail)
          : entry.defaultComponent(entry.name, entry.detail)}
      </Header>
      <Field hidden={!showing}>
        {subEntries.map((subEntry) =>
          subEntry.type === 'FOLDER' ? (
            <FolderEntry key={subEntry.path} entry={subEntry} />
          ) : (
            <FileEntry key={subEntry.path} entry={subEntry} />
          )
        )}
      </Field>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const Header = styled.div``;
const Field = styled.div``;
