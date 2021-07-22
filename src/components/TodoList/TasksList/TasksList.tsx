import React from "react";

import { Backdrop } from "../../Backdrop/Backdrop";
import { ITasksList } from "../../interfaces";
import { Spinner } from "../../Spinner/Spinner";
import { Task } from "../../Task/Task";

export const TasksList: React.FC<ITasksList> = ({
  tasks,
  taskClick,
  loading,
}) => {
  let tasksList: {} | null = null;
  if (loading)
    tasksList = (
      <Backdrop>
        <Spinner />
      </Backdrop>
    );
  else if (tasks.length !== 0) {
    tasksList = tasks.map(({ id, taskName, taskTime }) => {
      return (
        <Task
          key={id}
          name={taskName}
          time={taskTime}
          click={() => taskClick(id)}
        />
      );
    });
  } else tasksList = "Empty task list.";

  return (
    <div className="mainWrapper">
      <div data-testid="tasks-list" className="todoList">
        {tasksList}
      </div>
    </div>
  );
};
