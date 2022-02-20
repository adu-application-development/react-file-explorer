import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Entry } from '../..';
import { useDrag, useDrop, useSelect } from '../filesystem-provider';

export interface Props {
  entry: Entry;
}
export default function FileEntry(props: Props) {
  const entry = props.entry;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [_dragState, setDragState] = useDrag();
  const [_dropState, _setDropState] = useDrop();
  const [selectState, setSelectState] = useSelect();

  const onWrapperHandler = () => ({
    draggable: true,
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();
    },
    onDragEnd: (_event: React.DragEvent<HTMLDivElement>) => {
      setDragState(undefined);
    },
    onDrag: (event: React.DragEvent<HTMLDivElement>) => {
      setDragState({ event, current: entry });
    },
    onClick: (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setSelectState({ to: entry });
    },
    onMouseOver: () => {
      if (wrapperRef.current?.classList.contains('select')) return;
      wrapperRef.current?.classList.add('hover');
    },
    onMouseOut: () => {
      wrapperRef.current?.classList.remove('hover');
    },
  });

  useEffect(() => {
    if (selectState?.to === entry) {
      wrapperRef.current?.classList.add('select');
    } else {
      wrapperRef.current?.classList.remove('select');
    }
  }, [selectState]);

  return (
    <Wrapper ref={wrapperRef} {...onWrapperHandler()}>
      {entry.defaultComponent(entry.name, entry.detail)}
    </Wrapper>
  );
}

const Wrapper = styled.div``;
