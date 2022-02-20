import { Entry } from "../..";

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
export interface RenameState {
  to: Entry;
  from: Entry;
}
export interface DeleteState {
  to: Entry;
}
export interface CreateState {
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
  rename: [
    RenameState | undefined,
    React.Dispatch<React.SetStateAction<RenameState | undefined>>
  ];
  delete: [
    DeleteState | undefined,
    React.Dispatch<React.SetStateAction<DeleteState | undefined>>
  ];
  create: [
    CreateState | undefined,
    React.Dispatch<React.SetStateAction<CreateState | undefined>>
  ]
}
