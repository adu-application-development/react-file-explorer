import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import styled from 'styled-components';
import { VscFolder, VscFolderOpened, VscFile } from 'react-icons/vsc';

import { dark, GlobalStyle, light } from '@helloblank/theme';
import { Entry, FileExplorer, FileSystemProvider } from '../src';

const meta: Meta = {
  title: 'file-explorer',
  component: FileExplorer,
  argTypes: {
    headEntryPath: {
      control: { type: 'text' },
    },
  },
};

export default meta;

interface Detail {
  path: string;
  floor: number;
}
const entries: Entry[] = [
  {
    path: 'C:\\Users\\welco\\Desktop\\blankProject',
    name: 'blankProject',
    detail: {
      floor: 0,
    },
    type: 'FOLDER',
    defaultComponent: (name: string, detail: Detail) => (
      <Frame style={{ marginLeft: `${detail.floor * 10}px` }}>
        <VscFolder />
        <span>{name}</span>
      </Frame>
    ),
    openedComponent: (name: string, detail: Detail) => (
      <Frame style={{ marginLeft: `${detail.floor * 10}px` }}>
        <VscFolderOpened />
        <span>{name}</span>
      </Frame>
    ),
  },
  {
    path: 'C:\\Users\\welco\\Desktop\\blankProject\\lib',
    name: 'lib',
    detail: {
      floor: 1,
    },
    type: 'FOLDER',
    defaultComponent: (name: string, detail: Detail) => (
      <Frame style={{ marginLeft: `${detail.floor * 10}px` }}>
        <VscFolder />
        <span>{name}</span>
      </Frame>
    ),
    openedComponent: (name: string, detail: Detail) => (
      <Frame style={{ marginLeft: `${detail.floor * 10}px` }}>
        <VscFolderOpened />
        <span>{name}</span>
      </Frame>
    ),
  },
  {
    path: 'C:\\Users\\welco\\Desktop\\blankProject\\main.go',
    name: 'main.go',
    detail: {
      floor: 1,
    },
    type: 'FILE',
    defaultComponent: (name: string, detail: Detail) => (
      <Frame style={{ marginLeft: `${detail.floor * 10}px` }}>
        <VscFile />
        <span>{name}</span>
      </Frame>
    ),
    openedComponent: (name: string, detail: Detail) => <></>,
  },
  {
    path: 'C:\\Users\\welco\\Desktop\\blankProject\\lib\\printHello.go',
    name: 'printHello.go',
    detail: {
      floor: 2,
    },
    type: 'FILE',
    defaultComponent: (name: string, detail: Detail) => (
      <Frame style={{ marginLeft: `${detail.floor * 10}px` }}>
        <VscFile />
        <span>{name}</span>
      </Frame>
    ),
    openedComponent: (name: string, detail: Detail) => <></>,
  },
];

export const Default = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <FileSystemProvider
        entries={entries}
        onMove={(to, from) => {
          console.log('move to', to, 'from', from);
        }}
        onSelect={(to) => {
          console.log(to, 'is selected');
        }}
      >
        <FileExplorer />
      </FileSystemProvider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 200px;
  height: 600px;

  background-color: ${dark.backgroundDefault};
  color: ${dark.foregroundDimmer};

  .select {
    background-color: ${dark.backgroundHighest};
  }

  .guide {
    background-color: ${dark.backgroundHigher};
  }

  .hover {
    background-color: ${dark.backgroundHighest};
  }
`;

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;

  padding: 7px;

  user-select: none;
  cursor: pointer;
`;
