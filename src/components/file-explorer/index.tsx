import React from 'react';
import styled from 'styled-components';
import FolderEntry from './components/folder-entry';
import { getHeadEntry } from './entry-provider';
import { useSelect } from './event-provider';
import Entry from './interfaces/entry';

interface Props {
  onChange?: (event: string, entries: Entry[]) => void;
}
export default function FileExplorer(props: Props) {
  const [selectState, setSelectState] = useSelect();

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
