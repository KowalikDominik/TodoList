import React, { ChangeEvent, useEffect, useState } from "react";

import { currentTime } from "../../utils/helperMethod";
import { InputContainer } from "./InputContainer/InputContainer";
import { ITask } from "../interfaces";
import { Modal } from "../Modal/Modal";
import { Spinner } from "../Spinner/Spinner";
import { Backdrop } from "../Backdrop/Backdrop";
import "./TaskAdd.css";

interface Props {
  addTask: (task: ITask) => void;
  loading: boolean;
}

export const TaskAdd: React.FC<Props> = ({ addTask, loading }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskTime, setTaskTime] = useState<string>(currentTime());
  const [taskDesc, setTaskDesc] = useState<string>("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [valid, setValid] = useState({ taskName: false });
  const [ShowInvalidMsg, setShowInvalidMsg] = useState(false);
  const [loaded, setLoaded] = useState(true);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    console.log(inputValue);
    if (inputName === "taskDesc") setTaskDesc(inputValue);
    if (inputName === "taskTime") setTaskTime(inputValue);
    if (inputName === "taskName") {
      console.log(inputValue);
      setTaskName(inputValue);
      // validation if name is empty
      if (inputValue.length > 0) setValid({ taskName: true });
      else {
        setValid({ taskName: false });
        setShowInvalidMsg(true);
      }
      ///
    }
  };

  const onAdd = () => {
    if (taskName.trim().length === 0 || taskTime.trim().length === 0)
      setShowInvalidMsg(true);
    else {
      setLoaded(false);
      const newTask = {
        id: 0,
        taskName,
        taskTime,
        taskDesc,
      };
      return addTask(newTask);
    }
  };

  const showModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
    resetInputs();
    setLoaded(true);
  };

  const resetInputs = () => {
    setTaskName("");
    setTaskDesc("");
    setValid({ taskName: false });
    setShowInvalidMsg(false);
    setTaskTime(currentTime());
  };

  useEffect(() => {
    if (!loaded && !loading) closeModal();
  });

  return (
    <React.Fragment>
      {loading && (
        <Backdrop>
          <Spinner />
        </Backdrop>
      )}
      <div data-testid="addBtn" className="addBtn" onClick={showModal}></div>
      <Modal
        confirmationType={false}
        show={isShowModal}
        title="Add your new task"
        close={closeModal}
      >
        {isShowModal && (
          <InputContainer
            change={onChangeHandler}
            add={onAdd}
            taskName={taskName}
            taskTime={taskTime}
            taskDesc={taskDesc}
            validation={valid}
            showInvalid={ShowInvalidMsg}
          />
        )}
      </Modal>
    </React.Fragment>
  );
};
