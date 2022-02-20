import React, { createContext, useContext, useEffect, useState } from 'react';
import { Entry } from '../..';

interface IContext {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}
const Context = createContext<IContext>(undefined!);

export interface Props {
  entries: Entry[];
  children: JSX.Element;
}
export default function EntryProvider(props: Props) {
  const [entries, setEntries] = useState<Entry[]>(props.entries);
  return (
    <Context.Provider
      value={{
        entries,
        setEntries,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

/**
 * for get or find in entries
 */
const getEntries = () => {
  const { entries } = useContext(Context);
  if (!entries)
    throw new Error(
      'Must set up variables of entries in EntryProvider component'
    );

  return { entries };
};
export function findEntry(path: string): Entry {
  const { entries } = getEntries();

  for (const entry of entries) {
    if (entry.path !== path) continue;

    return entry;
  }

  throw new Error('There is no entry, that path is' + path);
}

export function getSubEntries(path: string): Entry[] {
  const { entries } = getEntries();
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
  const { entries } = getEntries();
  let foundEntry = entries[0];
  entries.forEach((entry) => {
    if (entry.path.length > foundEntry.path.length) return;

    foundEntry = entry;
  });

  return foundEntry;
}
