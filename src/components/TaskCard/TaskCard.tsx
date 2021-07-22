import React, { useState } from "react";

import { Backdrop } from "../Backdrop/Backdrop";
import { Input } from "../../components/Input/Input";
import { ITaskCard } from "../interfaces";
import { Modal } from "../Modal/Modal";
import { ConfModal } from "../Modal/ConfModal/ConfModal";
import { Spinner } from "../Spinner/Spinner";

export const TaskCard: React.FC<ITaskCard> = ({
  task,
  removeTask,
  show,
  editTask,
  close,
  loading,
}) => {
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);

  const confirmationShow = () => {
    setConfirmationModalShow(true);
  };
  const confirmationClose = () => {
    setConfirmationModalShow(false);
  };
  const removeTaskHandler = () => {
    removeTask(task.id);
    confirmationClose();
  };
  const edit = (t: string) => (v: string) => editTask(v, task.id, t);
  const title = (
    <Input edit={true} inputValue={task.taskName} onEdit={edit("taskName")} />
  );
  const clickOnBackdrop = () => {
    if (confirmationModalShow) {
      setConfirmationModalShow(false);
      return null;
    }
    return close();
  };

  return (
    <div>
      {loading && (
        <Backdrop>
          <Spinner />
        </Backdrop>
      )}
      <Modal
        data-testid="main-modal"
        confirmationType={false}
        show={show}
        title={show ? title : ""}
        close={clickOnBackdrop}
      >
        {show && (
          <div data-testid="main-modal-inputs">
            <Input
              typeOfInput="time"
              edit={true}
              inputValue={task.taskTime.toString()}
              onEdit={edit("taskTime")}
            />
            <Input
              typeOfInput="textarea"
              edit={true}
              inputValue={task.taskDesc ? task.taskDesc : "Description:"}
              onEdit={edit("taskDesc")}
            />
            <div className="centerWrapper">
              <button className="successBtn" onClick={confirmationShow}>
                Complete
              </button>
            </div>
          </div>
        )}
        <ConfModal
          confirmationType
          show={confirmationModalShow}
          title="Confim complete task?"
          close={confirmationClose}
          remove={removeTaskHandler}
        />
      </Modal>
    </div>
  );
};
