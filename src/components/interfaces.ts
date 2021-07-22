export interface ITask {
  [k: string]: string | number;
  id: number;
  taskName: string;
  taskTime: string;
  taskDesc: string;
}
export interface ITaskCard {
  task: ITask;
  removeTask: (n: number) => void;
  close: () => void;
  show: boolean;
  editTask: (v: string, id: number, key: string) => void;
  loading: boolean;
}

export interface IInput {
  edit: boolean;
  inputValue: string;
  onEdit: (value: string) => void;
  className?: string;
  typeOfInput?: string;
}

export interface ITasksList {
  tasks: ITask[];
  taskClick: (id: number) => void;
  loading: boolean;
}

export interface ITaskOnList {
  name: string;
  time: string;
  click: React.MouseEventHandler<HTMLDivElement>;
}

export interface IModal {
  title: string | JSX.Element;
  show: boolean;
  close: () => void;
  confirmationType: boolean;
}

export interface IConfModal {
  title: string | JSX.Element;
  show: boolean;
  remove: React.MouseEventHandler<HTMLButtonElement>;
  close: () => void;
  confirmationType: boolean;
}

export interface IInputContainer {
  change: React.ChangeEventHandler<HTMLInputElement>;
  add: () => void;
  name: string;
  time: string;
  desc: string;
  validation: {
    [k: string]: boolean;
    taskName: boolean;
  };
  showInvalid: boolean;
}
