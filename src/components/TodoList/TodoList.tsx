import React, { useEffect, useState } from "react";

import api from "../../services/tasksApi";
import { randomId, initialTask, sortTasks } from "../../utils/helperMethod";
import { TaskAdd } from "../TaskAdd/TaskAdd";
import { ITask } from "../interfaces";
import { TaskCard } from "../TaskCard/TaskCard";
import { TasksList } from "./TasksList/TasksList";

export const TodoList: React.FC = () => {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [task, setTask] = useState<ITask>(initialTask);
  const [taskCard, setTaskCard] = useState<boolean>(false);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [loadingTask, setLoadingTask] = useState<boolean>(false);
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
  const showTaskCard = (taskId: number) => {
    const searching = [...taskList].filter((element) => element.id === taskId);
    setTask(searching[0]);
    setTaskCard(true);
  };
  const closeTaskCard = () => {
    setTaskCard(false);
  };

  const editTaskHandler = async (value: string, id: number, key: string) => {
    const editedTask = [...taskList];
    const updatedIndex = editedTask.findIndex((element) => element.id === id);
    editedTask[updatedIndex][key] =
      key === "taskName" ? value.toUpperCase() : value;

    try {
      setLoadingTask(true);
      const update = await api.updateByKeyName(id, key, value);

      if (update) {
        setLoadingTask(false);
        setTaskList(sortTasks(editedTask));
      }
    } catch {
      setLoadingTask(false);
      alert("Unable to update task.");
    }
  };

  const addTaskHandler = async ({ taskName, taskDesc, taskTime }: ITask) => {
    // jeżeli atualizujemy stan zależny od wartości obecnej warto posłużyć
    // sie funckja call back by zapobiec złym przypisaniom
    // bo stan moze sie zmienic nagle podczas zmiany
    taskName = taskName.toUpperCase();
    const newTask = { id: randomId(taskList), taskName, taskTime, taskDesc };

    try {
      setLoadingAdd(true);
      const response = await api.put(newTask);

      if (response) {
        setLoadingAdd(false);
        setTaskList((prevState) => {
          return sortTasks([...prevState, newTask]);
        });
      }
    } catch {
      setLoadingAdd(false);
      alert("Unable to add new task to database.");
    }
  };

  const removeTaskHandler = async (n: number) => {
    try {
      setLoadingTask(true);
      const remove = await api.delete(n);
      if (remove) {
        setTaskList((prevState) => {
          return prevState.filter((element) => element.id !== n);
        });
        closeTaskCard();
        setLoadingTask(false);
      }
    } catch {
      alert("Unable complete task.");
    }
  };

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const getAll = (await api.get()) as ITask[];
        if (getAll) {
          setTaskList(sortTasks(getAll));
          setLoadingList(false);
        }
      } catch (error) {
        alert("Unable to get tasks.");
      }
    };
    getAllTasks();
  }, []);

  return (
    <React.Fragment>
      <TaskAdd addTask={addTaskHandler} loading={loadingAdd} />
      <TaskCard
        task={task}
        show={taskCard}
        close={closeTaskCard}
        removeTask={removeTaskHandler}
        editTask={editTaskHandler}
        loading={loadingTask}
      />

      <TasksList
        tasks={taskList}
        taskClick={showTaskCard}
        loading={loadingList}
      />
    </React.Fragment>
  );
};
