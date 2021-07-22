import React from "react";

import { IInputContainer } from "../../interfaces";

export const InputContainer: React.FC<IInputContainer> = ({
  name,
  time,
  change,
  add,
  desc,
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
            id="name"
            name="name"
            onChange={change}
            value={name}
          />
          <label htmlFor="name" className={name.length !== 0 ? "notEmpty" : ""}>
            Name {checkValid("name")}
          </label>
        </div>
        <div className="singleInputContainer">
          <input
            type="text"
            id="desc"
            name="desc"
            onChange={change}
            value={desc}
          />
          <label htmlFor="desc" className={desc.length !== 0 ? "notEmpty" : ""}>
            Description
          </label>
        </div>
        <div className="singleInputContainer">
          <input
            type="datetime-local"
            id="date"
            name="date"
            onChange={change}
            value={time}
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
