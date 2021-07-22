import { render, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { TasksList } from "./TasksList";
import { initialList } from "../../../utils/helperMethod";

describe("TaskList tests", () => {
  test("correct list loading", () => {
    const taskClick = (a: number) => {};

    const { getAllByTestId } = render(
      <TasksList taskClick={taskClick} tasks={[]} loading={true} />
    );

    getAllByTestId("spinner");
  });

  test("list is empty", () => {
    const taskClick = (a: number) => {};

    const { getAllByText } = render(
      <TasksList taskClick={taskClick} tasks={[]} loading={false} />
    );

    getAllByText("Empty task list.");
  });

  test("list have one task", () => {
    const taskClick = (a: number) => {};

    const { getAllByTestId } = render(
      <TasksList taskClick={taskClick} tasks={initialList} loading={false} />
    );
    const tasksList = getAllByTestId("tasks-list")[0];
    const tasks = within(tasksList).getAllByTestId("task");
    expect(tasks.length).toBe(1);
  });
});
