import React from "react";

import { Modal } from "../Modal";
import "../Modal.css";
import { IConfModal } from "../../interfaces";

export const ConfModal: React.FC<IConfModal> = ({
  title,
  show,
  close,
  remove,
  confirmationType,
}) => {
  return (
    <Modal
      confirmationType={confirmationType}
      show={show}
      title={title}
      close={close}
    >
      {show && (
        <div className="centerWrapper">
          <button className="dangerBtn" onClick={close}>
            No
          </button>
          <button className="successBtn" onClick={remove}>
            Yes
          </button>
        </div>
      )}
    </Modal>
  );
};
