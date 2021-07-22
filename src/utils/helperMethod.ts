import { useEffect, useRef } from "react";
import { ITask } from "../components/interfaces";

export const timeToString = (str: string) => {
  return str.split("T").join(" ");
};
export const timeToListFormat = (value: string) => {
  return value.split(" ").join("T");
};

export const currentTime = () => {
  const clock = new Date();
  const addZero = (n: number) => (n < 10 ? "0" + n : n);
  const getDay = clock.getDate();

  const day = addZero(getDay);
  const getMonth = clock.getMonth() + 1;
  const month = addZero(getMonth);
  const year = clock.getFullYear();
  const getHour = clock.getHours();
  const getMinutes = clock.getMinutes();
  const minutes = addZero(getMinutes);
  const hour = addZero(getHour);
  return year + "-" + month + "-" + day + "T" + hour + ":" + minutes;
};

export const randomId = (taskList: ITask[]) => {
  let rand = 0;
  const baseList = [...taskList];
  let uniqueID = false;
  while (!uniqueID) {
    const currRand = Math.round(Math.random() * 10000);
    const searching = baseList.filter((element) => element.id === currRand);
    if (searching.length === 0) {
      uniqueID = true;
      rand = currRand;
    }
  }
  return rand;
};

export const sortTasks = (tasks: ITask[]) => {
  if (tasks)
    return tasks.sort((a, b) => {
      return a.taskTime >= b.taskTime ? 1 : -1;
    });
  else return [];
};

const currentDate = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const day = now.getDate();
  const month = monthNames[now.getMonth()];
  const dayName = days[now.getDay()];
  return { day, month, dayName };
};

export const currDate = currentDate();

export const initialTask = {
  id: 0,
  taskName: "",
  taskTime: "",
  taskDesc: "",
};
export const initialList = [
  {
    id: 0,
    taskName: "",
    taskTime: "",
    taskDesc: "",
  },
];

export const objToArray = (obj: any) => {
  return Object.keys(obj).map((key) => obj[key]);
};

export const usePrevious = (value: string) => {
  const ref = useRef("");
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
