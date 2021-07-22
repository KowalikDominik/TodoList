import React from "react";

import "./Backdrop.css";

interface Props {}

export const Backdrop: React.FC<Props> = ({ children }) => {
  return <div className="backdrop backdropShow onTop">{children}</div>;
};
