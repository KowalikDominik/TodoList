import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import "./Input.css";
import { timeToString, usePrevious } from "../../utils/helperMethod";
import { IInput } from "../interfaces";

export const Input: React.FC<IInput> = ({
  inputValue,
  onEdit,
  typeOfInput,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currValue, setCurrValue] = useState<string>(inputValue);

  const prevValue = usePrevious(currValue);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isEdit]);

  const changeInputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrValue(e.target.value);
  };

  const onEditClick = () => {
    setIsEdit((prevState) => {
      return !prevState;
    });
    if (isEdit) {
      if (prevValue !== currValue) onEdit(currValue);
    }
  };

  const onBlurHandler = () => {
    onEditClick();
  };

  const inputAttr = {
    style: isEdit ? { display: "block" } : { display: "none" },
    value: currValue === "Description:" ? "" : currValue,
    onChange: changeInputHandler,
    onBlur: onBlurHandler,
  };

  return (
    <div className="editInputContainer" data-testid="input-container">
      {!isEdit ? (
        <p>{typeOfInput === "time" ? timeToString(currValue) : currValue}</p>
      ) : typeOfInput === "textarea" ? (
        <textarea {...inputAttr} ref={textAreaRef}></textarea>
      ) : (
        <input
          aria-label="input"
          type={typeOfInput === "time" ? "datetime-local" : "text"}
          ref={inputRef}
          {...inputAttr}
        />
      )}
      <div
        className="editInputBtnContainer"
        onClick={onEditClick}
        data-testid="edit"
      >
        {!isEdit && <span className="red">EDIT</span>}
      </div>
    </div>
  );
};
