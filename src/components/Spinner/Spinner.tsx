import React from "react";

import "./Spinner.css";

interface Props {}

export const Spinner: React.FC<Props> = () => {
  return (
    <div className="lds-ring" data-testid="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
