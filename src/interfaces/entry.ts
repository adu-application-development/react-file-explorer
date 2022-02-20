export interface Entry {
  path: string;
  name: string;
  detail?: any;
  type: 'FOLDER' | 'FILE';
  defaultComponent: (name: string, detail: any) => JSX.Element;
  openedComponent: (name: string, detail: any) => JSX.Element;
}
