import React from "react";

import "./Modal.css";
import { IModal } from "../interfaces";

export const Modal: React.FC<IModal> = ({
  children,
  title,
  show,
  close,
  confirmationType,
}) => {
  return (
    <React.Fragment>
      <div
        data-testid="modal-backdrop"
        className={["backdrop", show && "backdropShow"].join(" ")}
        onClick={close}
      />
      <div
        data-testid="modal-wrapper"
        className={["modalWrapper", confirmationType && "modalConf"].join(" ")}
      >
        <div
          data-testid="modal-box"
          className={show ? "modalBox modalShow" : "modalBox"}
        >
          <div className="modalTitle">
            <h3>{title}</h3>
            <div
              data-testid="modal-close"
              className="modalClose"
              onClick={close}
            ></div>
          </div>
          <div className="modalContent">{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};
