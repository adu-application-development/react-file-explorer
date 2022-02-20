import React, { useEffect } from 'react';
import styled from 'styled-components';
import FolderEntry from '../folder-entry';
import { getHeadEntry, useSelect } from '../filesystem-provider';
import { Entry } from '../..';

interface Props {
  onChange?: (event: string, entries: Entry[]) => void;
}
export function FileExplorer(props: Props) {
  const [selectState, setSelectState] = useSelect();

  useEffect(() => {}, [props]);
  const onWrapperHandler = () => ({
    onClick: (event: React.MouseEvent<HTMLDivElement>) => {
      setSelectState(undefined);
      event.stopPropagation();
    },
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();
    },
  });

  return (
    <Wrapper {...onWrapperHandler()}>
      <FolderEntry entry={getHeadEntry()} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
`;
