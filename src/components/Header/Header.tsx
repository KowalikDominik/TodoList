import React from "react";

import "./Header.css";
import { currDate } from "../../utils/helperMethod";

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <div className="header">
      <div className="mainWrapper">
        <div className="headerWrapper">
          <div className="dateDisplay">
            {currDate.dayName},
            <span className="rest">
              {currDate.day} {currDate.month}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
