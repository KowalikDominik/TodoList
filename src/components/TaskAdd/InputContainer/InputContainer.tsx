import React from "react";

import { IInputContainer } from "../../interfaces";

export const InputContainer: React.FC<IInputContainer> = ({
  taskName,
  taskTime,
  change,
  add,
  taskDesc,
  validation,
  showInvalid,
}) => {
  const checkValid = (name: string) => {
    if (showInvalid)
      return !validation[name] && <span className="red"> ( required! )</span>;
  };

  return (
    <React.Fragment>
      <div className="inputContainer">
        <div className="singleInputContainer">
          <input
            type="text"
            id="taskName"
            name="taskName"
            onChange={change}
            value={taskName}
          />
          <label
            htmlFor="taskName"
            className={taskName.length !== 0 ? "notEmpty" : ""}
          >
            Name {checkValid("taskName")}
          </label>
        </div>
        <div className="singleInputContainer">
          <input
            type="text"
            id="taskDesc"
            name="taskDesc"
            onChange={change}
            value={taskDesc}
          />
          <label
            htmlFor="taskDesc"
            className={taskDesc.length !== 0 ? "notEmpty" : ""}
          >
            Description
          </label>
        </div>
        <div className="singleInputContainer">
          <input
            type="datetime-local"
            id="taskTime"
            name="taskTime"
            onChange={change}
            value={taskTime}
          />
          <label htmlFor="date" className="notEmpty">
            Date
          </label>
        </div>
        <div className="centerWrapper">
          <button className="successBtn" onClick={add}>
            Add
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
