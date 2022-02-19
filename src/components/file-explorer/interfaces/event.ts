import Entry from './entry';

export interface DragState {
  event: React.DragEvent<HTMLDivElement>;
  current: Entry;
}
export interface DropState {
  to: Entry;
  from: Entry;
}
export interface SelectState {
  to: Entry;
}

export default interface Event {
  drag: [
    DragState | undefined,
    React.Dispatch<React.SetStateAction<DragState | undefined>>
  ];
  drop: [
    DropState | undefined,
    React.Dispatch<React.SetStateAction<DropState | undefined>>
  ];
  select: [
    SelectState | undefined,
    React.Dispatch<React.SetStateAction<SelectState | undefined>>
  ];
}
