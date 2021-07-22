import moment, { MomentInput } from "moment";
import React, { useCallback, useEffect, useState } from "react";

interface Props {}

export const Timer: React.FC<Props> = (props) => {
  const [clock, setClock] = useState(0);
  const [task, setTask] = useState(0);
  const expiredTime = moment("22 06 2021 11:00", "DD MM YYYY hh:mm");

  const timeToEnd = (endTime: MomentInput) => {
    const end = moment(endTime, "DD MM YYYY hh:mm:ss");
    const now = moment();
    const duration = moment.duration(now.diff(end));
    const convertTo = (unit: moment.unitOfTime.Diff) => {
      return `expired ${-end.diff(now, unit)} ${unit}.`;
    };
    if (duration.asDays() >= 1) return convertTo("days");
    if (duration.asDays() < 0) return null;
    if (duration.asHours() >= 1) return convertTo("hours");
    return convertTo("minutes");
  };

  // usecallback uruchamia deklaracje funcji tylko gdy zienna
  // clock zostanie zmieniona
  // zapobiega to ciągłym deklaracjom przy każdym renderowaniu
  const clockStart = useCallback(() => {
    console.log(timeToEnd(expiredTime));
    setClock((prevState) => {
      return prevState + 1;
    });
  }, [expiredTime]); //gdy clock sie zmieni funkcja zostaje zadeklarowana

  useEffect(() => {
    const interval = setInterval(() => {
      clockStart();
    }, 1000);
    return () => clearInterval(interval);
  }, [clockStart]);

  return (
    <div>
      {}
      {clock}
      <button onClick={() => setTask(task + 1)}>OK</button>
    </div>
  );
};
