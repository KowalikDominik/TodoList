import React from "react";

import { timeToString } from "../../utils/helperMethod";
import { ITaskOnList } from "../interfaces";
import "./Task.css";

export const Task: React.FC<ITaskOnList> = ({ name, time, click }) => {
  return (
    <div className="Task" onClick={click} data-testid="task">
      <div className="Task-name">{name}</div>
      <div>{time ? timeToString(time) : null}</div>
    </div>
  );
};
