import { fireEvent, render } from "@testing-library/react";

import { Task } from "./Task";
import { timeToString } from "../../utils/helperMethod";

const testTask = {
  taskId: "123",
  taskName: "abc",
  taskTime: "2021-07-15T08:51",
  taskClick: jest.fn(),
};

const component = (
  <Task
    key={testTask.taskId}
    name={testTask.taskName}
    time={testTask.taskTime}
    click={testTask.taskClick}
  />
);

describe("Task tests", () => {
  test("invoke click function when click on task div", () => {
    const { getByText } = render(component);
    fireEvent.click(getByText(testTask.taskName));
    expect(testTask.taskClick).toHaveBeenCalledTimes(1);
  });

  test("task display correct data", () => {
    const { getByText } = render(component);
    getByText(testTask.taskName);
    getByText(timeToString(testTask.taskTime));
  });
});
